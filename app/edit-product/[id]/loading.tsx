import AddProductSkeleton from '@/app/ui/skeletons/AddProductSkeleton';

export default function Loading() {
  return (
    <div className='w-full flex justify-center items-center'>
      <AddProductSkeleton />
    </div>
  )
}