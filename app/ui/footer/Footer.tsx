import { Gem, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-background border-t border-neutral-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <Gem className='h-8 w-8 text-primary mr-2' />
              <span className='text-xl font-semibold'>Zen Stones</span>
            </div>
            <p className='text-neutral-500 text-sm'>
              Discover the world's finest gemstones, carefully curated for
              collectors and jewelry enthusiasts worldwide.
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

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Gemstone Guide
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Certification
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Custom Jewelry
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Investment Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Customer Service</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-neutral-500 hover:text-foreground transition-colors'
                >
                  Care Instructions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Want to ask us a question?</h3>
            <p className='text-sm text-neutral-500 '>
              Sends us an email and we will be more than happy to answer you.
            </p>
            <div className='space-y-2'>
              <input 
                type='email' 
                placeholder='Enter your email' 
                id='email-input-footer'
                aria-label='email-input-footer'
                className='rounded-md bg-neutral-100 w-full px-3 py-2 mb-2 text-[14px]'
              />
              <button className='w-full rounded-lg bg-black text-white py-1 hover:cursor-pointer hover:bg-black/60 transition-all'>
                Send
              </button>
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
          <div className='flex space-x-4 text-sm text-neutral-500'>
            <a href='#' className='hover:text-foreground transition-colors'>
              Privacy Policy
            </a>
            <a href='#' className='hover:text-foreground transition-colors'>
              Terms of Service
            </a>
            <a href='#' className='hover:text-foreground transition-colors'>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
