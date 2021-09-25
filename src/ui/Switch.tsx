import MoonIcon from "@heroicons/react/solid/MoonIcon";
import SunIcon from "@heroicons/react/solid/SunIcon";
import { useState, useEffect } from "react";

export const SwitchComponent = ({ ...props }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const ht = document.querySelector("html")!;
    if (active) {
      ht.classList.add("dark");
      return;
    }
    ht.classList.remove("dark");
  }, [active]);

  return (
    <button
      role="checkbox"
      aria-checked={active}
      tabIndex={0}
      onClick={() => setActive((prev) => !prev)}
      {...props}
      className="fixed border border-transparent z-10 flex justify-center 
      space-x-2  w-24 h-24 bottom-12 sm:bottom-16 right-12 sm:right-16 
      transform scale-75 sm:scale-100 rounded-full  items-center bg-gray-900"
    >
      <SunIcon
        className={`h-6 w-6  ${active ? "text-white " : "text-red-300"}`}
      />
      <span className="border-2 border-green-400 rounded-full overflow-hidden h-6 w-14 block transition-colors ease-in-out duration-200">
        <span className="sr-only">Use Dark Theme</span>
        <span
          className={`${
            active ? "translate-x-4" : "-translate-x-4"
          } h-5 w-5 bg-green-400 rounded-full inline-block transform transition ease-in-out duration-200 pointer-events-none shadow-lg border border-transparent`}
        ></span>
      </span>
      <MoonIcon
        className={`h-6 w-6 ${active ? "text-white" : " text-blue-400  "}`}
      />
    </button>
  );
};
