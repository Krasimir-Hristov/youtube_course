"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

// ── Types ──────────────────────────────────────────────────────────────────

type TitleSlide = {
  layout: "title";
  title: string;
  subtitle?: string;
};

type QuoteSlide = {
  layout: "quote";
  quote: string;
  author?: string;
};

type BulletsSlide = {
  layout: "bullets";
  title: string;
  bullets: string[];
};

type RoadmapSlide = {
  layout: "roadmap";
  title: string;
  steps: { label: string; description: string }[];
};

type TableSlide = {
  layout: "table";
  title: string;
  headers: string[];
  rows: string[][];
};

export type Slide = TitleSlide | QuoteSlide | BulletsSlide | RoadmapSlide | TableSlide;

// ── Slide renderers ────────────────────────────────────────────────────────

function TitleLayout({ slide }: { slide: TitleSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-12 gap-6">
      <h1 className="text-5xl font-bold leading-tight tracking-tight">{slide.title}</h1>
      {slide.subtitle && (
        <p className="text-2xl text-muted-foreground">{slide.subtitle}</p>
      )}
    </div>
  );
}

function QuoteLayout({ slide }: { slide: QuoteSlide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-16 gap-8 text-center">
      <span className="text-8xl text-primary leading-none select-none">"</span>
      <blockquote className="text-3xl font-medium italic leading-relaxed">
        {slide.quote}
      </blockquote>
      {slide.author && (
        <cite className="text-lg text-muted-foreground not-italic">— {slide.author}</cite>
      )}
    </div>
  );
}

function BulletsLayout({ slide }: { slide: BulletsSlide }) {
  return (
    <div className="flex flex-col justify-center h-full px-16 gap-8">
      <h2 className="text-3xl font-bold">{slide.title}</h2>
      <ul className="flex flex-col gap-4">
        {slide.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-xl">
            <span className="mt-1 size-3 rounded-full bg-primary shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoadmapLayout({ slide }: { slide: RoadmapSlide }) {
  return (
    <div className="flex flex-col justify-center h-full px-16 gap-6">
      <h2 className="text-3xl font-bold">{slide.title}</h2>
      <ol className="flex flex-col gap-3">
        {slide.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div>
              <span className="font-semibold text-lg">{step.label}</span>
              {step.description && (
                <span className="text-muted-foreground ml-2 text-base">— {step.description}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TableLayout({ slide }: { slide: TableSlide }) {
  return (
    <div className="flex flex-col justify-center h-full px-16 gap-6">
      <h2 className="text-3xl font-bold">{slide.title}</h2>
      <div className="overflow-auto">
        <table className="w-full text-left border-collapse text-base">
          <thead>
            <tr>
              {slide.headers.map((h, i) => (
                <th
                  key={i}
                  className="border-b-2 border-primary pb-2 pr-6 font-semibold text-primary"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-border">
                {row.map((cell, ci) => (
                  <td key={ci} className="py-2 pr-6">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderSlide(slide: Slide) {
  switch (slide.layout) {
    case "title":   return <TitleLayout slide={slide} />;
    case "quote":   return <QuoteLayout slide={slide} />;
    case "bullets": return <BulletsLayout slide={slide} />;
    case "roadmap": return <RoadmapLayout slide={slide} />;
    case "table":   return <TableLayout slide={slide} />;
  }
}

// ── Main component ─────────────────────────────────────────────────────────

export default function Slideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    if (next < 0 || next >= slides.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto select-none">
      {/* Slide area */}
      <div className="relative w-full aspect-video bg-card text-card-foreground rounded-2xl shadow-2xl overflow-hidden border border-border">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {renderSlide(slides[index])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => go(index - 1)} disabled={index === 0}>
          ← Назад
        </Button>
        <span className="text-sm text-muted-foreground tabular-nums">
          {index + 1} / {slides.length}
        </span>
        <Button onClick={() => go(index + 1)} disabled={index === slides.length - 1}>
          Напред →
        </Button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`size-2 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
