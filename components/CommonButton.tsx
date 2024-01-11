import { DOMAttributes, HTMLAttributes } from "react";

export const CommonButton = (
  props: DOMAttributes<HTMLButtonElement> & HTMLAttributes<HTMLButtonElement>
) => {
  return (
    <div className="justify-center border-b border-gray-300 bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit static w-auto  rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
      <button {...props}></button>
    </div>
  );
};
