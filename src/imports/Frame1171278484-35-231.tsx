import svgPaths from "./svg-g70qye9wb2";
import imgFrame1171278484 from "figma:asset/2451e194c8ceca490bf1b6cd5b6e1acf5dff682d.png";

function Check() {
  return (
    <div className="relative shrink-0 size-[19.636px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="check">
          <path d={svgPaths.p28168880} id="Icon" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#d8cff2] left-[140px] rounded-[34.364px] top-[7px]" data-name="Component 15">
      <div className="box-border content-stretch flex gap-[8.182px] items-center overflow-clip p-[8.182px] relative rounded-[inherit]">
        <Check />
      </div>
      <div aria-hidden="true" className="absolute border-[3px] border-solid border-white inset-[-3px] pointer-events-none rounded-[37.364px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]" />
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

function Frame1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8.182px] items-center left-[140px] p-[8.182px] rounded-[34.364px] top-[290px]">
      <Plus />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="overflow-clip relative rounded-[9px] size-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9px]">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9px] size-full" src={imgFrame1171278484} />
        <div className="absolute inset-0 rounded-[9px]" />
      </div>
      <Component />
      <Frame1 />
    </div>
  );
}