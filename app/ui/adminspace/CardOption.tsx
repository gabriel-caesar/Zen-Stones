import Link from 'next/link';

export default function CardOption({
  href,
  Icon,
  text,
}: {
  href: string;
  Icon: React.ElementType
  text: string;
}) {
  return (
    <Link
      href={href}
      className='w-2/3 md:w-1/2 lg:w-3/4 lg:py-15 py-10 px-4 flex border-1 border-neutral-800 rounded-lg bg-neutral-200 shadow-lg hover:cursor hover:text-yellow-600 hover:bg-yellow-100 hover:shadow-yellow-100 active:bg-yellow-300 transition-all'
    >
      <Icon className='mr-2' />
      {text}
    </Link>
  );
}
