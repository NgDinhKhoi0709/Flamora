"use client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const startingPrice = Math.min(...product.scents.map((s) => s.price));

  return (
    <Link href={`/san-pham/${product.slug}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-500 group-hover:shadow-card-hover group-hover:-translate-y-2 border border-border/50 bg-card">
        <CardHeader className="p-0 border-b border-border/30">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Quick view indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <Eye className="w-5 h-5 text-foreground" />
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={tag === "Ưu đãi" ? "destructive" : "secondary"}
                    className="shadow-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-lg font-medium leading-tight group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-row items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground whitespace-nowrap">
            Từ {formatPrice(startingPrice)}
          </p>
          <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap flex items-center shrink-0">
            Xem chi tiết
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
