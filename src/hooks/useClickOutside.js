import { useEffect } from "react";

const useClickOutside = (ref, onClose) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (onClose) {
          onClose();
        }
      }
    };

    // Defer attaching the listener by one tick so the very click that opens
    // the element doesn't immediately count as an "outside" click and close it.
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useClickOutside;
