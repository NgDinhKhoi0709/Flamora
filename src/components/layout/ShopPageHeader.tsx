"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { Search } from "lucide-react";

export function ShopPageHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/30 py-16 lg:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-primary/3 rounded-full blur-2xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <ScrollReveal direction="up" distance={30}>
          <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Khám phá
          </span>
          <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl mt-3">
            Sản phẩm
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Khám phá bộ sưu tập hương thơm độc đáo của chúng tôi.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
