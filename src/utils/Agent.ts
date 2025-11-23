import { webSearchTool, Agent, RunContext, Runner, withTrace, setDefaultOpenAIClient } from "@openai/agents";
import type { AgentInputItem } from "@openai/agents";
import { z } from "zod";
import OpenAI from "openai";

// Set the OpenAI API key for browser environment
if (typeof import.meta !== 'undefined' && import.meta.env) {
  // Vite/Browser environment
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log('[Agent] Setting API key from import.meta.env:', apiKey ? 'Found' : 'Not found');
  if (apiKey) {
    // Create OpenAI client with dangerouslyAllowBrowser for browser environment
    const client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
    setDefaultOpenAIClient(client);
  } else {
    console.error('[Agent] No VITE_OPENAI_API_KEY found in import.meta.env');
  }
} else if (typeof process !== 'undefined' && process.env) {
  // Node environment - use setDefaultOpenAIClient with a regular client
  const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  console.log('[Agent] Setting API key from process.env:', apiKey ? 'Found' : 'Not found');
  if (apiKey) {
    const client = new OpenAI({ apiKey });
    setDefaultOpenAIClient(client);
  }
}

// Tool definitions
const webSearchPreview = webSearchTool({
  searchContextSize: "medium",
  userLocation: {
    country: "US",
    type: "approximate"
  }
})
const webSearchPreview1 = webSearchTool({
  searchContextSize: "medium",
  userLocation: {
    type: "approximate"
  }
})
const AddNutritionDetailsAndUsefulTagsSchema = z.object({ recipes: z.array(z.object({ title: z.string(), url: z.string(), ingredients: z.array(z.object({ name: z.string(), quantity: z.number(), unit: z.string() })), steps: z.array(z.string()), nutrition: z.object({ calories: z.number(), protein_g: z.number(), fat_g: z.number(), carbs_g: z.number(), fiber_g: z.number(), sugar_g: z.number(), sodium_mg: z.number() }), tags: z.array(z.string()) })) });
const ExtractDetailedRecipeSchema = z.object({ title: z.string(), url: z.string(), ingredients: z.string() });
const DecidePostRecommendationSchema = z.object({ next_step: z.string() });
const SaveBasicInfoSchema = z.object({ existing_ingredients: z.string(), cooking_intention: z.string() });
const ExtractForRecipeAppSchema = z.object({ recommended_recipes_list: z.array(z.object({ name: z.string(), description: z.string(), image: z.string(), time: z.string(), nutrition: z.object({ carbs: z.string(), proteins: z.string(), fats: z.string(), sugars: z.string(), calories: z.string() }), prepTime: z.string(), cookTime: z.string(), difficulty: z.string(), servings: z.number(), recipeFrom: z.string(), recipeFromImage: z.string(), ingredients: z.array(z.string()), instructions: z.array(z.string()) })), existing_ingredients_list: z.array(z.string()) });
const askUserWhatHeSheWants = new Agent({
  name: "Ask user what he/she wants",
  instructions: `You are trying to gather the following info:
- existing_ingredients: stocked ingredients that the user already have
- cooking_intention: what the user wants to do or make like breakfast, something cold, or a smoothie, or a drink, or a cake.

For getting existing_ingredients:
- If images are provided, identify in those images any food ingredients or food items you see. Be exact and thorough
- If no images are provided, get food ingredients or food items from the user prompt.
- If nothing provided, leave it empty.

For getting cooking_intention:
- Get cooking intention from the user prompt. If nothing is provided, leave it empty.

If both are provided, say:
\"Got it! You want to ... and you have the following ingredients
- Ingredient 1
- Ingredient 2

Sure I can help with that!
\"

If lacking either, prompt the user to provide the missing information.



`,
  model: "gpt-4.1",
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

interface FindGreatRecipesContext {
  stateExisteingIngredients: string;
  stateCookingIntention: string;
}
const findGreatRecipesInstructions = (runContext: RunContext<FindGreatRecipesContext>, _agent: Agent<FindGreatRecipesContext>) => {
  const { stateExisteingIngredients, stateCookingIntention } = runContext.context;
  return `Use web search to find recipes matching the existing ingredients (${stateExisteingIngredients}) and cooking intention (${stateCookingIntention}) provided by user in chat context. If the user mentioned additional search criteria like \"healthy alternatives\", \"less sodium\", \"more protein\", \"make it spicy\", add them to the search.

Step 1: Search reputable sites (AllRecipes, NYT Cooking, Bon Appétit, Serious Eats) for highly-rated recipes

Step 2: Select 3+ recipes with creative, appealing titles (not generic). IMPORTANT: Ensure diversity across the results — different cooking methods (roasted, braised, grilled, stir-fried), cuisines (Italian, Asian, Mediterranean, etc.), and primary ingredients. Avoid selecting multiple recipes that are essentially the same dish with minor variations.

Step 3: Visit each recipe URL and extract: title, url, time, calories per serving (estimate something if you don't know. don't tell me if it's estimated)

Step 4: Format each recipe like the following example given in markdown. Give a direct number. Do not provide anymore explanation. Remove citations:
\"\"\"
### [Recipe Title](recipe url)
- **Cooking time:** 30 minutes  
- **Calories per serving:** 250 cal 
\"\"\"

Step 5: Prompt the user: \"Which recipe sounds the most exciting? I can pull it and prepare a shopping list for you. You can also tell me what other choices you'd like to see (less sodium, more protein, more spicy)\"  `
}
const findGreatRecipes = new Agent({
  name: "Find great recipes",
  instructions: findGreatRecipesInstructions,
  model: "gpt-4.1",
  tools: [
    webSearchPreview
  ],
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 10000,
    store: true
  }
});

const addNutritionDetailsAndUsefulTags = new Agent({
  name: "Add nutrition details and useful tags",
  instructions: `Look up nutritions given the ingredients list and compile below. Sanity check that nutrition values make sense. Also add the following kinds of tags:

nutrition:
    calories
    protein_g
    fat_g
    carbs_g
    fiber_g
    sugar_g
    sodium_mg

tags:
🥗 Diet & Restrictions
vegetarian
vegan
keto
paleo
gluten-free
dairy-free
nut-free
egg-free
halal
kosher
low-carb
high-protein
low-fat
sugar-free
🍳 Meal Type
breakfast
brunch
lunch
dinner
snack
dessert
meal-prep
side-dish
appetizer
drink / beverage
🧪 Nutrition & Goal
high-protein
high-fiber
low-calorie
high-calorie
bulking
cutting
weight-loss
heart-healthy
anti-inflammatory
gut-friendly
low-glycemic
🔥 Flavor Profile
sweet
salty
savory
spicy
umami
sour
smoky
tangy
creamy
crispy
🌍 Cuisine / Region
chinese
japanese
korean
thai
vietnamese
indian
italian
french
mexican
mediterranean
american
middle-eastern
👩‍🍳 Preparation Method
fried
baked
steamed
boiled
roasted
grilled
braised
stir-fried
air-fried
slow-cooked
sous-vide
raw
🕒 Convenience
5-minute
10-minute
easy
one-pan
no-cook
batch-cook
freezer-friendly
kid-friendly
🧊 Temperature
hot
warm
cold
chilled
iced
🛒 Ingredient Focus (core)
chicken
beef
pork
fish
tofu
egg
rice
noodles
potato
mushroom
beans
cheese`,
  model: "gpt-4.1",
  outputType: AddNutritionDetailsAndUsefulTagsSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

interface CreateIngredientsShoppingChecklistListContext {
  inputOutputParsedIngredients: string;
  stateExisteingIngredients: string;
}
const createIngredientsShoppingChecklistListInstructions = (runContext: RunContext<CreateIngredientsShoppingChecklistListContext>, _agent: Agent<CreateIngredientsShoppingChecklistListContext>) => {
  const { inputOutputParsedIngredients, stateExisteingIngredients } = runContext.context;
  return `Given: 
final recipe ingredients: ${inputOutputParsedIngredients} 
existing_ingredients: ${stateExisteingIngredients} 
Task: 
Using the final recipe ingredients 
Output only in this format. each item is a hyperlink: 
**Recipe:** (recipe name) (calories cal) 
**Shopping list:**
- (✅ emoji if in existing ingredients, ⬜ emoji if not) Ingredient name x (needed quantity) \[[Add on Instacart](https://www.instacart.com/store/s?k=(ingredient name))]
Example: 
**Recipe:** (Mediterranean Quinoa Salad) (320 kcal) 
**Shopping list:** 
- ✅ Olive oil x 1 tbsp 
- ⬜ Quinoa x 1 cup`
}
const createIngredientsShoppingChecklistList = new Agent({
  name: "Create ingredients shopping/checklist list",
  instructions: createIngredientsShoppingChecklistListInstructions,
  model: "gpt-4.1",
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

interface ExtractDetailedRecipeContext {
  stateRecommendedRecipes: string;
}
const extractDetailedRecipeInstructions = (runContext: RunContext<ExtractDetailedRecipeContext>, _agent: Agent<ExtractDetailedRecipeContext>) => {
  const { stateRecommendedRecipes } = runContext.context;
  return `Select the recipe from the recommended recipes and user input message, with recommended recipes being: ${stateRecommendedRecipes}. Go to the url and extract the detailed recipe information including a list of needed ingredients, url and recipe title`
}
const extractDetailedRecipe = new Agent({
  name: "Extract detailed recipe",
  instructions: extractDetailedRecipeInstructions,
  model: "gpt-4.1",
  tools: [
    webSearchPreview
  ],
  outputType: ExtractDetailedRecipeSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const decidePostRecommendation = new Agent({
  name: "Decide post-recommendation",
  instructions: `Now that we already recommended recipes, we analyze user feedback to see if we want to make next_step:
- refine_search: If user wants to add additional search criteria and continue to search other recipes
- prepare_shopping_list: If user selects a recipe`,
  model: "gpt-4.1",
  outputType: DecidePostRecommendationSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const saveBasicInfo = new Agent({
  name: "Save basic info",
  instructions: `Extract the following info from the chat context.

- existing_ingredients: stocked ingredients that the user already have
- cooking_intention: what the user wants to do `,
  model: "gpt-4.1",
  outputType: SaveBasicInfoSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

interface ExtractForRecipeAppContext {
  stateRecommendedRecipes: string;
  stateExisteingIngredients: string;
}
const extractForRecipeAppInstructions = (runContext: RunContext<ExtractForRecipeAppContext>, _agent: Agent<ExtractForRecipeAppContext>) => {
  const { stateRecommendedRecipes, stateExisteingIngredients } = runContext.context;
  return `Convert the following into structured output. For the recommended_recipes, they don't have the exact details so please go to their url and extract the needed information as specified in the output json format.

For the image field, get the image previews and extract the first image url for each link 

recommended recipes: 
 ${stateRecommendedRecipes}
existing_ingredients:
 ${stateExisteingIngredients}`
}
const extractForRecipeApp = new Agent({
  name: "Extract for recipe app",
  instructions: extractForRecipeAppInstructions,
  model: "gpt-4.1",
  tools: [
    webSearchPreview1
  ],
  outputType: ExtractForRecipeAppSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

type WorkflowInput = {
  input_as_text: string;
  images?: string[]; // Array of image URLs or base64 strings
};


// Main code entrypoint
export const runWorkflow = async (workflow: WorkflowInput) => {
  return await withTrace("Gourmet Meal Prep Workflow", async () => {
    const state = {
      existing_ingredients_and_cooking_intention: null,
      existeing_ingredients: null,
      cooking_intention: null,
      step: "gather_basic",
      recommended_recipes: null,
      recommended_recipes_list: {
        recommended_recipes_list: []
      },
      existing_ingredients_list: []
    };
    // Build initial conversation with text and optional images
    const initialContent: Array<{ type: "input_text"; text: string } | { type: "input_image"; image_url: string }> = [
      { type: "input_text", text: workflow.input_as_text }
    ];

    // Add images if provided (expects base64 data URLs)
    if (workflow.images && workflow.images.length > 0) {
      console.log('[Agent] Processing images:', workflow.images.length);
      workflow.images.forEach((imageDataUrl, index) => {
        // Ensure it's a proper data URL format (data:image/jpeg;base64,...)
        const imageUrl = imageDataUrl.startsWith('data:')
          ? imageDataUrl
          : `data:image/jpeg;base64,${imageDataUrl}`;


        initialContent.push({
          type: "input_image",
          image_url: imageUrl
        });
      });

      console.log(`[Agent] Msg content:`, initialContent);
    }

    const conversationHistory: AgentInputItem[] = [
      { role: "user", content: initialContent }
    ];

    console.log('[Agent] Conversation history user message:', JSON.stringify(conversationHistory[0], null, 2));
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_68e66dba4fd8819080ec713aa579b1620a00c71d4cb017fc"
      }
    });
    if (state.step == "gather_basic") {
      const askUserWhatHeSheWantsResultTemp = await runner.run(
        askUserWhatHeSheWants,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...askUserWhatHeSheWantsResultTemp.newItems.map((item) => item.rawItem));

      if (!askUserWhatHeSheWantsResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const askUserWhatHeSheWantsResult = {
        output_text: askUserWhatHeSheWantsResultTemp.finalOutput ?? ""
      };
      if ((askUserWhatHeSheWantsResult.output_text).includes("Sure I can help")) {
        const saveBasicInfoResultTemp = await runner.run(
          saveBasicInfo,
          [
            ...conversationHistory
          ]
        );
        conversationHistory.push(...saveBasicInfoResultTemp.newItems.map((item) => item.rawItem));

        if (!saveBasicInfoResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const saveBasicInfoResult = {
          output_text: JSON.stringify(saveBasicInfoResultTemp.finalOutput),
          output_parsed: saveBasicInfoResultTemp.finalOutput
        };
        state.existeing_ingredients = saveBasicInfoResult.output_parsed.existing_ingredients;
        state.cooking_intention = saveBasicInfoResult.output_parsed.cooking_intention;
        const findGreatRecipesResultTemp = await runner.run(
          findGreatRecipes,
          [
            ...conversationHistory
          ],
          {
            context: {
              stateExisteingIngredients: state.existeing_ingredients,
              stateCookingIntention: state.cooking_intention
            }
          }
        );
        conversationHistory.push(...findGreatRecipesResultTemp.newItems.map((item) => item.rawItem));

        if (!findGreatRecipesResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const findGreatRecipesResult = {
          output_text: findGreatRecipesResultTemp.finalOutput ?? ""
        };
        state.step = "recommended_recipes";
        state.recommended_recipes = findGreatRecipesResult.output_text;
        const extractForRecipeAppResultTemp = await runner.run(
          extractForRecipeApp,
          [
            ...conversationHistory
          ],
          {
            context: {
              stateRecommendedRecipes: state.recommended_recipes,
              stateExisteingIngredients: state.existeing_ingredients
            }
          }
        );
        conversationHistory.push(...extractForRecipeAppResultTemp.newItems.map((item) => item.rawItem));

        if (!extractForRecipeAppResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const extractForRecipeAppResult = {
          output_text: JSON.stringify(extractForRecipeAppResultTemp.finalOutput),
          output_parsed: extractForRecipeAppResultTemp.finalOutput
        };
        state.recommended_recipes_list = extractForRecipeAppResult.output_parsed.recommended_recipes_list;
        state.existing_ingredients_list = extractForRecipeAppResult.output_parsed.existing_ingredients_list;
      } else {

      }
    } else if (state.step == "recommended_recipes") {
      const decidePostRecommendationResultTemp = await runner.run(
        decidePostRecommendation,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...decidePostRecommendationResultTemp.newItems.map((item) => item.rawItem));

      if (!decidePostRecommendationResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
      }

      const decidePostRecommendationResult = {
        output_text: JSON.stringify(decidePostRecommendationResultTemp.finalOutput),
        output_parsed: decidePostRecommendationResultTemp.finalOutput
      };
      if (decidePostRecommendationResult.output_parsed.next_step == "refine_search") {
        const findGreatRecipesResultTemp = await runner.run(
          findGreatRecipes,
          [
            ...conversationHistory
          ],
          {
            context: {
              stateExisteingIngredients: state.existeing_ingredients,
              stateCookingIntention: state.cooking_intention
            }
          }
        );
        conversationHistory.push(...findGreatRecipesResultTemp.newItems.map((item) => item.rawItem));

        if (!findGreatRecipesResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const findGreatRecipesResult = {
          output_text: findGreatRecipesResultTemp.finalOutput ?? ""
        };
        state.step = "recommended_recipes";
        state.recommended_recipes = findGreatRecipesResult.output_text;
        const extractForRecipeAppResultTemp = await runner.run(
          extractForRecipeApp,
          [
            ...conversationHistory
          ],
          {
            context: {
              stateRecommendedRecipes: state.recommended_recipes,
              stateExisteingIngredients: state.existeing_ingredients
            }
          }
        );
        conversationHistory.push(...extractForRecipeAppResultTemp.newItems.map((item) => item.rawItem));

        if (!extractForRecipeAppResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const extractForRecipeAppResult = {
          output_text: JSON.stringify(extractForRecipeAppResultTemp.finalOutput),
          output_parsed: extractForRecipeAppResultTemp.finalOutput
        };
        state.recommended_recipes_list = extractForRecipeAppResult.output_parsed.recommended_recipes_list;
        state.existing_ingredients_list = extractForRecipeAppResult.output_parsed.existing_ingredients_list;
      } else if (decidePostRecommendationResult.output_parsed.next_step == "prepare_shopping_list") {
        const extractDetailedRecipeResultTemp = await runner.run(
          extractDetailedRecipe,
          [
            ...conversationHistory
          ],
          {
            context: {
              stateRecommendedRecipes: state.recommended_recipes
            }
          }
        );
        conversationHistory.push(...extractDetailedRecipeResultTemp.newItems.map((item) => item.rawItem));

        if (!extractDetailedRecipeResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const extractDetailedRecipeResult = {
          output_text: JSON.stringify(extractDetailedRecipeResultTemp.finalOutput),
          output_parsed: extractDetailedRecipeResultTemp.finalOutput
        };
        const createIngredientsShoppingChecklistListResultTemp = await runner.run(
          createIngredientsShoppingChecklistList,
          [
            ...conversationHistory
          ],
          {
            context: {
              inputOutputParsedIngredients: extractDetailedRecipeResult.output_parsed.ingredients,
              stateExisteingIngredients: state.existeing_ingredients
            }
          }
        );
        conversationHistory.push(...createIngredientsShoppingChecklistListResultTemp.newItems.map((item) => item.rawItem));

        if (!createIngredientsShoppingChecklistListResultTemp.finalOutput) {
            throw new Error("Agent result is undefined");
        }

        const createIngredientsShoppingChecklistListResult = {
          output_text: createIngredientsShoppingChecklistListResultTemp.finalOutput ?? ""
        };
      } else {

      }
    } else {

    }

    // Return the final state and conversation
    return {
      state,
      conversationHistory,
      finalResponse: state.recommended_recipes || conversationHistory[conversationHistory.length - 1]
    };
  });
}
