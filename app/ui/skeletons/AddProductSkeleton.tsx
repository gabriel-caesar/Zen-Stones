export default function AddProductSkeleton() {
  return (
    <div className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative lg:ml-10 h-[1483px]'>
      <div 
        className='bg-black/70 rounded-lg h-[24px] mb-8 relative pulse w-2/5'
      ></div>
      <InputSkeleton height='48px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='40px' />
      <InputSkeleton height='112px' />
      <InputSkeleton height='112px' />
      <Button />
    </div>
  )
}

function InputSkeleton({ height } : { height?: string }) {
  return (
    <section className='w-full mt-6'>
      <div className='bg-black/70 rounded-lg h-[24px] mb-1 relative pulse w-2/5'/>
      <div className={`
        pulse rounded-lg bg-neutral-300 p-2 w-full 
        focus-within:outline-none search-focus transition-all h-[${height}]`}
      />
    </section>
  )
}

function Button() {
  return (
    <div className='pulse bg-black rounded-lg w-full h-[40px] mt-12'>

    </div>
  )
}