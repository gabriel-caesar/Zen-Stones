// store video
export function Video() {
  return (
    <iframe
      className='w-full h-[400px] rounded-lg shadow-md min-[2000px]:my-6'
      src='https://www.youtube.com/embed/TPL5hykHJtA?autoplay=1&mute=1&loop=1&playlist=TPL5hykHJtA'
      title='YouTube video player'
      allow='autoplay; fullscreen'
      id='featured-video'
      aria-label='featured-video'
      allowFullScreen
    ></iframe>
  );
}