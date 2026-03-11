import { useEffect, useRef, useCallback } from 'react';

export function useSlideNavigation(onChartSlide: (slideNumber: number) => void) {
  const currentRef = useRef(1);

  const showSlide = useCallback((n: number) => {
    const slides = document.querySelectorAll('.sl');
    if (!slides.length) return;
    const total = slides.length;

    if (n < 1) n = 1;
    if (n > total) n = total;
    currentRef.current = n;

    slides.forEach((s, i) => s.classList.toggle('active', i === n - 1));

    const currentEl = document.getElementById('current');
    const progressBar = document.getElementById('progressBar');
    if (currentEl) currentEl.textContent = String(n);
    if (progressBar) progressBar.style.width = (n / total * 100) + '%';

    onChartSlide(n);
  }, [onChartSlide]);

  const nextSlide = useCallback(() => {
    showSlide(currentRef.current + 1);
  }, [showSlide]);

  const prevSlide = useCallback(() => {
    showSlide(currentRef.current - 1);
  }, [showSlide]);

  useEffect(() => {
    const init = () => {
      const slides = document.querySelectorAll('.sl');
      if (!slides.length) return;

      const totalEl = document.getElementById('total');
      if (totalEl) totalEl.textContent = String(slides.length);

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      };

      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.nav-controls') && !target.closest('.cta-button')) {
          nextSlide();
        }
      };

      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('click', handleClick);

      showSlide(1);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('click', handleClick);
      };
    };

    if (document.readyState === 'complete') {
      const cleanup = init();
      return cleanup;
    } else {
      let cleanup: (() => void) | undefined;
      const onLoad = () => { cleanup = init(); };
      window.addEventListener('load', onLoad);
      return () => {
        window.removeEventListener('load', onLoad);
        cleanup?.();
      };
    }
  }, [nextSlide, prevSlide, showSlide]);

  return { nextSlide, prevSlide };
}
