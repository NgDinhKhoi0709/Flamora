import {
  getProductBySlug,
  getRelatedProducts,
  getProducts,
} from "@/data/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductGallery } from "@/components/products/ProductGallery";
import { motion as motionTokens } from "@/lib/motion";
import * as React from "react";
import { ProductCard } from "@/components/products/product-card";
import { AddToCartForm } from "@/components/products/add-to-cart-form";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star } from "lucide-react";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          {/* Gallery with crossfade/slide */}
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {product.tags.length > 0 && (
            <div className="flex gap-2 mb-2">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tag === "Ưu đãi" ? "destructive" : "secondary"}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="font-headline text-4xl lg:text-5xl font-medium">
            {product.name}
          </h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(product.popularityScore / 20) ? "text-primary fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.popularityScore} đánh giá)
            </span>
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-8">
            <AddToCartForm product={product} />
          </div>

          <div className="mt-12">
            <Accordion type="multiple" defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Mô tả sản phẩm
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose text-muted-foreground">
                    {product.description}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Hướng dẫn sử dụng
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose text-muted-foreground">
                    {product.usageInstructions}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Vận chuyển & Đổi trả
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose text-muted-foreground">
                    {product.shippingReturns}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="font-headline text-3xl text-center mb-12">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
