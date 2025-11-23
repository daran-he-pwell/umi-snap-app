import { useState } from "react";
import { Camera, Plus, Check, BookOpen, Calendar, User, Settings, X, Sparkles, ShoppingCart, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import imgCameraView from "figma:asset/fd747550bbbbcab003f27f9ca4085b33cba0b546.png";
import RecipeDetailsView from "./components/RecipeDetailsView";
import { recipeSearch } from "./utils/RecipeSearch";
import type { Recipe } from "./utils/RecipeSearch";
// Real fridge/table images
import frozenBeefLabeled from './assets/real-images/frozen-beef-labeled.jpg';
import frozenDrumsticks from './assets/real-images/frozen-drumsticks.webp';
import insideFridge from './assets/real-images/inside-fridge.jpg';
import realFridge1 from './assets/real-images/real-fridge1.webp';
import realFridge2 from './assets/real-images/real-fridge2.jpg';
import realFridge3 from './assets/real-images/real-fridge3.jpg';
import realTable1 from './assets/real-images/real-table1.webp';

type DayMeals = {
  breakfast: Recipe | null;
  lunch: Recipe | null;
  dinner: Recipe | null;
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const galleryImages = [
  frozenBeefLabeled,
  frozenDrumsticks,
  insideFridge,
  realFridge1,
  realFridge2,
  realFridge3,
  realTable1,
];

export default function App() {
  // Core states - only 3 recipe-related states
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [searchResultRecipes, setSearchResultRecipes] = useState<Recipe[]>([]);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);

  // UI states
  const [activeTab, setActiveTab] = useState<"recipe" | "mealprep" | "profile">("mealprep");
  const [selectedDay, setSelectedDay] = useState(0);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showCameraView, setShowCameraView] = useState(false);
  const [selectingMealType, setSelectingMealType] = useState<"breakfast" | "lunch" | "dinner" | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [showGalleryPanel, setShowGalleryPanel] = useState(false);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState<string[]>([]);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRecipeForDetails, setSelectedRecipeForDetails] = useState<Recipe | null>(null);
  const [weeklyMeals, setWeeklyMeals] = useState<Record<number, DayMeals>>({});

  const currentDayMeals = weeklyMeals[selectedDay] || {
    breakfast: null,
    lunch: null,
    dinner: null,
  };

  const addMeal = (mealType: "breakfast" | "lunch" | "dinner", recipe: Recipe) => {
    setWeeklyMeals((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [mealType]: recipe,
      },
    }));
    setShowRecipeModal(false);
    setSelectingMealType(null);
  };

  const removeMeal = (mealType: "breakfast" | "lunch" | "dinner") => {
    setWeeklyMeals((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [mealType]: null,
      },
    }));
  };

  const openAddMealModal = (mealType: "breakfast" | "lunch" | "dinner") => {
    setSelectingMealType(mealType);
    setShowRecipeModal(true);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setCapturedPhotos((prev) => [imgCameraView, ...prev].slice(0, 4));
    }, 1000);
  };

  const handleSearchRecipes = async () => {
    setIsSearching(true);
    
    try {
      const response = await recipeSearch.chat(
        recipeSearchQuery || "Find recipes with these ingredients",
        capturedPhotos.length > 0 ? capturedPhotos : undefined
      );
      
      setDetectedIngredients(response.ingredients);
      setSearchResultRecipes(response.recipes);
      
      setIsSearching(false);
      setShowCameraView(false);
      setActiveTab("recipe");
    } catch (error) {
      console.error("Recipe search failed:", error);
      setIsSearching(false);
      alert("Search failed. Please try again.");
    }
  };

  const toggleGalleryImage = (image: string) => {
    setSelectedGalleryImages((prev) =>
      prev.includes(image) ? prev.filter((img) => img !== image) : [...prev, image]
    );
  };

  const addGalleryPhotos = () => {
    setCapturedPhotos((prev) => [...selectedGalleryImages, ...prev].slice(0, 4));
    setSelectedGalleryImages([]);
    setShowGalleryPanel(false);
  };

  const toggleSaveRecipe = (recipe: Recipe) => {
    setSavedRecipes((prev) => {
      const isAlreadySaved = prev.some((r) => r.name === recipe.name);
      if (isAlreadySaved) {
        return prev.filter((r) => r.name !== recipe.name);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isRecipeSaved = (recipe: Recipe) => {
    return savedRecipes.some((r) => r.name === recipe.name);
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white overflow-hidden relative rounded-3xl shadow-2xl w-full max-w-sm" style={{ height: "812px" }}>
        {/* Main Content */}
        <div className="bg-white overflow-y-auto pb-24" style={{ height: "calc(100% - 88px)" }}>
          <AnimatePresence mode="wait">
            {activeTab === "mealprep" && (
              <motion.div
                key="mealprep"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-6"
              >
                {/* This Week Section */}
                <div>
                  <h2 className="mb-4">This Week</h2>
                  <div className="flex gap-2 mb-6">
                    {daysOfWeek.map((day, index) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(index)}
                        className={`flex-1 px-3 py-2 rounded-2xl transition-colors ${
                          selectedDay === index
                            ? "bg-purple-100 text-purple-700 border-2 border-purple-600"
                            : "bg-transparent text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        <p>{day}</p>
                      </button>
                    ))}
                  </div>

                  {/* Meals for Selected Day */}
                  <div className="space-y-2">
                    {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
                      const meal = currentDayMeals[mealType];
                      return (
                        <div
                          key={mealType}
                          className={`flex items-center justify-between rounded-xl p-2 ${
                            meal ? "bg-yellow-100" : "bg-white"
                          }`}
                        >
                          {meal ? (
                            <>
                              <div 
                                onClick={() => {
                                  const recipe = savedRecipes.find(r => r.name === meal.name);
                                  if (recipe) setSelectedRecipeForDetails(recipe);
                                }}
                                className="flex items-center gap-4 flex-1 cursor-pointer"
                              >
                                <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-200">
                                  <img
                                    alt={meal.name}
                                    className="size-full object-cover"
                                    src={meal.image}
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-xs capitalize">{mealType}</p>
                                  <p className="text-gray-600 text-xs">{meal.name}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeMeal(mealType)}
                                className="p-2 hover:bg-yellow-200 rounded-lg transition-colors"
                              >
                                <Check className="size-5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <Camera className="size-5 text-gray-400" />
                                </div>
                                <p className="font-semibold text-xs capitalize">{mealType}</p>
                              </div>
                              <button
                                onClick={() => openAddMealModal(mealType)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Plus className="size-5" />
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Added Recipes Section */}
                <div>
                  <h2 className="mb-4">Added Recipes</h2>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {savedRecipes.map((recipe, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedRecipeForDetails(recipe)}
                        className="flex-shrink-0 w-36 cursor-pointer"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                          <div className="relative h-32 bg-gray-200">
                            <img alt={recipe.name} className="size-full object-cover" src={recipe.image} />
                          </div>
                          <div className="p-2">
                            <p className="font-semibold text-xs mb-1">{recipe.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-600">
                              <span>{recipe.time}</span>
                              <span>{recipe.nutrition.calories}</span>
                              <span>{recipe.nutrition.proteins}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "recipe" && (
              <motion.div
                key="recipe"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 relative space-y-6"
              >
                {/* Search Results Section */}
                {searchResultRecipes.length > 0 && (
                  <div>
                    <h2 className="mb-4">Search Results</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {searchResultRecipes.map((recipe, index) => {
                        const isSaved = isRecipeSaved(recipe);
                        return (
                          <div 
                            key={index} 
                            onClick={() => setSelectedRecipeForDetails(recipe)}
                            className="bg-white rounded-xl overflow-hidden shadow-sm relative cursor-pointer"
                          >
                            <div className="relative h-32 bg-gray-200">
                              <img alt={recipe.name} className="size-full object-cover" src={recipe.image} />
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSaveRecipe(recipe);
                                }}
                                className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                                  isSaved
                                    ? "bg-[#d8cff2] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] border-[3px] border-white"
                                    : "bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] hover:bg-gray-50"
                                }`}
                              >
                                {isSaved ? (
                                  <Check className="size-5 text-black" strokeWidth={2.5} />
                                ) : (
                                  <Plus className="size-5 text-black" strokeWidth={1.5} />
                                )}
                              </button>
                            </div>
                            <div className="p-3">
                              <p className="font-semibold text-sm mb-1">{recipe.name}</p>
                              <div className="flex flex-col gap-0.5 text-[10px] text-gray-600">
                                <span>{recipe.time} • {recipe.nutrition.calories}</span>
                                <span>{recipe.nutrition.proteins}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Saved Recipes Section */}
                <div>
                  <h2 className="mb-4">Saved Recipes</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {savedRecipes.map((recipe, index) => {
                      const isSaved = isRecipeSaved(recipe);
                      return (
                        <div 
                          key={index} 
                          onClick={() => setSelectedRecipeForDetails(recipe)}
                          className="bg-white rounded-xl overflow-hidden shadow-sm relative cursor-pointer"
                        >
                          <div className="relative h-32 bg-gray-200">
                            <img alt={recipe.name} className="size-full object-cover" src={recipe.image} />
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveRecipe(recipe);
                              }}
                              className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                                isSaved
                                  ? "bg-[#d8cff2] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] border-[3px] border-white"
                                  : "bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] hover:bg-gray-50"
                              }`}
                            >
                              {isSaved ? (
                                <Check className="size-5 text-black" strokeWidth={2.5} />
                              ) : (
                                <Plus className="size-5 text-black" strokeWidth={1.5} />
                              )}
                            </button>
                          </div>
                          <div className="p-3">
                            <p className="font-semibold text-sm mb-1">{recipe.name}</p>
                            <div className="flex flex-col gap-0.5 text-[10px] text-gray-600">
                              <span>{recipe.time} • {recipe.nutrition.calories}</span>
                              <span>{recipe.nutrition.proteins}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6"
              >
                <h2 className="mb-6">Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="size-20 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="size-10 text-purple-600" />
                    </div>
                    <div>
                      <h3>Welcome Back!</h3>
                      <p className="text-sm text-gray-600">Meal planning made easy</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span>Weekly meals planned</span>
                      <span className="font-semibold">
                        {Object.values(weeklyMeals).reduce((acc, day) => {
                          return acc + (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.dinner ? 1 : 0);
                        }, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span>Saved recipes</span>
                      <span className="font-semibold">{savedRecipes.length}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                      <span>Dietary Preferences</span>
                      <Settings className="size-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                      <span>Shopping List</span>
                      <ShoppingCart className="size-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                      <span>Settings</span>
                      <Settings className="size-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Camera Button */}
        <AnimatePresence>
          {activeTab === "recipe" && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={() => setShowCameraView(true)}
              className="absolute bottom-28 right-6 bg-purple-600 text-white p-5 rounded-full shadow-2xl hover:bg-purple-700 transition-all hover:scale-110 z-40"
            >
              <Camera className="size-7" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pb-6 pt-3">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab("recipe")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "recipe" ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <BookOpen className="size-5" />
              <span className="text-xs">Recipe</span>
            </button>

            <button
              onClick={() => setActiveTab("mealprep")}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "mealprep" ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <Calendar className="size-5" />
              <span className="text-xs font-semibold">Meal Prep</span>
              {activeTab === "mealprep" && (
                <div className="absolute -top-1 right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === "profile" ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <User className="size-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>

        {/* Camera View Modal */}
        <AnimatePresence>
          {showCameraView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col bg-black"
            >
              <div className="absolute inset-0 bg-black">
                <svg className="absolute inset-0 size-full opacity-30" preserveAspectRatio="none" viewBox="0 0 394 816">
                  <path d="M0 253L394 253" stroke="white" strokeOpacity="0.3" />
                  <path d="M0 380L394 380" stroke="white" strokeOpacity="0.3" />
                  <path d="M135 0V649" stroke="white" strokeOpacity="0.3" />
                  <path d="M260 0V649" stroke="white" strokeOpacity="0.3" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between p-4 pt-12">
                  <button
                    onClick={() => setShowCameraView(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="size-6 text-white" strokeWidth={2.75} />
                  </button>
                </div>

                <div className="px-3 py-2 flex items-center gap-4">
                  <button className="bg-black/40 backdrop-blur-sm p-4 rounded-[19px] flex-shrink-0">
                    <ShoppingCart className="size-7 text-white" strokeWidth={2.35} />
                  </button>

                  <div className="flex gap-4 flex-1 overflow-x-auto pt-2 pr-2">
                    {[...Array(4).keys()].map((i) => (
                      <div key={i} className="flex-shrink-0 relative">
                        <div className="w-[73px] h-[68px] bg-white/20 border border-white/50 rounded-xl backdrop-blur-sm overflow-hidden">
                          {capturedPhotos[i] && (
                            <img src={capturedPhotos[i]} alt={`Captured ${i}`} className="size-full object-cover" />
                          )}
                        </div>
                        {capturedPhotos[i] && (
                          <button
                            onClick={() => {
                              setCapturedPhotos((prev) => prev.filter((_, index) => index !== i));
                            }}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                          >
                            <X className="size-3" strokeWidth={3} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-3">
                  <input
                    type="text"
                    value={recipeSearchQuery}
                    onChange={(e) => setRecipeSearchQuery(e.target.value)}
                    placeholder="What do you want to make"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/50 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="flex-1" />

                <div className="px-16 pb-12 flex justify-center">
                  <div className="relative">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-2xl px-4 py-3 max-w-[262px]">
                      <div className="flex items-start gap-2">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Take Photos</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Snap as many fridge photos as you want.
                          </p>
                        </div>
                        <div className="absolute -top-2 right-12 transform rotate-[10deg]">
                          <Camera className="size-6 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-[-1px]">
                      <div className="w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45" />
                    </div>
                  </div>
                </div>

                <div className="px-12 pb-12 flex items-center justify-center gap-6">
                  <button 
                    onClick={() => setShowGalleryPanel(true)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <ImageIcon className="size-7 text-purple-700" strokeWidth={2} />
                    </div>
                    <span className="text-white text-[10px] font-medium">Gallery</span>
                  </button>

                  <button
                    onClick={handleScan}
                    className="w-[72px] h-[72px] relative"
                  >
                    <div className="absolute inset-0 rounded-full border border-white border-dashed animate-[spin_20s_linear_infinite]" style={{ strokeDasharray: "5 5" }} />
                    <div className="absolute inset-[6px] rounded-full border border-black bg-white" />
                  </button>

                  <button
                    onClick={handleSearchRecipes}
                    disabled={capturedPhotos.length === 0}
                    className={`w-16 h-16 transition-opacity ${
                      capturedPhotos.length === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100"
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-purple-700 flex items-center justify-center">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 60 60">
                        <path d="M24.1667 30H35.8333M35.8333 30L30 24.1667M35.8333 30L30 35.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Panel */}
        <AnimatePresence>
          {showGalleryPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-end z-[60]"
              onClick={() => setShowGalleryPanel(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-white rounded-t-[27px] w-full max-h-[70vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white pt-9 px-3 pb-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">Select photos</p>
                    <button
                      onClick={() => {
                        setShowGalleryPanel(false);
                        setSelectedGalleryImages([]);
                      }}
                      className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="size-4 text-gray-600" strokeWidth={2.75} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                  <div className="grid grid-cols-3 gap-2 pb-3">
                    {galleryImages.map((image, index) => {
                      const isSelected = selectedGalleryImages.includes(image);
                      return (
                        <button
                          key={index}
                          onClick={() => toggleGalleryImage(image)}
                          className="relative h-[123px] rounded-[5px] overflow-hidden border border-gray-300"
                        >
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="size-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div
                              className={`size-[21px] rounded-full border-2 ${
                                isSelected
                                  ? "bg-purple-600 border-purple-600"
                                  : "border-gray-400 bg-transparent"
                              } flex items-center justify-center`}
                            >
                              {isSelected && (
                                <Check className="size-3 text-white" strokeWidth={3} />
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white px-6 pb-8 pt-3 border-t border-gray-100">
                  <button
                    onClick={addGalleryPhotos}
                    disabled={selectedGalleryImages.length === 0}
                    className="w-full bg-[#fdb022] text-white py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e89d1a] transition-colors shadow-sm"
                  >
                    Add Photo{selectedGalleryImages.length > 1 ? "s" : ""}
                    {selectedGalleryImages.length > 0 && ` (${selectedGalleryImages.length})`}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe Selection Modal */}
        <AnimatePresence>
          {showRecipeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-end z-50"
              onClick={() => setShowRecipeModal(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="bg-white rounded-t-3xl w-full p-6 max-h-[70vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                <h2 className="mb-4">
                  Select a recipe for {selectingMealType}
                </h2>
                {savedRecipes.length > 0 ? (
                  <div className="space-y-3">
                    {savedRecipes.map((recipe, index) => (
                      <button
                        key={index}
                        onClick={() => selectingMealType && addMeal(selectingMealType, recipe)}
                        className="w-full flex items-center gap-4 p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors"
                      >
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-200">
                          <img alt={recipe.name} className="size-full object-cover" src={recipe.image} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold">{recipe.name}</p>
                          <p className="text-sm text-gray-600">
                            {recipe.time} • {recipe.nutrition.calories} • {recipe.nutrition.proteins}
                          </p>
                        </div>
                        <Plus className="size-5 text-purple-600" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-2">No saved recipes yet</p>
                    <p className="text-sm">Use the camera to search for recipes first!</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Searching for Recipes Loading Screen */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center z-[70]"
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="size-16 text-white"
                >
                  <Sparkles className="size-16" strokeWidth={1.5} />
                </motion.div>
                <div className="text-center">
                  <h2 className="text-white mb-2">Searching for recipes</h2>
                  <p className="text-white/80 text-sm">Analyzing your ingredients...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe Details Modal */}
        <AnimatePresence>
          {selectedRecipeForDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[80] overflow-y-auto"
              onClick={() => setSelectedRecipeForDetails(null)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <RecipeDetailsView recipe={selectedRecipeForDetails} />
              </div>
              <button
                onClick={() => setSelectedRecipeForDetails(null)}
                className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-[90]"
              >
                <X className="size-6 text-gray-700" strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
