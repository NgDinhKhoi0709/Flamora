"use client";

import { ProductCard } from "@/components/products/product-card";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/layout/ScrollReveal";
import type { Product } from "@/types";
import { Flame, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SalePageContentProps {
  saleProducts: Product[];
}

export function SalePageContent({ saleProducts }: SalePageContentProps) {
  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-900/90 via-orange-800/80 to-amber-700/70 py-20 lg:py-28">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-red-400/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-300/10 rounded-full blur-xl animate-glow-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal direction="up" distance={30}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-amber-300 animate-glow-pulse" />
              <span className="text-amber-200 text-sm tracking-[0.3em] uppercase font-medium">
                Ưu đãi đặc biệt
              </span>
              <Flame className="w-6 h-6 text-amber-300 animate-glow-pulse" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-headline font-bold text-white tracking-tight">
              Sale
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-white/80 font-light">
              Các sản phẩm đang có ưu đãi đặc biệt — số lượng có hạn!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {saleProducts.length > 0 ? (
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
            staggerDelay={0.1}
          >
            {saleProducts.map((p, i) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <ScrollReveal direction="up" className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-headline font-medium">
              Không có ưu đãi hiện tại
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Hãy quay lại sau để xem các chương trình khuyến mãi hấp dẫn.
            </p>
            <Button asChild className="mt-8 rounded-full px-8" size="lg">
              <Link href="/san-pham">Xem tất cả sản phẩm</Link>
            </Button>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
