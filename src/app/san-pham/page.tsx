import { Suspense } from "react";
import { getCategories, getProducts } from "@/data/mock-data";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductAdvancedFilters } from "@/components/products/product-advanced-filters";
import { PaginationControls } from "@/components/products/pagination-controls";
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
  // Lấy filter từ searchParams
  const priceGte = Number(params["price_gte"] ?? "");
  const priceLte = Number(params["price_lte"] ?? "");
  const selectedColors = ([] as string[]).concat(params["color"] ?? []);
  const selectedScents = ([] as string[]).concat(params["scent"] ?? []);
  const selectedCategories = ([] as string[]).concat(params["cat"] ?? []);

  // Lấy tất cả sản phẩm thuộc loại sản phẩm đang chọn (cho filter màu)
  let productsForColorFilter: Product[];
  if (selectedCategories.length > 0) {
    // Nếu chọn nhiều loại, lấy tất cả sản phẩm thuộc các loại đó
    productsForColorFilter = (await getProducts({ sort, query })).filter((p) =>
      selectedCategories.includes(p.category),
    );
  } else if (category) {
    // Nếu có category trên URL
    productsForColorFilter = (await getProducts({ sort, query })).filter(
      (p) => p.category === category,
    );
  } else {
    // Không chọn loại nào, lấy tất cả
    productsForColorFilter = await getProducts({ sort, query });
  }

  allProducts = allProducts.filter((p) => {
    // Giá: ít nhất 1 scent nằm trong khoảng
    let priceOk = true;
    if (priceGte || priceLte) {
      priceOk = p.scents.some((s) => {
        if (priceGte && s.price < priceGte) return false;
        if (priceLte && s.price > priceLte) return false;
        return true;
      });
    }
    // Màu sắc: phải có 1 màu được chọn
    let colorOk = true;
    if (selectedColors.length > 0) {
      colorOk = p.colors.some((c) => selectedColors.includes(c.name));
    }
    // Mùi hương: phải có 1 scent được chọn
    let scentOk = true;
    if (selectedScents.length > 0) {
      scentOk = p.scents.some((s) => selectedScents.includes(s.name));
    }
    // Loại: phải thuộc 1 category được chọn
    let catOk = true;
    if (selectedCategories.length > 0) {
      catOk = selectedCategories.includes(p.category);
    }
    return priceOk && colorOk && scentOk && catOk;
  });

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  // Collect all unique colors and scents for filter UI
  // allColors: luôn lấy từ productsForColorFilter (không phụ thuộc filter màu)
  const allColors: ProductColor[] = Array.from(
    new Map(
      productsForColorFilter.flatMap((p) => p.colors).map((c) => [c.name, c]),
    ).values(),
  );
  // allScents: luôn lấy từ productsForColorFilter (không phụ thuộc filter mùi hương)
  const allScents: Scent[] = Array.from(
    new Map(
      productsForColorFilter.flatMap((p) => p.scents).map((s) => [s.id, s]),
    ).values(),
  );
  // Cố định khoảng giá filter
  const minPrice = 0;
  const maxPrice = 3_000_000;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Sản phẩm
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Khám phá bộ sưu tập hương thơm độc đáo của chúng tôi.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="md:w-1/4 w-full">
            <ProductAdvancedFilters
              categories={categories}
              allColors={allColors}
              allScents={allScents}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
          {/* Main content */}
          <div className="flex-1">
            {/* Danh mục + sắp xếp ngang hàng */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end mb-6">
              <Suspense fallback={<div>Đang tải bộ lọc...</div>}>
                <ProductFilters categories={categories} />
              </Suspense>
            </div>
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-medium">
                  Không tìm thấy sản phẩm
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Hãy thử thay đổi bộ lọc hoặc tìm kiếm của bạn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
