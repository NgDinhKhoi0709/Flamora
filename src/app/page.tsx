import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { getCategories, getProducts } from "@/data/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts({ limit: 4, sort: "popularity" });

  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");
  const storyImage = PlaceHolderImages.find((img) => img.id === "story-image");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <div className="mb-3">
            <span className="text-white font-headline text-lg md:text-2xl lg:text-3xl font-medium tracking-tight">
              Flamora
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
            A softer kind of light
          </h1>
          <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-200">
            Khám phá hương thơm tinh tế, thắp lên không gian sống ấm áp và dịu
            dàng.
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/san-pham">
              Mua sắm ngay <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2 className="font-headline text-3xl md:text-4xl text-foreground">
              Câu chuyện của Flamora
            </h2>
            <p>
              Tại Flamora, chúng tôi tin rằng ánh sáng không chỉ để soi rọi, mà
              còn để sưởi ấm tâm hồn. Mỗi ngọn nến được tạo ra từ niềm đam mê
              mang đến "một loại ánh sáng dịu dàng hơn" - một thứ ánh sáng của
              sự bình yên, thư thái và những khoảnh khắc chiêm nghiệm.
            </p>
            <p>
              Chúng tôi tỉ mỉ lựa chọn những nguyên liệu tự nhiên, từ sáp cọ,
              sáp đậu nành đến các loại tinh dầu thuần khiết nhất, để tạo nên
              những mùi hương độc đáo, kể lại câu chuyện của những vùng đất,
              những ký ức và những cảm xúc.
            </p>
            <Button asChild variant="link" className="p-0 text-lg text-primary">
              <Link href="/about">
                Khám phá thêm <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
            {storyImage && (
              <Image
                src={storyImage.imageUrl}
                alt={storyImage.description}
                fill
                className="object-cover"
                data-ai-hint={storyImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <Separator />

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl">
            Danh mục sản phẩm
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Tìm kiếm sản phẩm hoàn hảo cho không gian của bạn hoặc một món quà ý
            nghĩa.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className="group block"
              >
                <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-105">
                  <CardContent className="p-0 relative">
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <Image
                        src={
                          category.image ||
                          "https://images.unsplash.com/photo-1643122966895-380f2a0fe570?auto=format&fit=crop&w=400&q=80"
                        }
                        alt={`Danh mục ${category.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint="candle product"
                      />
                      {/* Overlay hiệu ứng */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      {/* Text nổi lên khi hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-2xl font-headline font-semibold drop-shadow-lg text-center px-2">
                          {category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-headline text-xl font-medium group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl">
            Sản phẩm bán chạy
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Những mùi hương được yêu thích nhất tại Flamora.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Button asChild size="lg" className="mt-12">
            <Link href="/san-pham?sort=popularity">Xem tất cả</Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-secondary/50">
        <div className="container mx-auto py-16 lg:py-20">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">
                Đăng ký nhận tin
              </CardTitle>
              <p className="text-muted-foreground pt-2">
                Nhận thông tin về sản phẩm mới và các chương trình ưu đãi đặc
                biệt.
              </p>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Địa chỉ email của bạn"
                  className="flex-grow"
                />
                <Button type="submit" className="w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" /> Đăng ký
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
