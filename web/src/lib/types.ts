export type Category = {
  name: string;
  slug: string;
  url?: string;
  total_products: number;
};

export type ProductImages = {
  full: string;
  medium: string;
  thumb: string;
  source_urls?: Record<string, string>;
};

export type RelatedProduct = {
  title: string;
  code: string;
  url?: string;
};

export type Product = {
  title: string;
  code: string;
  url?: string;
  category_name: string;
  category_slug: string;
  short_description: string;
  variants: Record<string, string[]>;
  note?: string;
  images: ProductImages;
  related_products?: RelatedProduct[];
  scraped_at?: string;
};

export type ProgressEntry = {
  total_products: number;
  status?: string;
  last_updated?: string;
};
