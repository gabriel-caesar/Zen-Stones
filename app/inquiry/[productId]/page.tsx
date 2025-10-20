import Log from '@/app/ui/inquiry/Log';
import InquiryForm from '@/app/ui/inquiry/InquiryForm';
import { fetchSingleItem } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inquiry',
};

export default async function InquiryWithParams(props: {
  params: Promise<{
    productId?: string
  }>
}) {

  // querying the url for a product id params
  const params = await props.params;
  const productId = params?.productId || '';

  // fetching that product
  const product = await fetchSingleItem(productId);

  return (
    <div
      className='flex flex-col justify-center items-center'
      id='inquiry-page-wrapper'
    >
      <InquiryForm product={product} />
      <Log />
    </div>
  )
}