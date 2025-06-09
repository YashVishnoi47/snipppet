import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function formatDate(isoString) {
  const date = new Date(isoString);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    // hour: '2-digit',
    // minute: '2-digit',
    // hour12: true,
  };

  return date.toLocaleDateString(undefined, options);
}
export function formatDateForCode(isoString) {
  const date = new Date(isoString);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: '2-digit',
    minute: '2-digit',
    // hour12: true,
  };

  return date.toLocaleDateString(undefined, options);
}


export function getRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000); // in seconds

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minute(s) ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day(s) ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} week(s) ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} month(s) ago`;

  return `${Math.floor(diff / 31536000)} year(s) ago`;
}

