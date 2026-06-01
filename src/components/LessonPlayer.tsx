'use client';

import { useState } from 'react';
import Slideshow, { Slide } from '@/components/Slideshow';

type Lesson = {
  id: string;
  title: string;
  slides: Slide[];
};

export default function LessonPlayer({ lessons }: { lessons: Lesson[] }) {
  const [activeId, setActiveId] = useState(lessons[0]?.id);

  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];

  return (
    <div className='w-full max-w-5xl mx-auto flex flex-col gap-6'>
      {/* Lesson tabs */}
      <div className='flex flex-wrap gap-2'>
        {lessons.map((lesson, i) => (
          <button
            key={lesson.id}
            onClick={() => setActiveId(lesson.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              lesson.id === activeId
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground'
            }`}
          >
            {i === 0 ? '🎬 ' : `📚 ${String(i).padStart(2, '0')} — `}
            {lesson.title}
          </button>
        ))}
      </div>

      {/* Active lesson slides */}
      <Slideshow key={active.id} slides={active.slides} />
    </div>
  );
}
