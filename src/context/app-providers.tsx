"use client";

import React from 'react';
import { CartProvider } from './cart-context';
import { OrderProvider } from './order-context';
import { AuthProvider } from './auth-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>{children}</CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

