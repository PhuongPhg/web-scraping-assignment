export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="cursor-pointer h-full group rounded-lg border border-1 px-5 py-4 transition-colors hover:border-blue-50/75 hover:bg-blue-50/75 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      {children}
    </div>
  );
};
