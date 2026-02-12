import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingPrice = Math.min(...product.scents.map(s => s.price));

  return (
    <Link href={`/shop/${product.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0 border-b">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.tags.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.tags.map(tag => (
                        <Badge key={tag} variant={tag === 'Ưu đãi' ? 'destructive' : 'secondary'}>{tag}</Badge>
                    ))}
                </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-lg font-medium leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm font-medium text-foreground">
            Từ {formatPrice(startingPrice)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
