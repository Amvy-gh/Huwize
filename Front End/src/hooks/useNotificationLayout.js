import { useState, useEffect } from 'react';

const useNotificationLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [layout, setLayout] = useState({
    position: '',
    width: '',
    transform: ''
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setLayout({
          position: 'fixed inset-0 flex items-center justify-center',
          width: 'w-[90%] max-w-[320px] mx-auto',
          transform: 'translate-y-0',
          maxHeight: 'max-h-[80vh]'
        });
      } else {
        setLayout({
          position: 'fixed top-8 right-48',
          width: 'w-80',
          transform: 'translate-y-0',
          maxHeight: 'max-h-[50vh]'
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, layout };
};

export default useNotificationLayout;
