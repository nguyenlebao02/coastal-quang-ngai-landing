'use client';

import { useState, useEffect, useCallback, useRef, TouchEvent } from 'react';

interface CarouselProps {
  items: { image: string; label?: string }[];
  /** Auto-play interval in ms, 0 = disabled */
  autoPlay?: number;
  /** Show prev/next arrow buttons */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Infinite loop */
  loop?: boolean;
  /** CSS height class for slides */
  slideHeight?: string;
  /** Callback when active slide changes */
  onSlideChange?: (index: number) => void;
  /** Show caption overlay */
  showCaption?: boolean;
  /** Controlled active index from parent */
  activeIndex?: number;
}

export default function Carousel({
  items,
  autoPlay = 0,
  showArrows = true,
  showDots = false,
  loop = true,
  slideHeight = 'h-[400px] md:h-[550px]',
  onSlideChange,
  showCaption = true,
  activeIndex: controlledIndex,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const current = controlledIndex ?? internalIndex;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStart = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      let next = index;
      if (loop) {
        next = ((index % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(index, total - 1));
      }
      if (controlledIndex === undefined) setInternalIndex(next);
      onSlideChange?.(next);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, loop, total, onSlideChange]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Auto-play */
  useEffect(() => {
    if (autoPlay <= 0) return;
    autoPlayRef.current = setInterval(next, autoPlay);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, next]);

  /* Pause auto-play on hover */
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    if (autoPlay <= 0) return;
    autoPlayRef.current = setInterval(next, autoPlay);
  };

  /* Touch/swipe support */
  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    pauseAutoPlay();
  };
  const onTouchEnd = (e: TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    resumeAutoPlay();
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg group"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, i) => (
          <div key={i} className={`w-full flex-shrink-0 ${slideHeight}`}>
            <img
              src={item.image}
              alt={item.label || `Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Caption overlay */}
      {showCaption && items[current]?.label && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-6">
          <h3 className="text-white font-heading font-bold text-xl md:text-2xl uppercase">
            {items[current].label}
          </h3>
        </div>
      )}

      {/* Arrow buttons */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-gold w-6' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {total > 1 && (
        <div className="absolute top-4 right-4 bg-navy/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {current + 1} / {total}
        </div>
      )}
    </div>
  );
}
