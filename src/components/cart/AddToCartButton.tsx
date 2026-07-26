"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  product,
  size = "md",
  className,
}: {
  product: Pick<
    Product,
    "code" | "title" | "category_name" | "category_slug" | "images"
  >;
  size?: "sm" | "md";
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAdd = (event: React.MouseEvent | React.PointerEvent) => {
    // Stop the ProductCard stretched <Link> from stealing the interaction.
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      addToCart({
        code: product.code,
        title: product.title,
        category_name: product.category_name,
        category_slug: product.category_slug,
        image:
          product.images.thumb ||
          product.images.medium ||
          product.images.full,
      }),
    );
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      onPointerDown={(event) => {
        // Don't preventDefault — that suppresses the click event.
        event.stopPropagation();
      }}
      aria-label={
        added
          ? `${product.title} added to cart`
          : `Add ${product.title} (${product.code}) to cart`
      }
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-all duration-300 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        added
          ? "bg-success text-ink-inverse"
          : "bg-brand text-ink-inverse hover:bg-brand-soft",
        size === "sm" ? "px-3 py-2 text-xs" : "px-5 py-2.5 text-sm",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            className="inline-flex items-center gap-1.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Check className={size === "sm" ? "size-3.5" : "size-4"} />
            Added
          </motion.span>
        ) : (
          <motion.span
            key="add"
            className="inline-flex items-center gap-1.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <ShoppingCart className={size === "sm" ? "size-3.5" : "size-4"} />
            Add to cart
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
