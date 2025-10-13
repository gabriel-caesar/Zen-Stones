import AddProductSkeleton from '@/app/ui/skeletons/AddProductSkeleton';
import SearchProductSkeleton from '@/app/ui/skeletons/SearchProductSkeleton';

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center lg:flex-row lg:items-start lg:mb-10 relative'>
      <SearchProductSkeleton />
      <AddProductSkeleton />
    </div>
  )
}