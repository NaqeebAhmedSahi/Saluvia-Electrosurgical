"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  setQuantity,
} from "@/store/cartSlice";
import { Button } from "@/components/ui/Button";

export function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);

  const quoteHref = items.length
    ? `/contact?subject=quote&code=${encodeURIComponent(
        items.map((i) => `${i.code} x${i.quantity}`).join(", "),
      )}`
    : "/contact";

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
            Your cart
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {count > 0
              ? `${count} ${count === 1 ? "item" : "items"} ready for a quote request — no payment needed, our team responds with B2B pricing.`
              : "Add instruments from the catalog to request a consolidated quote."}
          </p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="inline-flex w-fit items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold text-ink-muted transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Trash2 className="size-3.5" />
            Clear cart
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-bg-elevated p-12 text-center shadow-sm">
          <ShoppingCart
            className="mx-auto size-10 text-ink-muted"
            strokeWidth={1.5}
          />
          <p className="mt-4 font-display text-lg font-semibold text-ink">
            Your cart is empty
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            Browse the catalog and add product references you want to include in
            your quote request.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/products" variant="primary">
              Browse products
            </Button>
            <Button href="/categories" variant="outline">
              View categories
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.code}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-4 rounded-xl border border-border bg-bg-elevated p-4 shadow-sm sm:gap-5 sm:p-5"
                >
                  <Link
                    href={`/products/${encodeURIComponent(item.code)}`}
                    className="relative block size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-white sm:size-24"
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} — ${item.code}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${encodeURIComponent(item.code)}`}
                          className="line-clamp-1 font-display text-sm font-semibold text-ink transition-colors hover:text-brand sm:text-base"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          <span className="font-bold tracking-wide text-brand">
                            {item.code}
                          </span>
                          <span className="mx-1.5">·</span>
                          {item.category_name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.code))}
                        aria-label={`Remove ${item.title} from cart`}
                        className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() =>
                            dispatch(
                              setQuantity({
                                code: item.code,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className="flex size-8 items-center justify-center rounded-l-md text-ink-soft transition-colors hover:bg-bg-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span
                          aria-live="polite"
                          className="flex h-8 min-w-10 items-center justify-center border-x border-border px-2 text-sm font-semibold text-ink"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() =>
                            dispatch(
                              setQuantity({
                                code: item.code,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="flex size-8 items-center justify-center rounded-r-md text-ink-soft transition-colors hover:bg-bg-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-ink-muted">
                        {item.quantity === 1 ? "unit" : "units"}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="rounded-xl border border-border bg-bg-elevated p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-semibold text-ink">
              Quote summary
            </h2>
            <dl className="mt-4 space-y-2 border-b border-border pb-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">References</dt>
                <dd className="font-semibold text-ink">{items.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Total units</dt>
                <dd className="font-semibold text-ink">{count}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Pricing is provided on request. Submit this list and our sales team
              will reply with availability and B2B terms.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href={quoteHref} variant="primary" className="w-full">
                Request quote for cart
              </Button>
              <Button href="/products" variant="outline" className="w-full">
                Continue browsing
              </Button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
