import Link from "next/link";
import { getServerSession } from "next-auth";
import { Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth-options";
import { getOrdersForUser } from "@/lib/order-store";
import { formatPrice } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const orders = userId ? await getOrdersForUser(userId) : [];

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto" />
        <h1 className="mt-4 text-4xl font-headline">No orders yet</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Orders you place will appear here.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/san-pham">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 min-h-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-headline text-center mb-12">
          Order history
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Order ID
                  </p>
                  <p className="text-sm font-medium font-mono">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Date
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Total
                  </p>
                  <p className="text-sm font-medium">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Status
                  </p>
                  <p className="text-sm font-medium capitalize">
                    {order.status}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Products:</p>
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
                  <Link href={`/orders/${order.id}`}>View details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
