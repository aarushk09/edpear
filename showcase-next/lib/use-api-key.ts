"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "openrouter_key";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage", callback);
  
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";
  }
  return localStorage.getItem(STORAGE_KEY) ?? process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";
}

function getServerSnapshot() {
  return process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";
}

export function useApiKey() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setLocalApiKey(key: string) {
  if (typeof window === "undefined") return;
  
  if (!key) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, key);
  }
  
  window.dispatchEvent(new Event("local-storage"));
}
