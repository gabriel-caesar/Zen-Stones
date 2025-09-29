export default function NavButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      id={`${children}-nav-button`}
      aria-label={`${children}-nav-button`}
      className={`
        ${className}
        text-md hover:cursor-pointer transition-all border-transparent border-4 py-1 px-2  
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
