"use client";

import { useOrders } from "@/context/order-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useOrders();
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p>Đang tải lịch sử đơn hàng...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto" />
        <h1 className="mt-4 text-4xl font-headline">Chưa có đơn hàng nào</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tất cả đơn hàng bạn đặt sẽ được hiển thị ở đây.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/san-pham">Bắt đầu mua sắm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 min-h-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-headline text-center mb-12">
          Lịch sử đơn hàng
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Mã đơn hàng
                  </p>
                  <p className="text-sm font-medium font-mono">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Ngày đặt
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Tổng tiền
                  </p>
                  <p className="text-sm font-medium">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Trạng thái
                  </p>
                  <p className="text-sm font-medium capitalize">
                    {order.status}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Sản phẩm:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity} x {item.productName}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-secondary/30">
                <Button asChild variant="ghost" className="text-primary">
                  <Link href={`/orders/${order.id}`}>Xem chi tiết</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
