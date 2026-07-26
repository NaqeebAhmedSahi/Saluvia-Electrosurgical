"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./store";
import { hydrateCart, type CartItem } from "./cartSlice";

const STORAGE_KEY = "saluvia-cart";

function loadCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item.code === "string" &&
        typeof item.title === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode / quota) — cart stays in memory
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const hydratedRef = useRef(false);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    // Hydrate once. Never clobber items already added this session
    // (click-before-effect race, or Strict Mode remount).
    if (!hydratedRef.current) {
      const current = store.getState().cart.items;
      if (current.length === 0) {
        const saved = loadCart();
        if (saved.length > 0) {
          store.dispatch(hydrateCart(saved));
        }
      } else {
        saveCart(current);
      }
      hydratedRef.current = true;
    }

    const unsubscribe = store.subscribe(() => {
      saveCart(store.getState().cart.items);
    });
    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
