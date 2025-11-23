import { useState, useEffect } from 'react';

const useProgressiveLoading = () => {
  const [loadedComponents, setLoadedComponents] = useState({
    sidebar: false,
    rightSidebar: false,
    mainContent: false,
  });

  useEffect(() => {
    // Load components progressively with staggered timing
    const timer1 = setTimeout(() => {
      setLoadedComponents(prev => ({ ...prev, sidebar: true }));
    }, 100);

    const timer2 = setTimeout(() => {
      setLoadedComponents(prev => ({ ...prev, rightSidebar: true }));
    }, 200);

    const timer3 = setTimeout(() => {
      setLoadedComponents(prev => ({ ...prev, mainContent: true }));
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return loadedComponents;
};

export default useProgressiveLoading;

