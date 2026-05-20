"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";

import { generateScentNarrative } from "@/ai/flows/generate-scent-narrative";
import { authOptions } from "@/lib/auth-options";
import { createOrder } from "@/lib/order-store";
import { CartItem, Order } from "@/types";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits."),
  address: z.string().min(5, "Address must be at least 5 characters."),
});

const cartItemSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  productName: z.string().min(1),
  productSlug: z.string().min(1),
  productImage: z.string().min(1),
  scent: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    price: z.number().int().nonnegative(),
    notes: z.object({
      top: z.string(),
      mid: z.string(),
      base: z.string(),
    }),
    descriptionShort: z.string(),
  }),
  color: z
    .object({
      name: z.string().min(1),
      hex: z.string().min(1),
    })
    .optional(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().int().nonnegative(),
});

const cartItemsSchema = z.array(cartItemSchema).min(1);

export async function handleCheckout(
  cartItems: CartItem[],
  _total: number,
  formData: FormData,
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      authRequired: true,
    };
  }

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

  const validatedCartItems = cartItemsSchema.safeParse(cartItems);

  if (!validatedCartItems.success) {
    return {
      errors: {
        cart: ["Your cart is invalid. Please refresh and try again."],
      },
    };
  }

  const userId = (session.user as any)?.id;

  if (!userId) {
    return {
      authRequired: true,
    };
  }

  const order: Order = await createOrder({
    userId,
    customer: validatedFields.data,
    items: validatedCartItems.data,
  });

  return {
    success: true,
    orderId: order.id,
    orderData: order,
  };
}

const scentNarrativeSchema = z.object({
  topNotes: z.string().min(1, "Top notes are required."),
  midNotes: z.string().min(1, "Mid notes are required."),
  baseNotes: z.string().min(1, "Base notes are required."),
});

export async function generateNarrativeAction(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = scentNarrativeSchema.safeParse({
    topNotes: formData.get("topNotes"),
    midNotes: formData.get("midNotes"),
    baseNotes: formData.get("baseNotes"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid input.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateScentNarrative(validatedFields.data);
    return {
      message: "Narrative generated successfully.",
      narrative: result.narrative,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate the narrative.",
    };
  }
}
