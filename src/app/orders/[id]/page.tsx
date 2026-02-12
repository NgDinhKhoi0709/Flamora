"use client";

import { useSearchParams, notFound, useParams } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const { getOrderById } = useOrders();
  const order = getOrderById(params.id);
  const successImage = PlaceHolderImages.find(
    (img) => img.id === "checkout-success",
  );

  if (!order) {
    return notFound();
  }

  return (
    <div className="bg-secondary/50 min-h-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          {isSuccess && (
            <CardHeader className="text-center items-center p-8 bg-green-50 rounded-t-lg">
              <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
              <CardTitle className="font-headline text-3xl text-green-800">
                Cảm ơn bạn đã đặt hàng!
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Đơn hàng của bạn đã được nhận và đang được xử lý.
              </p>
            </CardHeader>
          )}

          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Mã đơn hàng:{" "}
                  <span className="font-mono text-primary">{order.id}</span>
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Ngày đặt:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                  <p>
                    <strong>Tổng cộng:</strong>{" "}
                    <span className="font-semibold text-foreground">
                      {formatPrice(order.total)}
                    </span>
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Thông tin giao hàng
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{order.customer.name}</p>
                  <p>{order.customer.phone}</p>
                  <p>{order.customer.address}</p>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <h3 className="font-semibold text-lg mb-4">Chi tiết đơn hàng</h3>
            <ul className="divide-y divide-border">
              {order.items.map((item) => (
                <li key={item.id} className="flex py-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-center">
                    <div className="flex justify-between text-sm font-medium">
                      <h3>{item.productName}</h3>
                      <p className="ml-4">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.scent.name} / {item.color.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center p-6 bg-secondary/30 rounded-b-lg">
            <Button asChild variant="outline">
              <Link href="/san-pham">Tiếp tục mua sắm</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
