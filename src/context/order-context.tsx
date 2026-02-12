"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Order } from '@/types';

type OrderState = {
  orders: Order[];
};

type OrderAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_STATE'; payload: OrderState };

const initialState: OrderState = {
  orders: [],
};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case 'SET_STATE':
      return action.payload;
    default:
      return state;
  }
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('flamora-orders');
      if (storedState) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('flamora-orders', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save orders to localStorage", error);
    }
  }, [state]);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    const { state, dispatch } = context;

    const addOrder = (order: Order) => {
        dispatch({ type: 'ADD_ORDER', payload: order });
    }

    const getOrderById = (id: string) => {
        return state.orders.find(order => order.id === id);
    }
    
    return {
        orders: state.orders,
        addOrder,
        getOrderById
    };
};
