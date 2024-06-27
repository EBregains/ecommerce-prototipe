import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = []

  array.map((value, index) => {
    if (!result[index % numParts]) {
      result[index % numParts] = []
    }
    result[index % numParts].push(value)
  })

  return result
}

export const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

export const ARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});