import { Suspense } from "react";
import { getCategories, getProducts } from "@/data/mock-data";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductAdvancedFilters } from "@/components/products/product-advanced-filters";
import { PaginationControls } from "@/components/products/pagination-controls";
import { ShopPageHeader } from "@/components/layout/ShopPageHeader";
import type {
  SortOption,
  Product,
  Category,
  ProductColor,
  Scent,
} from "@/types";

const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: any;
}) {
  // Next.js 15: searchParams is a promise, must be awaited
  const params = await searchParams;
  const categories = await getCategories();
  const page = Number(params["page"] ?? "1");
  const category = params["category"] as string | undefined;
  const sort = (params["sort"] as SortOption) || "newest";
  const query = params["q"] as string | undefined;

  let allProducts: Product[] = await getProducts({ category, sort, query });

  // --- FILTER LOGIC ---
  const priceGte = Number(params["price_gte"] ?? "");
  const priceLte = Number(params["price_lte"] ?? "");
  const selectedScents = ([] as string[]).concat(params["scent"] ?? []);
  const selectedCategories = ([] as string[]).concat(params["cat"] ?? []);

  let productsForColorFilter: Product[];
  if (selectedCategories.length > 0) {
    productsForColorFilter = (await getProducts({ sort, query })).filter((p) =>
      selectedCategories.includes(p.category),
    );
  } else if (category) {
    productsForColorFilter = (await getProducts({ sort, query })).filter(
      (p) => p.category === category,
    );
  } else {
    productsForColorFilter = await getProducts({ sort, query });
  }

  allProducts = allProducts.filter((p) => {
    let priceOk = true;
    if (priceGte || priceLte) {
      priceOk = p.scents.some((s) => {
        if (priceGte && s.price < priceGte) return false;
        if (priceLte && s.price > priceLte) return false;
        return true;
      });
    }
    let scentOk = true;
    if (selectedScents.length > 0) {
      scentOk = p.category === "set-qua-tang" || p.scents.some((s) => selectedScents.includes(s.name));
    }
    let catOk = true;
    if (selectedCategories.length > 0) {
      catOk = selectedCategories.includes(p.category);
    }
    return priceOk && scentOk && catOk;
  });

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  const allScents: Scent[] = Array.from(
    new Map(
      productsForColorFilter
        .flatMap((p) => p.scents)
        .filter((s) => !s.id.startsWith("set-4"))
        .map((s) => [s.name, s]),
    ).values(),
  );
  const minPrice = 0;
  const maxPrice = 3_000_000;

  return (
    <div className="bg-background">
      {/* Animated Page Header */}
      <ShopPageHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="md:w-1/4 w-full">
            <ProductAdvancedFilters
              categories={categories}
              allScents={allScents}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end mb-6">
              <Suspense fallback={<div>Đang tải bộ lọc...</div>}>
                <ProductFilters categories={categories} />
              </Suspense>
            </div>
            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} />
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <ProductGrid products={[]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
