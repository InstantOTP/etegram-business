import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = (currency = 'NGN', fractiondigit = 2) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    // currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: fractiondigit,
  });

//Function that returns the first or first two letters from a name
export const findUpper = (text: string) => {
  let extractedString = [];

  for (var i = 0; i < text?.length; i++) {
    if (
      text.charAt(i) === text.charAt(i).toUpperCase() &&
      text.charAt(i) !== ' '
    ) {
      extractedString.push(text.charAt(i));
    }
  }
  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function generateSlug(str: string) {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters (except hyphens)
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '') // Remove leading hyphen
    .replace(/-+$/, ''); // Remove trailing hyphen
}

export function kConverter(num: number) {
  if (num < 1000) {
    return num.toFixed(0); // assuming an integer
  } else {
    const s = (0.1 * Math.floor(num / 100)).toFixed(1);
    return s.replace('.0', '') + 'k';
  }
}

export const formatDate = (str: string) => {
  return new Date(str).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

export const formatDateNumeric = (str: string) => {
  return new Date(str).toLocaleDateString('en-ca', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTimeNumeric = (str: string) => {
  return new Date(str).toLocaleDateString('en-ca', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDateWithTime = (str: string) => {
  return new Date(str).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // hour12: false,
  });
};
