"use client";

import { useState, useEffect } from 'react';
import { Product, Scent } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_SCENTS } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddToCartFormProps {
  product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedScent, setSelectedScent] = useState<Scent>(product.scents[0]);
  const [quantity, setQuantity] = useState(1);
  const [customChoices, setCustomChoices] = useState<string[]>(['', '', '', '']);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Dispatch initial scent to sync the image gallery
  useEffect(() => {
    if (product.scents.length > 0) {
      window.dispatchEvent(new CustomEvent('scentChanged', { 
        detail: { scentName: product.scents[0].name } 
      }));
    }
  }, [product.scents]);

  const handleCustomChoiceChange = (index: number, value: string) => {
    const newChoices = [...customChoices];
    newChoices[index] = value;
    setCustomChoices(newChoices);
  };

  const handleAddToCart = () => {
    // Validation for custom 4-scent set
    if (selectedScent.id === 'set-4-s1' && customChoices.some(c => c === '')) {
      toast({
        title: "Chưa chọn đủ mùi hương",
        description: "Vui lòng chọn đủ 4 mùi hương cho set quà tặng của bạn.",
        variant: "destructive"
      });
      return;
    }

    let itemScent = selectedScent;

    // Override the scent name to include the 4 chosen scents
    if (selectedScent.id === 'set-4-s1') {
      const shortNames = customChoices.map(c => c.split('—')[0].trim());
      itemScent = {
        ...selectedScent,
        name: `Tự chọn: ${shortNames.join(', ')}`
      };
    }

    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0],
      scent: itemScent,
      quantity: quantity,
      unitPrice: selectedScent.price,
    });
    
    toast({
      title: "Thêm vào giỏ hàng thành công!",
      description: `${quantity} x ${product.name} đã được thêm vào giỏ hàng.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Scent Selector */}
      <div>
        <h3 className="text-lg font-medium">Chọn lựa chọn của bạn</h3>
        <RadioGroup
          value={selectedScent.id}
          onValueChange={(id) => {
            const scent = product.scents.find(s => s.id === id);
            if (scent) {
              setSelectedScent(scent);
              window.dispatchEvent(new CustomEvent('scentChanged', { 
                detail: { scentName: scent.name } 
              }));
            }
          }}
          className="mt-4 space-y-4"
        >
          {product.scents.map((scent) => (
            <div key={scent.id} className="space-y-3">
              <Label
                className={cn(
                  "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors",
                  { 'border-primary ring-2 ring-primary': selectedScent.id === scent.id }
                )}
              >
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value={scent.id} id={scent.id} />
                  <div>
                    <p className="font-medium">{scent.name}</p>
                  </div>
                </div>
                <p className="font-semibold">{formatPrice(scent.price)}</p>
              </Label>
              
              {/* If this is the "custom choice" option and it is selected, show 4 dropdowns */}
              {scent.id === 'set-4-s1' && selectedScent.id === 'set-4-s1' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8 pr-4 pt-2 pb-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="space-y-1.5">
                      <Label className="text-sm text-muted-foreground">Mùi hương {index + 1}</Label>
                      <Select 
                        value={customChoices[index]} 
                        onValueChange={(val) => handleCustomChoiceChange(index, val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mùi hương..." />
                        </SelectTrigger>
                        <SelectContent>
                          {BASE_SCENTS.map((base) => (
                            <SelectItem key={base.name} value={base.name}>
                              {base.name.split('—')[0].trim()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-input rounded-md p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setQuantity(q => q + 1)}
          >
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
  );
}
