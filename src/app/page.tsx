import LessonPlayer from '@/components/LessonPlayer';
import lessons from '@/data/lessons.json';
import { Slide } from '@/components/Slideshow';

type Lesson = { id: string; title: string; slides: Slide[] };

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-start gap-8 p-8 bg-background'>
      <h1 className='text-2xl font-bold tracking-tight'>
        🎓 AI Engineering — Теория по уроци
      </h1>
      <LessonPlayer lessons={lessons as Lesson[]} />
    </main>
  );
}
