import { useEffect } from "react";

const useOutSideClick = (ref, callback) => {
  useEffect(() => {
    if (typeof callback !== 'function') return;
    const handleOutSideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleOutSideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutSideClick);
    }
  }, [ref, callback])
}

export default useOutSideClick;