"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/layout/ScrollReveal";
import type { Category, Product } from "@/types";

interface HomeContentProps {
  categories: Category[];
  products: Product[];
  storyImage: { imageUrl: string; description: string; imageHint?: string } | undefined;
}

export function HomeContent({ categories, products, storyImage }: HomeContentProps) {
  return (
    <>
      {/* Storytelling Section */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          <ScrollReveal direction="left" distance={50} duration={0.7}>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                Câu chuyện thương hiệu
              </span>
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 leading-tight">
                Câu chuyện của{" "}
                <span className="italic text-primary">Flamora</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed mt-6">
                Tại Flamora, chúng tôi tin rằng ánh sáng không chỉ để soi rọi, mà
                còn để sưởi ấm tâm hồn. Mỗi ngọn nến được tạo ra từ niềm đam mê
                mang đến &ldquo;một loại ánh sáng dịu dàng hơn&rdquo; — một thứ ánh sáng của
                sự bình yên, thư thái và những khoảnh khắc chiêm nghiệm.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Chúng tôi tỉ mỉ lựa chọn những nguyên liệu tự nhiên, từ sáp cọ,
                sáp đậu nành đến các loại tinh dầu thuần khiết nhất, để tạo nên
                những mùi hương độc đáo.
              </p>
              <Button asChild variant="link" className="p-0 text-lg text-primary group mt-2">
                <Link href="/about" className="flex items-center gap-2">
                  Khám phá thêm
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={50} duration={0.7} delay={0.15}>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-soft-lg group">
              {storyImage && (
                <Image
                  src={storyImage.imageUrl}
                  alt={storyImage.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={storyImage.imageHint}
                />
              )}
              {/* Decorative border accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider" />

      {/* Categories Section */}
      <section className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto text-center relative">
          <ScrollReveal direction="up" distance={30}>
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
              Bộ sưu tập
            </span>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl mt-3">
              Danh mục sản phẩm
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">
              Tìm kiếm sản phẩm hoàn hảo cho không gian của bạn hoặc một món quà ý nghĩa.
            </p>
          </ScrollReveal>
          <StaggerContainer
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            staggerDelay={0.1}
          >
            {categories.map((category) => (
              <StaggerItem key={category.id} direction="zoom">
                <Link href={`/category/${category.slug}`} className="group block">
                  <Card className="overflow-hidden transition-all duration-500 group-hover:shadow-card-hover group-hover:-translate-y-2 border-0 bg-card">
                    <CardContent className="p-0 relative">
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <Image
                          src={
                            category.image ||
                            "https://images.unsplash.com/photo-1643122966895-380f2a0fe570?auto=format&fit=crop&w=400&q=80"
                          }
                          alt={`Danh mục ${category.name}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          data-ai-hint="candle product"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Text on hover */}
                        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <span className="text-white text-xl font-headline font-medium drop-shadow-lg flex items-center gap-2">
                            Khám phá <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-headline text-lg font-medium group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider" />

      {/* Best Sellers Section */}
      <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="container mx-auto text-center relative">
          <ScrollReveal direction="up" distance={30}>
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Yêu thích nhất
            </span>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl mt-3">
              Sản phẩm bán chạy
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">
              Những mùi hương được yêu thích nhất tại Flamora.
            </p>
          </ScrollReveal>
          <StaggerContainer
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
            staggerDelay={0.1}
          >
            {products.map((product, index) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollReveal direction="up" delay={0.4}>
            <Button asChild size="lg" className="mt-14 rounded-full px-8">
              <Link href="/san-pham?sort=popularity">Xem tất cả sản phẩm</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/30" />
        <div className="container mx-auto py-20 lg:py-24 relative">
          <ScrollReveal direction="up" distance={30}>
            <Card className="max-w-3xl mx-auto glass-card border-0 rounded-2xl">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl lg:text-4xl">
                  Đăng ký nhận tin
                </CardTitle>
                <p className="text-muted-foreground pt-3 text-base max-w-md mx-auto">
                  Nhận thông tin về sản phẩm mới và các chương trình ưu đãi đặc biệt.
                </p>
              </CardHeader>
              <CardContent className="pt-4 pb-8">
                <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <Input
                    type="email"
                    placeholder="Địa chỉ email của bạn"
                    className="flex-grow rounded-full px-5 h-12 bg-background/80"
                  />
                  <Button type="submit" className="rounded-full h-12 px-6">
                    <Mail className="mr-2 h-4 w-4" /> Đăng ký
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
