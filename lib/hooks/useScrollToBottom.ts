import { useEffect, useRef, RefObject } from 'react';

export function useScrollToBottom(
  ref: RefObject<HTMLElement>, 
  dependencies: any[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (enabled && ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [ref, enabled, ...dependencies]);
}
