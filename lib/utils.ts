import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MatchStatus } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMatchTime(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function formatMatchDate(utcDate: string): string {
  const date = new Date(utcDate);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === now.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatRelativeTime(utcDate: string): string {
  const date = new Date(utcDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function getStatusLabel(status: MatchStatus, minute?: number): string {
  switch (status) {
    case "IN_PLAY":
      return minute ? `${minute}'` : "LIVE";
    case "PAUSED":
      return "HT";
    case "FINISHED":
      return "FT";
    case "SCHEDULED":
    case "TIMED":
      return "Soon";
    case "POSTPONED":
      return "PPD";
    case "CANCELLED":
      return "CANC";
    default:
      return status;
  }
}

export function isLive(status: MatchStatus): boolean {
  return status === "IN_PLAY" || status === "PAUSED";
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}
