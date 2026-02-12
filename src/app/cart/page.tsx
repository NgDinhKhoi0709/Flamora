"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsHydrated } from "@/hooks/use-is-hydrated";

export default function CartPage() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem } = useCart();
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <p>Đang tải giỏ hàng...</p>
        </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-headline">Giỏ hàng của bạn đang trống</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hãy bắt đầu mua sắm để tìm những sản phẩm ưng ý.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">Bắt đầu mua sắm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-headline text-center mb-12">Giỏ hàng của bạn</h1>
        <div className="grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.id} className="flex flex-col sm:flex-row p-6">
                      <div className="h-32 w-32 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-border mx-auto sm:mx-0">
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-0 mt-4 sm:mt-0 sm:ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-foreground">
                            <h3><Link href={`/shop/${item.productSlug}`}>{item.productName}</Link></h3>
                            <p className="ml-4">{formatPrice(item.unitPrice * item.quantity)}</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.scent.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground flex items-center">
                            Màu: {item.color.name}
                            <span className="ml-2 h-4 w-4 rounded-full border" style={{ backgroundColor: item.color.hex }} />
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm mt-4">
                            <div className="flex items-center border border-input rounded-md">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={item.quantity}
                                    min={1}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                    className="h-8 w-12 border-0 text-center"
                                />
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                          <div className="flex">
                            <Button variant="ghost" type="button" className="text-muted-foreground hover:text-accent" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4 mr-1" /> Xóa
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tạm tính</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-semibold">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Button asChild size="lg" className="w-full mt-4">
                  <Link href="/checkout">
                    Tiến hành thanh toán <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
