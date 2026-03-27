import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance = null;

const useSmoothScroll = () => {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);
};

export default useSmoothScroll;