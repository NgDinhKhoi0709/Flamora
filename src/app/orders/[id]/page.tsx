import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { getOrderByIdForUser } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const [{ id }, query, session] = await Promise.all([
    params,
    searchParams,
    getServerSession(authOptions),
  ]);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    notFound();
  }

  const order = await getOrderByIdForUser({
    id,
    userId,
    isAdmin: (session?.user as any)?.role === "admin",
  });

  if (!order) {
    notFound();
  }

  const isSuccess = query.success === "true";

  return (
    <div className="bg-secondary/50 min-h-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          {isSuccess && (
            <CardHeader className="text-center items-center p-8 bg-green-50 rounded-t-lg">
              <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
              <CardTitle className="font-headline text-3xl text-green-800">
                Thank you for your order
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Your order has been received and is being processed.
              </p>
            </CardHeader>
          )}

          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Order ID:{" "}
                  <span className="font-mono text-primary">{order.id}</span>
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                  <p>
                    <strong>Total:</strong>{" "}
                    <span className="font-semibold text-foreground">
                      {formatPrice(order.total)}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Shipping information
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{order.customer.name}</p>
                  <p>{order.customer.phone}</p>
                  <p>{order.customer.address}</p>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <h3 className="font-semibold text-lg mb-4">Order details</h3>
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
                      {item.scent.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center p-6 bg-secondary/30 rounded-b-lg">
            <Button asChild variant="outline">
              <Link href="/san-pham">Continue shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
