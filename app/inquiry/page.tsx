import { Metadata } from 'next';
import FeedbackDialog from '../ui/adminspace/FeedbackDialog';
import InquiryForm from '../ui/inquiry/InquiryForm';
import Log from '../ui/inquiry/Log';

export const metadata: Metadata = {
  title: 'Inquiry',
};

export default async function Inquiry(props: {
  searchParams: Promise<{
    inquiry?: string
  }>;
}) {

  const searchParams = await props.searchParams;
  const inquiry = searchParams?.inquiry;

  return (
    <div
      className='flex flex-col justify-center items-center'
      id='inquiry-page-wrapper'
    >
      <FeedbackDialog text={'Sent inquiry successfully'} params={inquiry} />
      <InquiryForm />
      <Log />
    </div>
  )
}