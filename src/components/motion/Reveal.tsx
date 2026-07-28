"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

const fadeUpReduced = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
} & MotionProps) {
  const reduceMotion = useReducedMotion();

  // Use animate (not whileInView) so soft navigations — e.g. product
  // detail from catalog — remount already in-viewport and still reveal.
  // whileInView often never fires in that case, leaving content at opacity 0
  // (notably the PDP hero image on mobile).
  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      variants={
        reduceMotion
          ? fadeUpReduced
          : {
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease, delay },
              },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // Use animate (not whileInView) so soft navigations — e.g. product
  // pagination — remount the grid already in-viewport and still reveal.
  // whileInView often never fires in that case, leaving cards at opacity 0.
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      variants={
        reduceMotion
          ? { hidden: {}, show: { transition: { duration: 0 } } }
          : stagger
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full", className)}
      variants={reduceMotion ? fadeUpReduced : fadeUp}
    >
      {children}
    </motion.div>
  );
}
