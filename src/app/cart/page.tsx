import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review selected Saluvia electrosurgical instrument references and request a consolidated B2B quote.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <div className="section-space">
      <div className="container-site space-y-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        />
        <CartView />
      </div>
    </div>
  );
}
