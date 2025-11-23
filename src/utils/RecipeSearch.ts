/**
 * RecipeSearch - Stateful recipe search utility
 *
 * Maintains conversation context and search history
 */

import { runWorkflow } from './Agent';

export type Recipe = {
  name: string;
  description: string;
  image: string;
  time: string;
  nutrition: {
    carbs: string;
    proteins: string;
    fats: string;
    sugars: string;
    calories: string;
  };
  prepTime: string;
  cookTime: string;
  difficulty: string;
  servings: number;
  recipeFrom?: string;
  recipeFromImage?: string;
  ingredients: string[];
  instructions: string[];
};

export type ChatResponse = {
  recipes: Recipe[];
  ingredients: string[];
};

export class RecipeSearch {
  private conversationHistory: Array<{
    text: string;
    images: string[];
    timestamp: Date;
  }> = [];

  private detectedIngredients: Set<string> = new Set();

  /**
   * Chat with the recipe search API using real Agent workflow
   * @param text - Search query or conversation text
   * @param imgs - Optional array of image URLs
   * @returns Promise with recipes and ingredients
   */
  async chat(text: string, imgs?: string[]): Promise<ChatResponse> {
    // Store this interaction in conversation history
    this.conversationHistory.push({
      text,
      images: imgs || [],
      timestamp: new Date(),
    });

    console.log('[RecipeSearch] Received images:', imgs);

    // Convert image URLs to base64 before passing to Agent
    let imageBase64Array: string[] | undefined = undefined;
    if (imgs && imgs.length > 0) {
      console.log('[RecipeSearch] Converting images to base64...');
      imageBase64Array = await Promise.all(
        imgs.map(async (imgUrl, index) => {
          console.log(`[RecipeSearch] Processing image ${index}:`, imgUrl.substring(0, 100));

          // Check if it's already a base64 data URL
          if (imgUrl.startsWith('data:')) {
            console.log(`[RecipeSearch] Image ${index} is already a data URL`);
            return imgUrl;
          }

          // Fetch the image and convert to base64
          try {
            console.log(`[RecipeSearch] Fetching image ${index} from URL...`);
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const base64 = await this.blobToBase64(blob);
            console.log(`[RecipeSearch] Image ${index} converted, base64 length:`, base64.length);
            return base64;
          } catch (error) {
            console.error(`[RecipeSearch] Failed to convert image ${index} to base64:`, error);
            throw error;
          }
        })
      );
      console.log('[RecipeSearch] All images converted, total:', imageBase64Array.length);
    }

    // Call the real Agent workflow (no fallback - throw errors for debugging)
    const result = await runWorkflow({
      input_as_text: text,
      images: imageBase64Array // Pass base64 images to the Agent workflow
    });

    // Extract recipes and ingredients from the workflow result
    // Handle both nested and direct array structures
    const recipesList = result.state.recommended_recipes_list;
    const recipes = Array.isArray(recipesList)
      ? recipesList
      : (recipesList?.recommended_recipes_list || []);

    const ingredients = result.state.existing_ingredients_list || [];

    // Update detected ingredients
    ingredients.forEach(ing => this.detectedIngredients.add(ing));

    return {
      recipes,
      ingredients: Array.from(this.detectedIngredients),
    };
  }

  /**
   * Chat with mock data (fallback or for testing)
   * @param text - Search query or conversation text
   * @param imgs - Optional array of image URLs
   * @returns Promise with recipes and ingredients
   */
  async chatMock(text: string, imgs?: string[]): Promise<ChatResponse> {
    // Simulate API delay (1.5-2.5 seconds)
    const delay = 1500 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // MOCK IMPLEMENTATION:
    // Generate fake ingredients based on images
    const mockIngredients = this.generateMockIngredients(imgs);

    // Add to detected ingredients set (stateful)
    mockIngredients.forEach(ing => this.detectedIngredients.add(ing));

    // Generate mock recipes based on preset data
    const mockRecipes = this.generateMockRecipes();

    return {
      recipes: mockRecipes,
      ingredients: Array.from(this.detectedIngredients),
    };
  }

  /**
   * Reset the conversation history and detected ingredients
   */
  reset(): void {
    this.conversationHistory = [];
    this.detectedIngredients.clear();
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return [...this.conversationHistory];
  }

  /**
   * Get all detected ingredients so far
   */
  getDetectedIngredients(): string[] {
    return Array.from(this.detectedIngredients);
  }

  /**
   * Convert a Blob to base64 string
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * MOCK: Generate fake ingredients based on number of images
   */
  private generateMockIngredients(imgs?: string[]): string[] {
    const allIngredients = [
      "Fresh Salmon",
      "Avocado",
      "Cucumber",
      "Carrots",
      "Spinach",
      "Eggs",
      "Whole Grain Bread",
      "Greek Yogurt",
      "Banana",
      "Mango",
      "Soy Sauce",
      "Rice",
      "Cream Cheese",
      "Lemon",
      "Edamame",
      "Sesame Seeds",
      "Green Onions",
      "Honey",
      "Almond Milk",
      "Butter",
    ];

    // Generate random ingredients based on number of images
    const count = imgs && imgs.length > 0 ? imgs.length * 2 + 2 : 3;
    const shuffled = [...allIngredients].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * MOCK: Generate mock recipes (replace with real API response)
   */
  private generateMockRecipes(): Recipe[] {
    // This would come from your API
    // For now, returning mock data that matches the Recipe type
    return [
      {
        name: "California Poke Bowl",
        description: "Fresh and healthy poke bowl",
        image: "https://images.unsplash.com/photo-1604259596863-57153177d40b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlJTIwYm93bCUyMHNhbG1vbnxlbnwxfHx8fDE3NjM4NjM2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        time: "15 min",
        nutrition: {
          carbs: "101 g",
          proteins: "24 g",
          fats: "12 g",
          sugars: "21 g",
          calories: "450 Cal",
        },
        prepTime: "10 min",
        cookTime: "15 min",
        difficulty: "Easy",
        servings: 3,
        ingredients: [
          "8 oz (225 g) sushi-grade salmon, cut into bite-sized cubes",
          "2 tbsp soy sauce (or tamari for gluten-free)",
          "1 tsp sesame oil",
          "1 tsp rice vinegar",
          "1 tsp honey or mirin (optional, for a hint of sweetness)",
          "1 tsp honey or mirin (optional, for a hint of sweetness)",
        ],
        instructions: [
          "Cook rice according to package instructions. If using, mix in 1 tsp rice vinegar while rice is warm. Let it cool slightly.",
          "In a bowl, combine diced tuna or salmon with soy sauce, sesame oil, rice vinegar, honey, and sriracha. Let it marinate for 5–10 minutes.",
          "Divide rice into two bowls. Arrange avocado, cucumber, carrot, edamame, and marinated fish on top.",
          "Sprinkle sesame seeds and green onions. Drizzle with extra soy sauce or spicy mayo if desired.",
        ],
      },
      {
        name: "Green Smoothie",
        description: "Nutrient-packed smoothie",
        image: "https://images.unsplash.com/photo-1610622930110-3c076902312a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHNtb290aGllfGVufDF8fHx8MTc2MzgzNDE1MXww&ixlib=rb-4.1.0&q=80&w=1080",
        time: "5 min",
        nutrition: {
          carbs: "32 g",
          proteins: "8 g",
          fats: "3 g",
          sugars: "18 g",
          calories: "180 Cal",
        },
        prepTime: "5 min",
        cookTime: "0 min",
        difficulty: "Easy",
        servings: 2,
        ingredients: [
          "2 cups fresh spinach",
          "1 ripe banana, frozen",
          "1/2 cup Greek yogurt",
          "1 cup almond milk",
          "1 tbsp honey",
          "1/2 cup frozen mango chunks",
        ],
        instructions: [
          "Wash the spinach thoroughly and ensure banana is frozen for a creamy texture.",
          "Add spinach, banana, Greek yogurt, almond milk, honey, and mango to a blender. Blend on high for 45-60 seconds until smooth.",
          "If too thick, add more almond milk. If too thin, add more frozen fruit.",
          "Pour into glasses and enjoy fresh. Optionally garnish with chia seeds or granola.",
        ],
      },
      {
        name: "Salmon Toast",
        description: "Protein-rich breakfast",
        image: "https://images.unsplash.com/photo-1704545229893-4f1bb5ef16a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjB0b2FzdCUyMGF2b2NhZG98ZW58MXx8fHwxNzYzODYzNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        time: "8 min",
        nutrition: {
          carbs: "35 g",
          proteins: "25 g",
          fats: "18 g",
          sugars: "4 g",
          calories: "380 Cal",
        },
        prepTime: "5 min",
        cookTime: "8 min",
        difficulty: "Easy",
        servings: 2,
        ingredients: [
          "4 oz smoked salmon",
          "2 slices sourdough bread",
          "3 tbsp cream cheese",
          "1/2 avocado, sliced",
          "1 tbsp capers",
          "Fresh dill and lemon wedge for serving",
        ],
        instructions: [
          "Toast sourdough slices until golden and crispy.",
          "Generously spread cream cheese on each toasted bread slice while still warm.",
          "Add smoked salmon pieces, then arrange avocado slices on top. Sprinkle with capers.",
          "Top with fresh dill and a squeeze of lemon. Serve immediately with extra lemon wedges on the side.",
        ],
      },
    ];
  }
}

// Export a singleton instance for convenience
export const recipeSearch = new RecipeSearch();