import { Box, FileBox } from 'lucide-react';
import CardOption from '../ui/adminspace/CardOption';

export default function AdminSpace() {
  return (
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
        className='grid lg:grid-cols-2 lg:gap-0 gap-8 place-items-center w-full h-full mb-10'
      >
        <CardOption href='/admin-space/manage-subcategories' Icon={Box} text='Manage Sub-categories'/>
        <CardOption href='/admin-space/manage-products' Icon={FileBox} text='Manage Products'/>
      </div>
    </div>
  )
}