import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, CodeIcon } from "@heroicons/react/outline";
import Portal from "../portal/Portal";
import StyledCode from '../../components/portal/StyledCode';
import { useCartUpdate, useIsCartOpen, useUpdateCartOpen } from "../../context/CartContext";

const Product = ({ product }) => {
  const [portalIsOpen, setPortalIsOpen] = useState(false);
  const handleCartUpdate = useCartUpdate();
  const isCartOpen = useIsCartOpen();
  const setIsCartOpen = useUpdateCartOpen();

  const updateCart = () => {
    handleCartUpdate(product);
    if(!isCartOpen) setIsCartOpen();
  }

  return (
    <div className="relative">
      <Link href={`/products/${product._id}`}>
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition">
          <div className="flex items-end justify-end h-56 w-full bg-cover relative">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="absolute z-0"
            />
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700 uppercase">{product.name}</h3>
            <span className="text-gray-500 mt-2">${product.price}</span>
          </div>
        </div>
      </Link>
      <button 
        className="absolute z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500 bottom-14 right-12"
        onClick={() => setPortalIsOpen(true)}
      >
        <CodeIcon className="w-5 h-5" />
      </button>
      <Portal open={portalIsOpen} onClose={() => setPortalIsOpen(false)} title="Product JSON">
        <StyledCode codeString={JSON.stringify(product, null, '\t')} lang="json" />
      </Portal>
      <button onClick={updateCart} className="absolute z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500 bottom-14 right-0">
        <ShoppingCartIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Product;
