import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Intrinsic size of /logo.jpeg (width × height). */
const LOGO_WIDTH = 775;
const LOGO_HEIGHT = 281;

type BrandLogoProps = {
  /** Visual context — footer uses a light plate so the JPEG reads on dark bg */
  variant?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "header",
  className,
  priority = false,
}: BrandLogoProps) {
  const heightClass = variant === "footer" ? "h-11 sm:h-12" : "h-9 sm:h-10";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variant === "footer" && "focus-visible:ring-offset-brand-deep",
        className,
      )}
      aria-label="Saluvia Industries — home"
    >
      <span
        className={cn(
          "inline-flex items-center overflow-hidden rounded-md",
          variant === "footer" && "bg-[#f7f8f9] px-2 py-1.5 shadow-sm",
        )}
      >
        <Image
          src="/logo.jpeg"
          alt="Saluvia Industries"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority={priority}
          sizes="(max-width: 640px) 140px, 180px"
          className={cn("w-auto object-contain object-left", heightClass)}
        />
      </span>
    </Link>
  );
}
