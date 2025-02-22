"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";
import { Product, Restaurant } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart";
import CartSheet from "../../components/cart-sheet";

interface ProductDetailsProps {
  product: Product;
  restaurant: Pick<Restaurant, "name" | "avatarImageUrl">;
}
const ProductDetails = ({ product, restaurant }: ProductDetailsProps) => {
  const { toggleCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleDescreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    toggleCart();
  };
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-5">
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-1.5">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              height={16}
              width={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">{restaurant.name}</p>
          </div>
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-sl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={handleDescreaseQuantity}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h3 className="font-semibold">Ingredientes</h3>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à Sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
