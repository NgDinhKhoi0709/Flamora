import { Suspense } from 'react';
import { getCategories, getCategoryBySlug, getProducts } from "@/data/mock-data";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/product-card";
import { ProductFilters } from "@/components/products/product-filters";
import { PaginationControls } from '@/components/products/pagination-controls';
import type { SortOption } from '@/types';

const PRODUCTS_PER_PAGE = 12;

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map(category => ({
        slug: category.slug
    }))
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentCategory = await getCategoryBySlug(params.slug);
  if (!currentCategory) {
    notFound();
  }

  const allCategories = await getCategories();
  const page = Number(searchParams['page'] ?? '1');
  const sort = (searchParams['sort'] as SortOption) || 'newest';
  const query = searchParams['q'] as string | undefined;

  const allProducts = await getProducts({ category: currentCategory.slug, sort, query });
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 bg-secondary/50 p-8 rounded-lg">
            <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl">{currentCategory.name}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">{currentCategory.description}</p>
        </div>
        
        <Suspense fallback={<div>Đang tải bộ lọc...</div>}>
            <ProductFilters categories={allCategories} />
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
            <p className="mt-2 text-muted-foreground">Chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
