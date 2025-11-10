import { Lora } from 'next/font/google';
import MainQueryProduct from '../ui/navbar/MainQueryProduct';
import { fetchSearchedProducts } from '../lib/data';
import { Video } from '../ui/about/Video';
import { Metadata } from 'next';

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'About',
};

export default async function About(props: {
  searchParams: Promise<{
    mainquery?: string;
    page?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const mainquery = searchParams?.mainquery || '';
  const currentPage = Number(searchParams?.page) || 1;

  const products = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={products} query={mainquery} />

      <div
        id='about-page-wrapper'
        className='flex flex-col items-center justify-start'
      >
        {/* First image of the page */}
        <img
          src={'/first-store-photo.jpg'}
          alt='store-photo'
          className='lg:w-1/2 lg:rounded-lg lg:shadow-md lg:mt-2'
        />

        {/* Story intro section */}
        <section
          id='story-introduction-section'
          className='flex flex-col my-6 px-6 lg:px-60 min-[2000px]:px-120'
        >
          <h1
            className={`${lora.className} text-4xl text-yellow-400 text-center min-[2000px]:text-6xl min-[2000px]:my-10`}
          >
            The Story of Zen Stones
          </h1>

          <p
            className='font-light mt-1 lg:font-normal min-[2000px]:text-4xl'
            id='paragraph-1'
          >
            The vision behind Zen Stones began with a simple yet heartfelt idea:
            to craft jewelry infused with meaning and natural beauty. It started
            with bracelets made from genuine stones such as Amethyst, Turquoise,
            and Mother of Pearl, pieces created first for my personal collection
            and later for family and friends who were drawn to their charm and
            energy.
          </p>

          <p
            className='font-light mt-1 lg:font-normal min-[2000px]:text-4xl'
            id='paragraph-2'
          >
            In 2019, the dream evolved into something greater with the opening
            of our first shop in Ridgewood, New Jersey. Our mission was to offer
            crystals and jewelry not just as adornments but as tools for
            healing, balance, and energy restoration. At the time, I was married
            to an acupuncturist deeply knowledgeable in stone medicine and the
            therapeutic use of crystals, a partnership that beautifully
            complemented and strengthened the vision behind Zen Stones.
          </p>

          <p
            className='font-light mt-1 lg:font-normal min-[2000px]:text-4xl'
            id='paragraph-3'
          >
            Nearly six years later, that dream continues to flourish, grounded
            in the same passion for authenticity, energy, and the quiet power of
            nature's gems.
          </p>
        </section>

        {/* Store video and text section */}
        <section
          id='store-video-text-section'
          className='flex flex-col mb-6 px-6 lg:px-60 min-[2000px]:px-120 min-[2000px]:my-10'
        >
          <p className='font-light mb-2 lg:font-normal min-[2000px]:text-4xl'>
            Each crystal at Zen Stones carries its own story, a journey from
            deep within the Earth to your hands. Every piece is carefully chosen
            for its unique energy and purpose, ensuring that what you bring home
            isn’t just beautiful, but meaningful. Our goal is to create an
            experience that inspires mindfulness, grounding, and connection to
            the natural world.
          </p>
          <Video />
          <p className='font-light mt-2 lg:font-normal min-[2000px]:text-4xl'>
            Beyond jewelry, Zen Stones is a place of reflection. Whether someone
            visits to find a gift, explore energy healing, or simply take a
            quiet moment for themselves, the shop serves as a reminder that
            harmony begins within. Through our work, we hope to share not only
            the beauty of nature’s stones but also the peace they help awaken in
            those who seek them.
          </p>
        </section>

        {/* About Dora section */}
        <section
          id='about-dora-section'
          className='flex flex-col mb-6 px-6 bg-yellow-100 py-10 lg:px-60 min-[2000px]:px-120 min-[2000px]:my-10'
        >
          <div
            id='about-the-owner-header'
            className='mb-8 md:mb-10 flex flex-col justify-center items-center'
          >
            <h1
              className={`${lora.className} text-2xl md:text-4xl text-black text-center`}
            >
              About the owner
            </h1>
            <p
              className={`${lora.className} text-neutral-600 text-center md:text-xl`}
            >
              Dora Rosario
            </p>
          </div>

          <div
            id='about-owner-container'
            className='grid place-items-center md:place-items-start grid-cols-1 md:grid-cols-2 md:gap-4'
          >
            <img
              className='rounded-lg shadow-md w-3/4 object-cover'
              src='/dora-rosario-selfie.png'
              alt='owner-photo'
              aria-label='owner-photo'
            />
            <ul id='questions-list' aria-label='questions-list'>
              <li
                className='flex flex-col mt-8 md:mt-0'
                id='why-zen-stones-quetion'
                aria-label='why-zen-stones-quetion'
              >
                <h1
                  className={`${lora.className} text-lg italic text-yellow-500 text-start mb-1 min-[2000px]:text-5xl`}
                >
                  Why Zen Stones?
                </h1>

                <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
                  <strong>“Zen Stones” </strong> embodies the essence of
                  meditation and intuition. A sanctuary of peace, balance, and
                  calm energy. Every visit to our shop invites the customer into
                  an atmosphere of serenity, where each crystal and piece of
                  jewelry reflects harmony, mindfulness, and inner renewal.
                </p>
              </li>

              <li
                className='flex flex-col mt-8'
                id='what-crystal-quetion'
                aria-label='what-crystal-quetion'
              >
                <h1
                  className={`${lora.className} text-lg italic text-yellow-500 text-start mb-1 min-[2000px]:text-5xl`}
                >
                  What's your favorite crystal and why?
                </h1>

                <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
                  <strong>Tourmaline </strong> has always been one of my most
                  cherished stones, admired in all its colors and forms: black,
                  rainbow, watermelon, pink, green, or even Tourmaline in
                  quartz, whether polished or raw. Its vibrant energy and
                  extraordinary properties make it one of the most powerful and
                  protective crystals in the mineral kingdom, a true guardian of
                  balance and spiritual strength.
                </p>
              </li>

              <li
                className='flex flex-col mt-8'
                id='crystal-recommendation-question'
                aria-label='crystal-recommendation-question'
              >
                <h1
                  className={`${lora.className} text-lg italic text-yellow-500 text-start mb-1 min-[2000px]:text-5xl`}
                >
                  What's your must have crystals recommendation?
                </h1>

                <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
                  The true purpose of crystals is to help release energies that
                  do not belong to us, restoring balance and clarity to the
                  spirit. I often recommend Amethyst for absorbing negativity,{' '}
                  <strong>Clear Quartz </strong>
                  for transforming that energy into positivity,{' '}
                  <strong>Rose Quartz </strong> for fostering calm and emotional
                  clarity, and <strong>Black Tourmaline </strong>
                  or <strong>Black Obsidian </strong> for powerful protection.
                  Together, these form one of the most potent and harmonious
                  energy combinations in crystal healing.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Our intention section */}
        <section
          id='our-intention-section'
          className='px-6 flex flex-col items-center justify-center lg:px-60  min-[2000px]:px-120'
        >
          <h1
            className={`${lora.className} text-yellow-400 text-center text-2xl  min-[2000px]:text-6xl`}
          >
            Our Intention
          </h1>

          <img
            src='/buddha-bowl-image.jpg'
            alt='buddha-bowl-image'
            className='my-4 rounded-lg shadow-md md:w-1/2 m-auto'
          />

          <p className='font-light lg:font-normal min-[2000px]:text-4xl text-center'>
            At Zen Stones, our intention is to offer gentle guidance and support
            to each customer in discovering the crystals that best align with
            their personal journey. We aim to help individuals find the stones
            that may assist in easing emotional challenges, clearing energetic
            blockages, and restoring inner balance. Every experience is
            approached with care and mindfulness, and seeing a customer's
            genuine smile as they connect with their chosen crystal is the
            greatest fulfillment of our work.
          </p>
        </section>

        {/* Quote section */}
        <section
          id='quote-section'
          className='bg-yellow-100 p-6 mt-8 w-full lg:px-60 lg:mt-20'
        >
          <h1
            className={`${lora.className} text-black text-lg text-center italic min-[2000px]:text-4xl`}
          >
            “When we align our intentions with the quiet wisdom of the earth,
            every step forward becomes not just progress, but remembrance of who
            we truly are.”
          </h1>
          <p
            className={`${lora.className} text-neutral-500 text-sm min-[2000px]:text-2xl`}
          >
            ~Dora Rosario
          </p>
        </section>
      </div>
    </>
  );
}
