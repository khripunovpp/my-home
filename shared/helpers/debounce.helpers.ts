export const wrapDebounce = <T extends (...args: any[]) => void>(func: T, wait: number): T => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
    {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  } as T;
}