import { useState } from "react";
import { Check } from "lucide-react";
import imgDish from "figma:asset/96c14d2b52aa91c3b29c3380231859002373112a.png";
import imgFire from "figma:asset/7e180f5408d2acafd7483f20e1f428551c13c193.png";
import svgPaths from "../imports/svg-mjxklgxmlc";

type Recipe = {
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

type RecipeDetailsViewProps = {
  recipe: Recipe;
};

export default function RecipeDetailsView({ recipe }: RecipeDetailsViewProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [cookModeEnabled, setCookModeEnabled] = useState(true);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white min-h-full w-full overflow-y-auto">
      {/* Header Image Section */}
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[10px] pt-[18px] px-[10px] relative w-full">
        <div className="content-stretch flex flex-col gap-[9px] items-center relative shrink-0 w-full">
          {/* Recipe Image */}
          <div className="h-[197px] relative rounded-[9px] shrink-0 w-full overflow-hidden">
            <img alt={recipe.name} className="absolute max-w-none object-center object-cover rounded-[9px] size-full" src={recipe.image} />
          </div>
          
          {/* Recipe From (if available) */}
          {recipe.recipeFrom && (
            <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap whitespace-pre">{`Recipe from: ${recipe.recipeFrom}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Name */}
      <div className="px-6 pt-4">
        <h1 className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] text-[#182230] text-[24px]">
          {recipe.name}
        </h1>
      </div>

      {/* Recipe Metadata (Prep time, Cook time, Difficulty) */}
      <div className="px-6 py-4">
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="h-[16px] relative shrink-0 w-[15px]">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgDish} />
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap whitespace-pre">
              Prep: {recipe.prepTime}
            </p>
          </div>
          
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="hourglass-03">
                  <path d={svgPaths.p166a4e00} id="Icon" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                </g>
              </svg>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap whitespace-pre">
              Cook: {recipe.cookTime}
            </p>
          </div>
          
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgFire} />
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap whitespace-pre">
              Level: {recipe.difficulty}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-[#d0d5dd] h-px shrink-0 w-full my-4" />

      {/* Nutrition Info */}
      <div className="px-6 py-6">
        <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] min-w-full not-italic relative shrink-0 text-[#182230] text-[20px] text-center w-[min-content]">
            Nutrition Info
          </p>
          <div className="content-stretch flex gap-[10px] items-start justify-center relative rounded-[14px] shrink-0 w-full">
            {/* Carbs */}
            <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0 border border-[rgba(0,0,0,0.09)]">
              <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
                <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                  <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[13px] text-black">{recipe.nutrition.carbs}</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px]">Carbs</p>
                </div>
              </div>
            </div>
            
            {/* Proteins */}
            <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0 border border-[rgba(0,0,0,0.09)]">
              <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
                <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                  <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[13px] text-black">{recipe.nutrition.proteins}</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px]">Proteins</p>
                </div>
              </div>
            </div>
            
            {/* Fats */}
            <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0 border border-[rgba(0,0,0,0.09)]">
              <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
                <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                  <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[13px] text-black">{recipe.nutrition.fats}</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px]">Fats</p>
                </div>
              </div>
            </div>
            
            {/* Sugars */}
            <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0 border border-[rgba(0,0,0,0.09)]">
              <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
                <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
                  <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[13px] text-black">{recipe.nutrition.sugars}</p>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px]">Sugars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start px-[24px] py-6 relative shrink-0 w-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#182230] text-[20px] text-center w-full">
          Ingredients
        </p>
        
        <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
          {/* Servings Control */}
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
            <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">
              For {servings} servings
            </p>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[133px]">
              <div className="basis-0 bg-white content-stretch flex gap-[3px] grow items-start min-h-px min-w-px relative rounded-[9px] shrink-0">
                <div className="basis-0 content-stretch flex gap-[6px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                  {/* Minus Button */}
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[22px] shrink-0 border-2 border-[#eaecf0] hover:bg-gray-50 transition-colors"
                  >
                    <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[11px] relative w-full">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path d="M3.33333 8H12.6667" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Count Display */}
                  <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[22px] shrink-0 border-2 border-[#eaecf0]">
                    <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[9px] relative w-full">
                      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#7156bd] text-[14px] text-nowrap whitespace-pre">
                        {servings}
                      </p>
                    </div>
                  </div>
                  
                  {/* Plus Button */}
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[22px] shrink-0 border-2 border-[#7156bd] hover:bg-purple-50 transition-colors"
                  >
                    <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[11px] relative w-full">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path d={svgPaths.p3b397100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ingredients List */}
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
              <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">
                {ingredient}
              </p>
              <button
                onClick={() => toggleIngredient(index)}
                className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0"
              >
                <div className={`relative rounded-[6px] shrink-0 size-[20px] border ${
                  checkedIngredients.has(index) ? "border-[#7156bd] bg-[#7156bd]" : "border-[#d0d5dd]"
                } transition-colors`}>
                  {checkedIngredients.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
          
          {/* One Click Make it Healthy Button */}
          <div className="content-stretch flex flex-col gap-[10px] items-end justify-center relative shrink-0 w-full">
            <button className="bg-white relative rounded-[40px] shrink-0 border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-colors">
              <div className="box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p1e780c00} stroke="#344054" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#344054] text-[14px] text-nowrap whitespace-pre">
                  One Click Make it Healthy
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Cook Mode Toggle */}
      <div className="px-6 py-4">
        <button
          onClick={() => setCookModeEnabled(!cookModeEnabled)}
          className="bg-gray-50 relative rounded-[7px] shrink-0 w-full hover:bg-gray-100 transition-colors"
        >
          <div className="box-border content-stretch flex gap-[15px] items-center px-[7px] py-[2px] relative w-full">
            {/* Toggle Switch */}
            <div className={`box-border content-stretch flex h-[24px] items-center overflow-clip p-[2px] relative rounded-[9999px] shrink-0 w-[44px] transition-colors ${
              cookModeEnabled ? "bg-[#7156bd] justify-end" : "bg-gray-300 justify-start"
            }`}>
              <div className="bg-white rounded-[9999px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] shrink-0 size-[20px]" />
            </div>
            {/* Text */}
            <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium items-start justify-center not-italic relative shrink-0 text-left text-nowrap whitespace-pre">
              <p className="leading-[20px] relative shrink-0 text-[#667085] text-[14px]">Cook Mode</p>
              <p className="leading-[16px] relative shrink-0 text-[#98a2b3] text-[12px]">Prevent your screen from going dark</p>
            </div>
          </div>
        </button>
      </div>

      {/* Instructions Section */}
      <div className="px-6 py-6 space-y-6 pb-24">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic text-[#182230] text-[20px] text-center w-full">
          Instructions
        </p>
        
        <div className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
              {/* Step Number */}
              <div className="bg-[#f2f4f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[10px] relative rounded-[25px] shrink-0 size-[32px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-black text-center text-nowrap whitespace-pre">
                  {index + 1}
                </p>
              </div>
              
              {/* Instruction Text */}
              <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[16px]">
                <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#344054] w-full">
                  {instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
