export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number = 1000) {
    let timer: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  }
  