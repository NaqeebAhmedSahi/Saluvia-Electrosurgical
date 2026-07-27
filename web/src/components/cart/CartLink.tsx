"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/cartSlice";
import { cn } from "@/lib/utils";

export function CartLink({ className }: { className?: string }) {
  const count = useAppSelector(selectCartCount);

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-md text-ink-soft transition-colors",
        "hover:bg-accent-muted/60 hover:text-brand",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <ShoppingCart className="size-5" strokeWidth={1.9} />
      <AnimatePresence>
        {count > 0 ? (
          <motion.span
            key="badge"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute -right-0.5 -top-0.5 flex min-w-[1.15rem] items-center justify-center rounded-full bg-accent px-1 py-0.5 text-[10px] font-bold leading-none text-ink-inverse"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </Link>
  );
}
