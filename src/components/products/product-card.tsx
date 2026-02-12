"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/motion";
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingPrice = Math.min(...product.scents.map((s) => s.price));
  // For stagger: parent grid should pass index as prop if possible, fallback to 0
  // Here, we use a random delay for demo, but should be passed from parent for true stagger
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: motionTokens.distance.md }}
      animate={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: motionTokens.duration.normal / 1000,
        ease: motionTokens.easing.soft,
        // delay: index * motionTokens.stagger.grid / 1000, // if index is available
      }}
      style={{ willChange: "opacity, transform" }}
    >
      <Link href={`/san-pham/${product.slug}`} className="group">
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
          <CardHeader className="p-0 border-b">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay hiệu ứng hover */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
              {product.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: motionTokens.distance.xs }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: motionTokens.duration.fast / 1000,
                    ease: motionTokens.easing.soft,
                  }}
                  className="absolute top-3 left-3 flex flex-col gap-2 z-10"
                  style={{ willChange: "opacity, transform" }}
                >
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={tag === "Ưu đãi" ? "destructive" : "secondary"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <h3 className="font-headline text-lg font-medium leading-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <p className="text-sm font-medium text-foreground">
              Từ {formatPrice(startingPrice)}
            </p>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
