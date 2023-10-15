import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function quickSort(arr: string[]): string[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (const element of arr) {
    const cmp = element.localeCompare(pivot, undefined, { numeric: true });
    if (cmp < 0) left.push(element);
    else if (cmp > 0) right.push(element);
    else equal.push(element);
  }

  return [...quickSort(left), ...equal, ...quickSort(right)];
}
