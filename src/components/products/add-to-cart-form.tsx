"use client";

import { useState } from 'react';
import { Product, Scent, ProductColor } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AddToCartFormProps {
  product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedScent, setSelectedScent] = useState<Scent>(product.scents[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0],
      scent: selectedScent,
      color: selectedColor,
      quantity: quantity,
      unitPrice: selectedScent.price,
    });
    toast({
      title: "Thêm vào giỏ hàng thành công!",
      description: `${quantity} x ${product.name} (${selectedScent.name}) đã được thêm vào giỏ hàng.`,
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Scent Selector */}
        <div>
          <h3 className="text-lg font-medium">Chọn mùi hương</h3>
          <RadioGroup
            value={selectedScent.id}
            onValueChange={(id) => {
              const scent = product.scents.find(s => s.id === id);
              if (scent) setSelectedScent(scent);
            }}
            className="mt-4 space-y-4"
          >
            {product.scents.map((scent) => (
              <Label key={scent.id} className={cn("flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors", { 'border-primary ring-2 ring-primary': selectedScent.id === scent.id })}>
                <div className="flex items-center space-x-4">
                    <RadioGroupItem value={scent.id} id={scent.id} />
                    <div>
                        <p className="font-medium">{scent.name}</p>
                        <p className="text-sm text-muted-foreground">{scent.notes.top} / {scent.notes.mid} / {scent.notes.base}</p>
                    </div>
                </div>
                <p className="font-semibold">{formatPrice(scent.price)}</p>
              </Label>
            ))}
          </RadioGroup>
        </div>
        
        <Separator />
        
        {/* Color Selector */}
        <div>
          <h3 className="text-lg font-medium">Chọn màu sắc: <span className="font-normal text-muted-foreground">{selectedColor.name}</span></h3>
          <div className="flex items-center space-x-3 mt-4">
            {product.colors.map((color) => (
              <Tooltip key={color.name}>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => setSelectedColor(color)}
                        className={cn('h-8 w-8 rounded-full border-2 transition-all', {
                            'ring-2 ring-offset-2 ring-primary': selectedColor.name === color.name,
                            'border-transparent': selectedColor.name !== color.name
                        })}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Chọn màu ${color.name}`}
                    />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{color.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-input rounded-md p-1">
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => q+1)}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" onClick={handleAddToCart} className="flex-grow">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Thêm vào giỏ - {formatPrice(selectedScent.price * quantity)}
            </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
