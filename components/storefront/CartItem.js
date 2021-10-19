import { useCartAdd, useCartSubtract, useCartDelete } from "../../context/CartContext";
import Image from "next/image";
import {
  XIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/outline";

const CartItem = ({product}) => {
  const handleAddCart = useCartAdd();
  const handleSubtractCart = useCartSubtract();
  const handleDeleteCart = useCartDelete();

  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <Image
          src={product.image}
          height={80}
          width={80}
          objectFit="cover"
          className="rounded"
          alt={product.name}
        />
        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{product.name}</h3>
          <div className="flex items-center mt-2">
            {product.qty > 1 &&
              <button onClick={() => handleSubtractCart(product)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                <MinusCircleIcon className="h-5 w-5" />
              </button>
            }
            <button onClick={() => handleAddCart(product)} className="text-gray-500 focus:outline-none focus:text-gray-600">
              <PlusCircleIcon className="h-5 w-5" />
            </button>
            <span className="text-gray-700 mx-2">{product.qty}</span>
            <button onClick={() => handleDeleteCart(product)} className="text-gray-500 focus:outline-none focus:text-gray-600">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <span className="text-gray-600">${product.price * product.qty}</span>
    </div>
  )
}

export default CartItem
