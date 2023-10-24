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

export type Nullable<T> = T | null;

interface EntityCardColors {
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
  PRIMARY_BACKGROUND: "[#101B35]/50",
  PRIMARY_BACKGROUND_HOVER: "bg-[#101B35]/75"
};
