"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/layout/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const posts = [
  {
    slug: "gioi-thieu-flamora",
    title: "Giới thiệu Flamora",
    excerpt:
      "Câu chuyện và sứ mệnh phía sau thương hiệu nến thơm được yêu thích nhất Việt Nam.",
    category: "Thương hiệu",
    date: "15/01/2024",
    readTime: "5 phút đọc",
    image:
      "https://images.unsplash.com/photo-1602523961358-f9e9e68b5a4d?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    slug: "huong-thom-va-cach-chon",
    title: "Hương thơm và cách chọn",
    excerpt:
      "Hướng dẫn chi tiết giúp bạn tìm được mùi hương hoàn hảo cho từng không gian sống.",
    category: "Hướng dẫn",
    date: "10/01/2024",
    readTime: "8 phút đọc",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
  {
    slug: "nen-thom-va-thien",
    title: "Nến thơm và Thiền định",
    excerpt:
      "Khám phá cách sử dụng nến thơm để tạo không gian thiền định, thư giãn và tập trung hơn.",
    category: "Lối sống",
    date: "05/01/2024",
    readTime: "6 phút đọc",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/30 py-16 lg:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScrollReveal direction="up" distance={30}>
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Flamora Blog
            </span>
            <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-5xl lg:text-6xl mt-3">
              Câu chuyện & Cảm hứng
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Cập nhật tin tức, hướng dẫn và câu chuyện từ thế giới hương thơm.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Featured Post */}
        {featuredPost && (
          <ScrollReveal direction="up" distance={40} className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <Card className="overflow-hidden border-0 shadow-soft-lg hover:shadow-card-hover transition-all duration-500 group-hover:-translate-y-1">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint="candle ambiance"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Nổi bật
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                    <Badge variant="outline" className="w-fit mb-4 text-xs">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="font-headline text-2xl lg:text-3xl font-medium group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                      <span>{featuredPost.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                      Đọc bài viết <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </ScrollReveal>
        )}

        {/* Regular Posts Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.12}
        >
          {regularPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden border border-border/50 hover:shadow-card-hover transition-all duration-500 group-hover:-translate-y-1.5">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint="candle lifestyle"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-headline text-xl font-medium group-hover:text-primary transition-colors duration-300 leading-tight">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      Đọc thêm <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
