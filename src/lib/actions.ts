"use server";

import { z } from "zod";
import { generateScentNarrative } from "@/ai/flows/generate-scent-narrative";
import { CartItem, Order } from "@/types";

const checkoutSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự."),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ."),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự."),
});

export async function handleCheckout(
  cartItems: CartItem[],
  total: number,
  formData: FormData
) {
  const rawFormData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };

  const validatedFields = checkoutSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real app, you would save this to a database.
  // Here, we're just creating a mock order object.
  const order: Omit<Order, 'id'> = {
    customer: validatedFields.data,
    items: cartItems,
    total: total,
    createdAt: Date.now(),
    status: 'pending',
  };
  
  const orderId = `FLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  console.log("Mock Order Created:", { id: orderId, ...order });

  return {
    success: true,
    orderId: orderId,
    orderData: { id: orderId, ...order }
  };
}


const scentNarrativeSchema = z.object({
  topNotes: z.string().min(1, 'Ghi chú hàng đầu là bắt buộc'),
  midNotes: z.string().min(1, 'Ghi chú giữa là bắt buộc'),
  baseNotes: z.string().min(1, 'Ghi chú cơ sở là bắt buộc'),
});

export async function generateNarrativeAction(prevState: any, formData: FormData) {
    const validatedFields = scentNarrativeSchema.safeParse({
        topNotes: formData.get('topNotes'),
        midNotes: formData.get('midNotes'),
        baseNotes: formData.get('baseNotes'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Dữ liệu nhập không hợp lệ.',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const result = await generateScentNarrative(validatedFields.data);
        return {
            message: 'Tạo câu chuyện thành công.',
            narrative: result.narrative,
        }
    } catch (error) {
        console.error(error);
        return {
            message: 'Đã có lỗi xảy ra khi tạo câu chuyện.',
        }
    }
}
