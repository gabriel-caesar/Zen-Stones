'use server';

import { Lora } from 'next/font/google';
import MainQueryProduct from '../ui/navbar/MainQueryProduct';
import { fetchSearchedProducts } from '../lib/data';
import { Video } from '../ui/about/Video';

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

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

          <p className='font-light mt-1 lg:font-normal min-[2000px]:text-4xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            voluptatem eius reiciendis magnam necessitatibus! Nisi tempora totam
            eum ea perspiciatis blanditiis repellat asperiores, molestias vel
            voluptatem, officia debitis a cupiditate officiis fugit magnam
            dolore. Quod error voluptas nihil. Nostrum aspernatur quia sint quod
            recusandae nisi dolores numquam debitis? Id, quia consequatur ex
            minima voluptate placeat soluta, numquam debitis recusandae non
            accusantium, velit eligendi maxime. Tempora perspiciatis sint
            accusantium quisquam reiciendis enim veniam, libero magni quae.
            Repellendus laudantium ipsum nostrum voluptate odit optio quisquam
            quae impedit accusantium corporis facilis laboriosam pariatur illo
            voluptas ducimus dolores incidunt illum hic fugiat, nemo debitis
            asperiores. Delectus quas dolorem necessitatibus libero nam porro
            veniam minus ullam dolore, maiores aperiam doloribus explicabo
            doloremque. Laborum, possimus quod!
          </p>
        </section>

        {/* Store video and text section */}
        <section
          id='store-video-text-section'
          className='flex flex-col mb-6 px-6 lg:px-60 min-[2000px]:px-120 min-[2000px]:my-10'
        >
          <p className='font-light mb-2 lg:font-normal min-[2000px]:text-4xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            maxime. Tenetur perspiciatis asperiores accusantium libero ea at
            nihil et illum? Necessitatibus, debitis! Maiores, quas. Itaque animi
            maiores quam quisquam cum!
          </p>
          <Video />
          <p className='font-light mt-2 lg:font-normal min-[2000px]:text-4xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            magnam quae, eum, consectetur libero architecto quas iure quaerat
            laborum commodi nam! Alias voluptatum voluptate, rerum cupiditate
            similique tempora obcaecati laudantium atque iusto suscipit earum,
            sit recusandae ipsum praesentium aliquid nobis ducimus libero? A
            fugiat in ducimus, ullam perferendis illo quos?
          </p>
        </section>

        {/* About Dora section */}
        <section
          id='about-dora-section'
          className='flex flex-col mb-6 px-6 bg-yellow-100 py-10 lg:px-60 min-[2000px]:px-120 min-[2000px]:my-10'
        >
          <h1
            className={`${lora.className} text-2xl md:text-4xl text-black mb-3 md:mb-10 text-center`}
          >
            About Dora Rosario
          </h1>

          <div
            id='about-owner-container'
            className='grid place-items-center lg:place-items-start grid-cols-1 md:grid-cols-2 md:gap-4'
          >
            <img
              className='rounded-lg shadow-md object-cover'
              src='/fake-owner-photo.jpg'
              alt='owner-photo'
              aria-label='owner-photo'
            />
            <div
              className='flex flex-col mt-8 md:mt-0'
              id='why-zen-stones-quetion'
            >
              <h1
                className={`${lora.className} text-lg italic text-yellow-500 text-start mb-1 min-[2000px]:text-5xl`}
              >
                Why Zen Stones?
              </h1>

              <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt sed ab aliquid est suscipit perspiciatis ex assumenda,
                aperiam, minus velit esse laudantium ratione non quos minima?
                Quo accusantium explicabo harum. Aut odio nemo amet harum
                expedita sint, quos vel deserunt ullam deleniti assumenda natus
                maiores dolore doloremque quas illo voluptatem ut, incidunt
                aspernatur mollitia exercitationem? Cumque quis sequi suscipit
                labore, rem atque asperiores eius corrupti mollitia voluptate
                aperiam voluptatem molestias.
              </p>
            </div>

            <div className='flex flex-col mt-8' id='what-crystal-quetion'>
              <h1
                className={`${lora.className} text-lg italic text-yellow-500 text-start mb-1 min-[2000px]:text-5xl`}
              >
                What's your favorite crystal and why?
              </h1>

              <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt sed ab aliquid est suscipit perspiciatis ex assumenda,
                aperiam, minus velit esse laudantium ratione non quos minima?
                Quo accusantium explicabo harum. Aut odio nemo amet harum
                expedita sint, quos vel deserunt ullam deleniti assumenda natus
                maiores dolore doloremque quas illo voluptatem ut, incidunt
                aspernatur mollitia exercitationem? Cumque quis sequi suscipit
                labore, rem atque asperiores eius corrupti mollitia voluptate
                aperiam voluptatem molestias.
              </p>
            </div>

            <div
              className='flex flex-col mt-8'
              id='crystal-recommendation-question'
            >
              <h1
                className={`${lora.className} text-lg italic text-yellow-500 text-start mb-1 min-[2000px]:text-5xl`}
              >
                What's your must have crystals recommendation?
              </h1>

              <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt sed ab aliquid est suscipit perspiciatis ex assumenda,
                aperiam, minus velit esse laudantium ratione non quos minima?
                Quo accusantium explicabo harum. Aut odio nemo amet harum
                expedita sint, quos vel deserunt ullam deleniti assumenda natus
                maiores dolore doloremque quas illo voluptatem ut, incidunt
                aspernatur mollitia exercitationem? Cumque quis sequi suscipit
                labore, rem atque asperiores eius corrupti mollitia voluptate
                aperiam voluptatem molestias.
              </p>
            </div>
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

          <p className='font-light lg:font-normal min-[2000px]:text-4xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi nisi
            sunt asperiores ipsum fugit voluptatem molestias similique voluptate
            eligendi iste ipsam consectetur dolor temporibus recusandae fugiat
            accusamus, laudantium placeat molestiae maiores praesentium earum
            quia pariatur harum. Dolores qui, itaque in soluta vitae sunt
            repellendus dolorem autem voluptatum consectetur illo fuga quis
            iusto exercitationem numquam quo incidunt. Rerum, maiores quas natus
            magni non hic commodi et laboriosam harum modi consequuntur quaerat?
            Odio nam mollitia harum illum, deleniti ullam dolorem obcaecati eius
            voluptate illo, deserunt quia quis excepturi ex quos non adipisci
            magni dignissimos delectus facere, vel nihil aspernatur aut placeat.
            Nulla.
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
