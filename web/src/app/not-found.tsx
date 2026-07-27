import Link from "next/link";
import { PageHero } from "@/components/content/PageHero";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div>
      <PageHero
        eyebrow="404"
        title="Page not found"
        description="The page or product reference you requested is not available."
      />
      <section className="pb-20">
        <div className="container-site flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Back home
          </Button>
          <Button href="/products" variant="outline">
            Browse products
          </Button>
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-semibold text-brand hover:underline"
          >
            Contact sales
          </Link>
        </div>
      </section>
    </div>
  );
}
