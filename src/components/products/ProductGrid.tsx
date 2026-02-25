"use client";

import { ProductCard } from "@/components/products/product-card";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/layout/ScrollReveal";
import type { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <ScrollReveal direction="up" className="text-center py-20">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-headline font-medium">
          Không tìm thấy sản phẩm
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          {emptyMessage || "Hãy thử thay đổi bộ lọc hoặc tìm kiếm của bạn."}
        </p>
        <Button asChild className="mt-8 rounded-full px-8" size="lg">
          <Link href="/san-pham">Xem tất cả sản phẩm</Link>
        </Button>
      </ScrollReveal>
    );
  }

  return (
    <StaggerContainer
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
      staggerDelay={0.08}
    >
      {products.map((product, index) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} index={index} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
