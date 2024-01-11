export const Skeleton = ({ customClassName }: { customClassName?: string }) => {
  return (
    <div
      className={`animate-pulse h-2.5 bg-gray-100 rounded-full dark:bg-gray-500 mb-4 ${customClassName}`}
    />
  );
};
