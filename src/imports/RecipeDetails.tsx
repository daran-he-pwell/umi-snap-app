import svgPaths from "./svg-mjxklgxmlc";
import imgFrame1171278484 from "figma:asset/d275c53d08ea9998242e785a66863f17edc90882.png";
import imgScreenshot20251030At23257Pm from "figma:asset/564fd32521814b0b6acf4d07494568205fd4c9d5.png";
import imgFrame from "figma:asset/c6217e4c03926405ff2ae7a4f8c8d5bea3585ca9.png";
import imgDish from "figma:asset/96c14d2b52aa91c3b29c3380231859002373112a.png";
import imgFire from "figma:asset/7e180f5408d2acafd7483f20e1f428551c13c193.png";

function Frame12() {
  return (
    <div className="h-[197px] relative rounded-[9px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9px]">
        <div className="absolute bg-white inset-0 rounded-[9px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9px] size-full" src={imgFrame1171278484} />
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="backdrop-blur-[3.869px] backdrop-filter bg-white content-stretch flex flex-col gap-[6.503px] items-start relative shrink-0 w-[71px]">
      <div className="aspect-[560/176] relative shrink-0 w-full" data-name="Screenshot 2025-10-30 at 2.32.57 PM">
        <img alt="" className="absolute backdrop-blur-[56.413px] backdrop-filter inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgScreenshot20251030At23257Pm} />
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-nowrap whitespace-pre">{`Recipe from: `}</p>
      <Frame57 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start justify-center relative shrink-0 w-full">
      <Frame58 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-full">
      <Frame14 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] h-[242px] items-center relative shrink-0 w-full">
      <Frame12 />
      <Frame15 />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[19.636px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="plus">
          <path d={svgPaths.p19e0aea0} id="Icon" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.63636" />
        </g>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8.182px] items-center left-[338px] p-[8.182px] rounded-[34.364px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] top-[28px]" data-name="Component 15">
      <Plus />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[10px] pt-[18px] px-[10px] relative w-full">
          <Frame16 />
          <Component1 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-0 top-[97px] w-[394px]">
      <Frame17 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[47px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[13px] text-black w-full">101 g</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px] w-full">Carbs</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[13px]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold min-w-full relative shrink-0 text-[13px] text-black w-[min-content]">24 g</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px] text-nowrap whitespace-pre">Proteins</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[13px]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-[47px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[13px] text-black w-full">12 g</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px] w-full">Fats</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[13px]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center leading-[normal] not-italic relative shrink-0 text-center w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold min-w-full relative shrink-0 text-[13px] text-black w-[min-content]">21 g</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#98a2b3] text-[14px] text-nowrap whitespace-pre">Sugars</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[13px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.09)] border-solid inset-0 pointer-events-none rounded-[13px]" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center px-[8px] py-[10px] relative w-full">
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative rounded-[14px] shrink-0 w-[340px]">
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] min-w-full not-italic relative shrink-0 text-[#182230] text-[20px] text-center w-[min-content]">Nutrition Info</p>
      <Frame37 />
    </div>
  );
}

function Minus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="minus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="minus">
          <path d="M3.33333 8H12.6667" id="Icon" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame54() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[22px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[22px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[11px] relative w-full">
          <Minus />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[22px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[22px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[9px] relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#7156bd] text-[14px] text-nowrap whitespace-pre">3</p>
        </div>
      </div>
    </div>
  );
}

function Plus1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="plus">
          <path d={svgPaths.p3b397100} id="Icon" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame53() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[22px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#7156bd] border-solid inset-0 pointer-events-none rounded-[22px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[10px] py-[11px] relative w-full">
          <Plus1 />
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <Frame54 />
      <Frame52 />
      <Frame53 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="basis-0 bg-white content-stretch flex gap-[3px] grow items-start min-h-px min-w-px relative rounded-[9px] shrink-0">
      <Frame51 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[133px]" data-name="Component 13">
      <Frame50 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">For 3 servings</p>
      <Component />
    </div>
  );
}

function CheckboxBase() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Checkbox">
      <CheckboxBase />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">8 oz (225 g) sushi-grade salmon, cut into bite-sized cubes</p>
      <Checkbox />
    </div>
  );
}

function CheckboxBase1() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Checkbox">
      <CheckboxBase1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">2 tbsp soy sauce (or tamari for gluten-free)</p>
      <Checkbox1 />
    </div>
  );
}

function CheckboxBase2() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Checkbox">
      <CheckboxBase2 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">1 tsp sesame oil</p>
      <Checkbox2 />
    </div>
  );
}

function CheckboxBase3() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Checkbox">
      <CheckboxBase3 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">1 tsp rice vinegar</p>
      <Checkbox3 />
    </div>
  );
}

function CheckboxBase4() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[20px]" data-name="_Checkbox base">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0" data-name="Checkbox">
      <CheckboxBase4 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#182230] text-[16px]">1 tsp honey or mirin (optional, for a hint of sweetness)</p>
      <Checkbox4 />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#7156bd] text-[14px] text-nowrap whitespace-pre">More items buy with Instacart</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgFrame} />
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-right">
          <path d={svgPaths.p3b6ad300} id="Icon" stroke="var(--stroke-0, #7156BD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[40px] shrink-0" data-name="Buttons/Button">
      <TextPadding />
      <Frame />
      <ArrowRight />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <Frame31 />
      <Frame33 />
      <Frame24 />
      <Frame27 />
      <Frame28 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame29 key={i} />
      ))}
      <ButtonsButton />
    </div>
  );
}

function CheckHeart() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="check-heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="check-heart">
          <path d={svgPaths.p1e780c00} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function TextPadding1() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">One Click Make it Healthy</p>
      </div>
    </div>
  );
}

function ButtonsButton1() {
  return (
    <div className="bg-white relative rounded-[40px] shrink-0" data-name="Buttons/Button">
      <div className="box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <CheckHeart />
        <TextPadding1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[40px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-end justify-center relative shrink-0 w-full">
      <ButtonsButton1 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start px-[24px] py-0 relative shrink-0 w-[394px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#182230] text-[20px] text-center w-full">Ingredients</p>
      <Frame32 />
      <Frame56 />
    </div>
  );
}

function Frame34() {
  return <div className="bg-[#d0d5dd] h-px shrink-0 w-full" />;
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[16px] relative shrink-0 w-[15px]" data-name="dish">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgDish} />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap whitespace-pre">Prep: 10 min</p>
    </div>
  );
}

function Hourglass() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="hourglass-03">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="hourglass-03">
          <path d={svgPaths.p166a4e00} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Hourglass />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap whitespace-pre">Cook: 15 min</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="Fire">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgFire} />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center text-nowrap whitespace-pre">Level:Easy</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame41 />
      <Frame43 />
      <Frame44 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame13 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame40 />
    </div>
  );
}

function Button() {
  return <div className="bg-white rounded-[9999px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] shrink-0 size-[20px]" data-name="Button" />;
}

function ToggleBase() {
  return (
    <div className="bg-[#7156bd] box-border content-stretch flex h-[24px] items-center justify-end overflow-clip p-[2px] relative rounded-[9999px] shrink-0 w-[44px]" data-name="_Toggle base">
      <Button />
    </div>
  );
}

function Toggle() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Toggle">
      <ToggleBase />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium items-start justify-center not-italic relative shrink-0 text-center text-nowrap whitespace-pre">
      <p className="leading-[20px] relative shrink-0 text-[#667085] text-[14px]">Cook Mode</p>
      <p className="leading-[16px] relative shrink-0 text-[#98a2b3] text-[12px]">Prevent your screen from going dark</p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-gray-50 relative rounded-[7px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[15px] items-center px-[7px] py-[2px] relative w-full">
          <Toggle />
          <Frame62 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#f2f4f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[10px] relative rounded-[25px] shrink-0 size-[32px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-black text-center text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[16px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182230] w-full">Prepare the rice:</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#344054] w-full">Cook rice according to package instructions. If using, mix in 1 tsp rice vinegar while rice is warm. Let it cool slightly.</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Frame18 />
      <Frame46 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#f2f4f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[10px] relative rounded-[25px] shrink-0 size-[32px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-black text-center text-nowrap whitespace-pre">2</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[16px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182230] w-full">Mix the poke:</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#344054] w-full">In a bowl, combine diced tuna or salmon with soy sauce, sesame oil, rice vinegar, honey, and sriracha. Let it marinate for 5–10 minutes.</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Frame21 />
      <Frame47 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#f2f4f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[10px] relative rounded-[25px] shrink-0 size-[32px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-black text-center text-nowrap whitespace-pre">3</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[16px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182230] w-full">Assemble the bowl:</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#344054] w-full">Divide rice into two bowls. Arrange avocado, cucumber, carrot, edamame, and marinated fish on top.</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Frame22 />
      <Frame48 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#f2f4f7] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[10px] relative rounded-[25px] shrink-0 size-[32px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-black text-center text-nowrap whitespace-pre">4</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[16px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#182230] w-full">Garnish:</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#344054] w-full">Sprinkle with sesame seeds and nori strips. Serve immediately.</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Frame23 />
      <Frame49 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[29px] items-start px-0 py-[10px] relative shrink-0 w-[346px]">
      <Frame19 />
      <Frame26 />
      <Frame25 />
      <Frame35 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Frame59 />
      <Frame20 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-col gap-[35px] items-start relative shrink-0 w-full">
      <Frame45 />
      <Frame60 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[24px] py-0 relative w-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#182230] text-[20px] text-center w-full">Instructions</p>
          <Frame61 />
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[39px] items-start left-0 top-[378px] w-[394px]">
      <Frame38 />
      <Frame42 />
      <Frame34 />
      <Frame39 />
    </div>
  );
}

function Time() {
  return (
    <div className="h-[54px] relative shrink-0 w-[140.5px]" data-name="Time">
      <p className="absolute font-['SF_Pro:Semibold',sans-serif] font-[590] inset-[33.96%_36.71%_25.3%_36.96%] leading-[22px] text-[17px] text-center text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:41
      </p>
    </div>
  );
}

function Levels() {
  return (
    <div className="h-[54px] relative shrink-0 w-[140.5px]" data-name="Levels">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 141 54">
        <g id="Levels">
          <g id="Battery">
            <rect fill="var(--fill-0, white)" height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, white)" width="24" x="81.5" y="23.5" />
            <path d={svgPaths.p1cd400} fill="var(--fill-0, white)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, white)" height="9" id="Capacity" rx="2.5" width="21" x="83" y="25" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p3e080800} fill="var(--fill-0, white)" fillRule="evenodd" id="Wifi" />
          <path clipRule="evenodd" d={svgPaths.p33c47380} fill="var(--fill-0, white)" fillRule="evenodd" id="Cellular Connection" />
        </g>
      </svg>
    </div>
  );
}

function BookOpen() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="book-open-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="book-open-02">
          <path d={svgPaths.p3d584e40} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <BookOpen />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute left-[332px] overflow-clip size-[44px] top-[54px]">
      <Frame9 />
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-left">
          <path d={svgPaths.pbf7d180} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <ArrowLeft />
    </div>
  );
}

function Frame11() {
  return (
    <button className="absolute block cursor-pointer left-[18px] overflow-clip size-[44px] top-[54px]">
      <Frame10 />
    </button>
  );
}

function StatusBar() {
  return (
    <div className="absolute bg-[#7156bd] content-start flex flex-wrap gap-[112px] h-[100px] items-start left-0 overflow-clip top-0 w-[394px]" data-name="Status Bar">
      <Time />
      <Levels />
      <div className="absolute h-[16.298px] left-[362px] top-[51px] w-[18.109px]" data-name="Subtract">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 17">
            <path d={svgPaths.p3cc814fa} fill="var(--fill-0, white)" id="Subtract" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[calc(50%-0.5px)] not-italic text-[14px] text-center text-nowrap text-white top-[65px] translate-x-[-50%] whitespace-pre">California Poke Bowl</p>
      <Frame55 />
      <Frame11 />
    </div>
  );
}

export default function RecipeDetails() {
  return (
    <div className="bg-white relative size-full" data-name="Recipe details">
      <StatusBar />
      <Frame30 />
      <Frame36 />
    </div>
  );
}