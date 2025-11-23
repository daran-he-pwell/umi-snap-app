import svgPaths from "./svg-ayu7jfzecg";
import imgFrame1171278484 from "figma:asset/1b3136652c25eb13562b5cdfcc62442e4b7484d5.png";

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

function Component() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8.182px] items-center left-[140px] p-[8.182px] rounded-[34.364px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] top-[7px]" data-name="Component 15">
      <Plus />
    </div>
  );
}

function Plus1() {
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
      <Plus1 />
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