/**
 * Optimized smooth scroll utility with better performance
 * Uses native scrollIntoView with optimized settings
 */

export function smoothScrollTo(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Calculate the target position with offset
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  // Use requestAnimationFrame for smooth animation
  window.requestAnimationFrame(() => {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
}

/**
 * Debounced scroll handler for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
