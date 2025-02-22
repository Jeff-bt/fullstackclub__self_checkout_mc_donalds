"use client";

import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FinishOrderDiolog from "./finish-order-diolog";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between py-5">
          <div className="">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(total)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full rounded-full"
              onClick={() => setFinishOrderDialogIsOpen(true)}
            >
              Finalizar pedido
            </Button>
            <FinishOrderDiolog
              open={finishOrderDialogIsOpen}
              onOpenChange={setFinishOrderDialogIsOpen}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
