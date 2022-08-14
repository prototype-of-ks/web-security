import { useRef } from 'react';

export function usePersistFn<T extends (...args: any[]) => unknown>(fn: T) {
  const fnRef = useRef(fn);
  const ref = useRef<any>();
  if (!ref.current) {
    ref.current = (...args: unknown[]) => {
      return fnRef.current.call(null, ...args);
    };
  }
  return ref.current;
}
