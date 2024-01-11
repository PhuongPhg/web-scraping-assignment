export const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="cursor-pointer h-full group rounded-lg border border-1 px-5 py-4 transition-colors hover:border-blue-50/75 hover:bg-blue-50/75 hover:dark:border-blue-500/75 hover:dark:bg-blue-100/75">
      {children}
    </div>
  );
};
