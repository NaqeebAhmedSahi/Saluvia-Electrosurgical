import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import {
  firstParam,
  listParam,
  parsePage,
  type SearchParamsInput,
} from "@/components/catalog/catalog-utils";

/** True when listing has filters/search/pagination that create crawlable URL variants. */
export function isFilteredCatalogQuery(query: SearchParamsInput): boolean {
  const q = firstParam(query, "q");
  const page = parsePage(firstParam(query, "page"));
  const sort = firstParam(query, "sort");
  const categories = listParam(query, "category");
  const hasFacetParams = Object.keys(query).some((key) =>
    key.toLowerCase().startsWith("f-"),
  );

  return (
    Boolean(q?.trim()) ||
    categories.length > 0 ||
    hasFacetParams ||
    page > 1 ||
    Boolean(sort && sort !== "relevance")
  );
}

export function catalogListRobots(isFiltered: boolean): Metadata["robots"] {
  if (isFiltered) {
    return {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    };
  }
  return {
    index: true,
    follow: true,
  };
}

export function catalogCanonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
