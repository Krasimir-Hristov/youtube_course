import Slideshow, { Slide } from '@/components/Slideshow';
import slides from '@/data/pilot-slides.json';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-background'>
      <h1 className='text-2xl font-bold tracking-tight'></h1>
      <Slideshow slides={slides as Slide[]} />
    </main>
  );
}
