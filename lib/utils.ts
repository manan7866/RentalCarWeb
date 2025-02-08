import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
 export function generateRandomKey() {
  return Math.random().toString(36).substring(2, 10); // Generates a 6-character random key
}