import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const storeJson = (key: string, data: string): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getJson = (key: string): Record<string, any> | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeAuthToken = (key: string): void => {
  localStorage.removeItem(key);
};
