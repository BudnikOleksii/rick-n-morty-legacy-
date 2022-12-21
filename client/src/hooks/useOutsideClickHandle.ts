import { RefObject, useEffect } from 'react';

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`);
  }
}

export const useOutsideClickHandle = (
  ref: RefObject<HTMLDivElement> | null,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      assertIsNode(target);

      if (ref?.current && !ref.current.contains(target)) {
        onOutsideClick();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
