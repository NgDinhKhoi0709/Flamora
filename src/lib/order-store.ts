import "server-only";

import { CartItem, Order } from "@/types";
import { prisma } from "@/lib/prisma";

type OrderWithItems = Awaited<ReturnType<typeof findOrderByIdForUser>>;

function mapOrder(order: NonNullable<OrderWithItems>): Order {
  return {
    id: order.id,
    customer: {
      name: order.customerName,
      phone: order.customerPhone,
      address: order.customerAddress,
    },
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productSlug: item.productSlug,
      productImage: item.productImage,
      scent: {
        id: item.id,
        name: item.scentName,
        price: item.unitPrice,
        notes: { top: "", mid: "", base: "" },
        descriptionShort: "",
      },
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
    total: order.total,
    createdAt: order.createdAt.getTime(),
    status: order.status as Order["status"],
  };
}

export function generateOrderId() {
  return `FLM-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
}

export async function createOrder(params: {
  userId: string;
  customer: Order["customer"];
  items: CartItem[];
}) {
  const total = params.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      id: generateOrderId(),
      userId: params.userId,
      customerName: params.customer.name,
      customerPhone: params.customer.phone,
      customerAddress: params.customer.address,
      total,
      status: "pending",
      items: {
        create: params.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          productImage: item.productImage,
          scentName: item.scent.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    },
    include: { items: true },
  });

  return mapOrder(order);
}

export async function getOrdersForUser(userId: string) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return orders.map(mapOrder);
}

export async function findOrderByIdForUser(params: {
  id: string;
  userId: string;
  isAdmin?: boolean;
}) {
  return prisma.order.findFirst({
    where: {
      id: params.id,
      ...(params.isAdmin ? {} : { userId: params.userId }),
    },
    include: { items: true },
  });
}

export async function getOrderByIdForUser(params: {
  id: string;
  userId: string;
  isAdmin?: boolean;
}) {
  const order = await findOrderByIdForUser(params);
  return order ? mapOrder(order) : null;
}
