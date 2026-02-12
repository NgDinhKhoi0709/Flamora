"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { CartSheetContent } from "./cart-sheet";

export function CartIcon() {
  const { totalItems } = useCart();
  const isHydrated = useIsHydrated();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-6 w-6" />
          <span className="sr-only">Giỏ hàng</span>
          {isHydrated && totalItems > 0 && (
            <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 flex items-center justify-center h-5 w-5 rounded-full bg-[#BCA657] text-white text-xs font-medium ring-2 ring-[#BCA657]/20">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Giỏ hàng</SheetTitle>
        </SheetHeader>
        <CartSheetContent />
      </SheetContent>
    </Sheet>
  );
}
