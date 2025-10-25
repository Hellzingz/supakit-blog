import { useEffect, useRef } from 'react';

export const useOutsideClick = (handler, enabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
};

export default useOutsideClick;
