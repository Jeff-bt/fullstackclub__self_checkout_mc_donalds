import Image from "next/image";
import { CartContext, CartProduct } from "../contexts/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartProductItemProps {
  product: CartProduct;
}
const CartProductItem = ({ product }: CartProductItemProps) => {
  const { descreaseProductQuantity } = useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="w-32 space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => descreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button className="h-7 w-7 rounded-lg" variant="destructive">
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
