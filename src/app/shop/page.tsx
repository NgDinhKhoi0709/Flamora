import { Suspense } from 'react';
import { getCategories, getProducts } from "@/data/mock-data";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import { PaginationControls } from '@/components/products/pagination-controls';
import type { SortOption } from '@/types';

const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categories = await getCategories();
  const page = Number(searchParams['page'] ?? '1');
  const category = searchParams['category'] as string | undefined;
  const sort = (searchParams['sort'] as SortOption) || 'newest';
  const query = searchParams['q'] as string | undefined;

  const allProducts = await getProducts({ category, sort, query });
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl">Cửa hàng</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Khám phá bộ sưu tập hương thơm độc đáo của chúng tôi.</p>
        </div>
        
        <Suspense fallback={<div>Đang tải bộ lọc...</div>}>
            <ProductFilters categories={categories} />
        </Suspense>
        
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <PaginationControls currentPage={page} totalPages={totalPages} />
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium">Không tìm thấy sản phẩm</h2>
            <p className="mt-2 text-muted-foreground">Hãy thử thay đổi bộ lọc hoặc tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
}
