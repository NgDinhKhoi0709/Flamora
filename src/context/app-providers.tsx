"use client";

import React from 'react';
import { CartProvider } from './cart-context';
import { OrderProvider } from './order-context';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <OrderProvider>
        <CartProvider>{children}</CartProvider>
    </OrderProvider>
  );
}
