"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  descreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  total: number;
  totalQuantity: number;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  descreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
  totalQuantity: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    } else {
      setProducts((prevProduct) => {
        return prevProduct.map((prevProduct) => {
          if (prevProduct.id === product.id) {
            return {
              ...prevProduct,
              quantity: prevProduct.quantity + product.quantity,
            };
          }
          return prevProduct;
        });
      });
    }
  };

  const descreaseProductQuantity = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const removeProduct = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.filter((prevProduct) => prevProduct.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        descreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
