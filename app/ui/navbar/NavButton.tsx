export default function NavButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      id={`${children}-nav-button`}
      aria-label={`${children}-nav-button`}
      className={`
        ${className}
        text-md hover:cursor-pointer hover:bg-neutral-900 hover:text-white transition-all rounded-md py-1 px-2  
      `}
    >
      {children}
    </button>
  );
}
