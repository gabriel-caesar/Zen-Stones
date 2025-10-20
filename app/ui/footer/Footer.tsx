import { Gem, Mail, Phone, MapPin, MailIcon, Calendar } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { hours, StoreHoursType } from './hours';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-background border-t border-neutral-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <Gem className='h-8 w-8 text-primary mr-2' />
              <span className='text-xl font-semibold'>Zen Stones</span>
            </div>
            <p className='text-neutral-500 text-sm'>
              Discover our exquisite collection of gemstone 
              jewelry and metaphysical treasures. From handcrafted 
              sterling silver pieces to spiritually inspired accessories 
              that bring harmony, beauty, and purpose to your space.
            </p>
            <div className='flex space-x-2 justify-start items-center p-2'>
              <a
                className='h-8 w-8 hover:cursor-pointer hover:text-black/60 transition-all'
                href={'https://www.instagram.com/zenstonesjewelry/?hl=en'}
                target='_blank'
                id='footer-instagram-button'
                aria-label='footer-instagram-button'
              >
                <FaInstagram className='h-6 w-6' />
              </a>
              <a 
                className='h-8 w-8 hover:cursor-pointer hover:text-black/60 transition-all'
                href={'https://www.facebook.com/p/zenstonesjewelry-100063528523781/'}
                target='_blank'
                id='footer-facebook-button'
                aria-label='footer-facebook-button'
              >
                <FaFacebook className='h-6 w-6' />
              </a>
            </div>
          </div>

          {/* Store hours */}
          <div className='space-y-4 lg:px-20'>
            <h3 className='font-semibold flex'><Calendar className='mr-2' /> Store hours</h3>
            <ul className='flex flex-col'>
              {hours.map((d: StoreHoursType) => {
                return (
                <li key={d.day} className='text-sm flex items-center justify-start text-neutral-500'>
                  <p className='w-48'>{d.day} • {d.hours}</p>
                </li>
                )
              })}
            </ul>
          </div>


          {/* Newsletter */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Want to ask us a question?</h3>
            <p className='text-sm text-neutral-500 '>
              Sends us an email and we will be more than happy to answer you.
            </p>
            <div className='space-y-2'>
              <Link
                href={'/inquiry'} 
                className='w-1/2 lg:w-full flex justify-center items-center rounded-lg bg-black text-white py-1 hover:cursor-pointer hover:bg-black/60 transition-all'
                id='footer-inquiry-button'
                aria-label='footer-inquiry-button'
              >
                <MailIcon strokeWidth={1.5} className='mr-2' />
                Inquiry
              </Link>
            </div>
          </div>
        </div>

        <div
          className='my-8'
          id='separator-container'
          aria-label='separator-container'
        />

        {/* Contact Info */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 border-t-1 border-b-1 border-neutral-300 py-8'>
          <div className='flex items-center space-x-2 text-sm text-neutral-500'>
            <Phone className='h-4 w-4' />
            <span>+1 (201) 345-9445</span>
          </div>
          <div className='flex items-center space-x-2 text-sm text-neutral-500'>
            <Mail className='h-4 w-4' />
            <span>zenstones@yahoo.com</span>
          </div>
          <div className='flex items-center space-x-2 text-sm text-neutral-500'>
            <MapPin className='h-4 w-4' />
            <span>10 S Maple Ave, Ridgewood, NJ 07450</span>
          </div>
        </div>

        <div className='mb-8' />

        {/* Bottom */}
        <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0'>
          <p className='text-sm text-neutral-500'>
            © 2024 Zen Stones LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
