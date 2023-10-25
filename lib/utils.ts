import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {ChangeEvent} from "react";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function preventDefault(fn: (...args: any) => any) {
  return (e: ChangeEvent<any>) => {
    e?.preventDefault();
    fn(e);
  };
}

export function removeQueryParameters(url: string) {
  return url.split('?')[0];
}

export function getAbsoluteDashboardPath(url: string) {
  const path = removeQueryParameters(url);
  const match = path.match(/^\/dashboard(\/:[a-zA-Z0-9_]+|\/[a-zA-Z0-9_]+)?/);
  return match ? match[0] : null;
}

export function truncate(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

export type Nullable<T> = T | null;

export interface EntityCardColors {
  BACKGROUND: string;
  TEXT: string;
  SECONDARY_BACKGROUND: string;
  SECONDARY_BACKGROUND_HOVER: string;
  PRIMARY_BACKGROUND: string;
  PRIMARY_BACKGROUND_HOVER: string;
}

export const ApplicationEntityColors: EntityCardColors = {
  BACKGROUND: "bg-[#A9B7DA]/50",
  TEXT: "text-[#101B35]",
  SECONDARY_BACKGROUND: "bg-[#A9B7DA]",
  SECONDARY_BACKGROUND_HOVER: "bg-[#101B35]/50",
  PRIMARY_BACKGROUND: "bg-[#101B35]/50",
  PRIMARY_BACKGROUND_HOVER: "bg-[#101B35]/75"
};
