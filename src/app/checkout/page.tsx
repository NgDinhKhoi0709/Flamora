// @/app/checkout/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { handleCheckout } from "@/lib/actions";
import { useOrders } from "@/context/order-context";

const checkoutSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự."),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số."),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự."),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("address", values.address);

    const result = await handleCheckout(items, totalPrice, formData);

    if (result?.errors) {
        toast({ variant: 'destructive', title: 'Lỗi', description: 'Vui lòng kiểm tra lại thông tin.' });
        // Set form errors manually if needed
        if (result.errors.name) form.setError("name", { message: result.errors.name[0] });
        if (result.errors.phone) form.setError("phone", { message: result.errors.phone[0] });
        if (result.errors.address) form.setError("address", { message: result.errors.address[0] });
    } else if (result?.success && result.orderId && result.orderData) {
        addOrder(result.orderData);
        clearCart();
        router.push(`/orders/${result.orderId}?success=true`);
    } else {
        toast({ variant: 'destructive', title: 'Lỗi', description: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
    }
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-headline">Giỏ hàng trống</h1>
        <p className="mt-4 text-lg text-muted-foreground">Bạn không có sản phẩm nào để thanh toán.</p>
        <Button asChild size="lg" className="mt-8"><Link href="/shop">Quay lại cửa hàng</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-headline text-center mb-12">Thanh toán</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-2 lg:gap-12">
            <Card>
              <CardHeader><CardTitle className="font-headline text-2xl">Thông tin giao hàng</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl><Input placeholder="Nguyễn Văn A" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl><Input placeholder="09xxxxxxxx" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl><Input placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            
            <div className="lg:row-start-1 lg:col-start-2">
              <Card className="bg-secondary/50">
                <CardHeader><CardTitle className="font-headline text-2xl">Đơn hàng của bạn</CardTitle></CardHeader>
                <CardContent>
                  <ul className="divide-y divide-border -mx-6 px-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image src={item.productImage} alt={item.productName} width={64} height={64} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium">
                              <h3>{item.productName}</h3>
                              <p className="ml-4">{formatPrice(item.unitPrice * item.quantity)}</p>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{item.scent.name} / {item.color.name}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-xs">
                            <p className="text-muted-foreground">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-6" />
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-muted-foreground"><span>Tạm tính</span><span>{formatPrice(totalPrice)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Vận chuyển</span><span>Miễn phí</span></div>
                    <Separator />
                    <div className="flex justify-between text-base font-semibold"><span>Tổng cộng</span><span>{formatPrice(totalPrice)}</span></div>
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-6" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
