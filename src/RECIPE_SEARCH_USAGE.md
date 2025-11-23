# RecipeSearch Usage Guide

## Overview

The `RecipeSearch` class is a stateful object that handles recipe searching based on images and text queries. It maintains conversation history and accumulates detected ingredients across multiple searches.

## Integration

### Files Created
- `/utils/RecipeSearch.ts` - Stateful recipe search class
- Integrated into `/App.tsx`

### How It Works

```typescript
// Singleton instance exported from RecipeSearch.ts
import { recipeSearch } from './utils/RecipeSearch';

// Call the chat method
const response = await recipeSearch.chat(textQuery, images);

// Response contains:
// - recipes: Recipe[]
// - ingredients: string[]
```

## API

### `chat(text: string, imgs?: string[])`

**Purpose:** Search for recipes based on text and optional images

**Parameters:**
- `text` (string, required): Search query or conversation text
- `imgs` (string[], optional): Array of image URLs

**Returns:** `Promise<ChatResponse>`
```typescript
{
  recipes: Recipe[],       // List of recipes matching the query
  ingredients: string[]    // All detected ingredients (cumulative)
}
```

**Example:**
```typescript
const response = await recipeSearch.chat(
  "Find healthy dinner recipes",
  ["image1.jpg", "image2.jpg"]
);

console.log(response.recipes);      // Array of Recipe objects
console.log(response.ingredients);  // ["Salmon", "Avocado", "Rice", ...]
```

### Other Methods

#### `reset()`
Clears conversation history and detected ingredients
```typescript
recipeSearch.reset();
```

#### `getHistory()`
Returns the conversation history
```typescript
const history = recipeSearch.getHistory();
```

#### `getDetectedIngredients()`
Returns all detected ingredients
```typescript
const ingredients = recipeSearch.getDetectedIngredients();
```

## Current Implementation (Mock)

The current implementation is a **mock** that:
1. Waits 1.5-2.5 seconds (simulates API delay)
2. Generates fake ingredients based on number of images
3. Returns 3 preset recipes

### Mock Behavior
- **Images → Ingredients:** More images = more ingredients detected
- **Ingredients:** Randomly selected from a predefined list
- **Recipes:** Returns 3 hardcoded recipes (California Poke Bowl, Green Smoothie, Avocado Toast)
- **State:** Ingredients accumulate across multiple searches

## Replacing with Real API

To replace the mock with a real API, edit `/utils/RecipeSearch.ts`:

### Step 1: Update the `chat` method

```typescript
async chat(text: string, imgs?: string[]): Promise<ChatResponse> {
  // Store interaction
  this.conversationHistory.push({
    text,
    images: imgs || [],
    timestamp: new Date(),
  });

  // Call your real API
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY',
    },
    body: JSON.stringify({
      text,
      images: imgs,
      context: this.conversationHistory, // Optional: send conversation history
    }),
  });

  const data = await response.json();

  // Update detected ingredients (stateful)
  data.ingredients.forEach((ing: string) => {
    this.detectedIngredients.add(ing);
  });

  return {
    recipes: data.recipes,
    ingredients: Array.from(this.detectedIngredients),
  };
}
```

### Step 2: Remove mock methods

Delete or comment out:
- `generateMockIngredients()`
- `generateMockRecipes()`

## Data Types

### Recipe Type
```typescript
type Recipe = {
  name: string;                    // "California Poke Bowl"
  description: string;             // "Fresh and healthy poke bowl"
  image: string;                   // URL to recipe image
  time: string;                    // "15 min"
  nutrition: {
    carbs: string;                 // "101 g"
    proteins: string;              // "24 g"
    fats: string;                  // "12 g"
    sugars: string;                // "21 g"
    calories: string;              // "450 Cal"
  };
  prepTime: string;                // "10 min"
  cookTime: string;                // "15 min"
  difficulty: string;              // "Easy", "Medium", "Hard"
  servings: number;                // 3
  recipeFrom?: string;             // Optional: "Tasty"
  recipeFromImage?: string;        // Optional: logo URL
  ingredients: string[];           // ["ingredient 1", "ingredient 2", ...]
  instructions: string[];          // ["step 1", "step 2", ...]
};
```

### ChatResponse Type
```typescript
type ChatResponse = {
  recipes: Recipe[];
  ingredients: string[];
};
```

## State Management

The `RecipeSearch` class maintains state across calls:

### Conversation History
- Stores all past interactions (text + images + timestamp)
- Useful for context-aware APIs
- Access with `getHistory()`
- Clear with `reset()`

### Detected Ingredients
- Accumulates all ingredients found across searches
- Stored in a Set (no duplicates)
- Access with `getDetectedIngredients()`
- Clear with `reset()`

### Example Flow
```typescript
// First search
const result1 = await recipeSearch.chat("breakfast ideas", ["img1.jpg"]);
// result1.ingredients: ["Eggs", "Bread", "Butter"]

// Second search (adds to existing)
const result2 = await recipeSearch.chat("lunch ideas", ["img2.jpg"]);
// result2.ingredients: ["Eggs", "Bread", "Butter", "Salmon", "Avocado"]

// Reset state
recipeSearch.reset();

// Third search (starts fresh)
const result3 = await recipeSearch.chat("dinner ideas", ["img3.jpg"]);
// result3.ingredients: ["Chicken", "Rice", "Vegetables"]
```

## App.tsx Integration

### State
```typescript
const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
```

### Usage in handleSearchRecipes
```typescript
const handleSearchRecipes = async () => {
  setIsSearching(true);
  
  try {
    // Call RecipeSearch.chat()
    const response = await recipeSearch.chat(
      recipeSearchQuery || "Find recipes with these ingredients",
      capturedPhotos.length > 0 ? capturedPhotos : undefined
    );
    
    // Store detected ingredients
    setDetectedIngredients(response.ingredients);
    
    // Display recipes
    setSearchResults(response.recipes.map(recipe => ({
      name: recipe.name,
      description: recipe.description,
      image: recipe.image,
      time: recipe.time,
      calories: recipe.nutrition.calories,
      protein: recipe.nutrition.proteins,
    })));
    
    setIsSearching(false);
    setShowCameraView(false);
    setActiveTab("recipe");
  } catch (error) {
    console.error("Recipe search failed:", error);
    setIsSearching(false);
    alert("Search failed. Please try again.");
  }
};
```

## Testing

### Test with Mock
The current mock implementation will:
1. Show loading screen for ~2 seconds
2. Return 3 recipes
3. Generate 4-10 fake ingredients based on image count
4. Accumulate ingredients across searches

### Test Checklist
- ✅ Search with no images (text only)
- ✅ Search with 1 image
- ✅ Search with multiple images
- ✅ Multiple searches in sequence
- ✅ Check ingredients accumulate
- ✅ Reset and search again
- ✅ Error handling

## Future Enhancements

### Potential Features
1. **Dietary Filters:** Add parameters for dietary restrictions
2. **Cuisine Preferences:** Filter by cuisine type
3. **Ingredient Exclusions:** Specify ingredients to avoid
4. **Recipe Caching:** Cache results to avoid duplicate API calls
5. **Pagination:** Support for loading more results
6. **Confidence Scores:** Return confidence for detected ingredients

### Example Enhanced API
```typescript
async chat(
  text: string, 
  imgs?: string[],
  options?: {
    dietary?: string[];        // ["vegetarian", "gluten-free"]
    cuisine?: string;          // "italian", "asian", "mexican"
    excludeIngredients?: string[];  // ["nuts", "dairy"]
    maxResults?: number;       // 10, 20, 50
  }
): Promise<ChatResponse>
```

## Troubleshooting

### Issue: "recipeSearch is not defined"
**Solution:** Make sure you imported it:
```typescript
import { recipeSearch } from './utils/RecipeSearch';
```

### Issue: TypeScript errors about Recipe type
**Solution:** Import the type:
```typescript
import type { Recipe } from './utils/RecipeSearch';
```

### Issue: Ingredients not accumulating
**Solution:** Check if you're calling `reset()` somewhere unintentionally

### Issue: Mock returns same recipes every time
**Solution:** This is expected behavior. Replace with real API for dynamic results.

## Summary

- ✅ **Stateful:** Maintains conversation history and ingredients
- ✅ **Simple API:** Single `chat()` method for all searches
- ✅ **Type-safe:** Full TypeScript support
- ✅ **Mock-ready:** Works out of the box with fake data
- ✅ **API-ready:** Easy to replace mock with real API
- ✅ **Flexible:** Optional images, supports text-only searches
- ✅ **Integrated:** Already connected to App.tsx camera flow
