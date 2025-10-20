import MainQueryProduct from '../ui/navbar/MainQueryProduct';
import CardOption from '../ui/adminspace/CardOption';
import { Box, FileBadge, FileBox, Loader2 } from 'lucide-react';
import { fetchSearchedProducts } from '../lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Space',
};

export default async function AdminSpace(props: {
  searchParams: Promise<{
    mainquery?: string,
    page?: number,
  }>
}) {

  const searchParams = await props.searchParams;
  const mainquery = searchParams?.mainquery || '';
  const currentPage = Number(searchParams?.page) || 1;

  const products = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={products} query={mainquery} />
      <div
        className='flex flex-col justify-center items-center'
        id='adminspace-wrapper'
      >
        <h1
          id='welcome-header'
          aria-label='welcome-header'
          className='font-bold text-2xl mt-6 mb-10'
        >
          Welcome to Admin Space
        </h1>
        <div
          id='card-options-wrapper'
          className='grid lg:grid-cols-2 gap-8 place-items-center w-full h-full mb-10'
        >
          <CardOption href='/admin-space/manage-types' Icon={Box} text='Manage Types'/>
          <CardOption href='/admin-space/manage-products' Icon={FileBox} text='Manage Products'/>
          <CardOption href='/admin-space/manage-main-page' Icon={FileBadge} text='Manage Main Page'/>
          <CardOption href='#' Icon={Loader2} text='To Be Launched...'/>
        </div>
      </div>
    </>
  )
}