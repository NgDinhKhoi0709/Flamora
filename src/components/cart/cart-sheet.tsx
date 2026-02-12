"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSheetContent() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem } = useCart();

  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Giỏ hàng của bạn đang trống</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Hãy bắt đầu mua sắm để thêm sản phẩm vào đây.
        </p>
        <SheetClose asChild>
            <Button asChild className="mt-6">
                <Link href="/shop">Tiếp tục mua sắm</Link>
            </Button>
        </SheetClose>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-grow pr-4 -mr-6">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-foreground">
                    <h3>
                      <Link href={`/shop/${item.productSlug}`}>{item.productName}</Link>
                    </h3>
                    <p className="ml-4">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.scent.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground flex items-center">
                    Màu: {item.color.name}
                    <span
                      className="ml-2 h-4 w-4 rounded-full border"
                      style={{ backgroundColor: item.color.hex }}
                    />
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center border border-input rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="h-8 w-12 border-0 text-center"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex">
                    <Button variant="ghost" type="button" className="text-muted-foreground hover:text-accent" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div className="border-t border-border pt-6 mt-auto">
        <div className="flex justify-between text-lg font-medium text-foreground">
          <p>Tổng cộng</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Phí vận chuyển sẽ được tính ở bước thanh toán.
        </p>
        <div className="mt-6">
            <SheetClose asChild>
                <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">
                    Thanh toán
                    <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </SheetClose>
        </div>
        <div className="mt-4 flex justify-center text-center text-sm text-muted-foreground">
          <p>
            hoặc{' '}
            <SheetClose asChild>
                <Button variant="link" className="p-0">
                    <Link href="/cart">
                        Xem giỏ hàng chi tiết
                    </Link>
                </Button>
            </SheetClose>
          </p>
        </div>
      </div>
    </div>
  );
}

// Dummy SheetClose for type compatibility if not directly available
const SheetClose = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>((props, ref) => (
  <button ref={ref} {...props} />
));
SheetClose.displayName = 'SheetClose';

// Dummy ShoppingBag for type compatibility if not directly available
const ShoppingBag = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-3z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
);
