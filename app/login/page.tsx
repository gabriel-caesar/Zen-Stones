import MainQueryProduct from '../ui/navbar/MainQueryProduct';
import LoginForm from '../ui/LoginForm';
import { fetchSearchedProducts } from '../lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Login(props: {
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
    <div
      className='flex justify-center items-center'
      id='login-page-wrapper'
    >
      <MainQueryProduct products={products} query={mainquery} />
      <LoginForm />
    </div>
  )
}