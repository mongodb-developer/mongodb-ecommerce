import { useState } from "react";
import Image from "next/image";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import {
  useCartUpdate,
  useIsCartOpen,
  useUpdateCartOpen,
} from "../../context/CartContext";

const ProductDetail = ({ product }) => {
  const [qty, setQty] = useState(1);

  const handleCartUpdate = useCartUpdate();
  const isCartOpen = useIsCartOpen();
  const setIsCartOpen = useUpdateCartOpen();

  const handleAdd = () => {
    setQty(qty + 1);
  };

  const handleSubtract = () => {
    setQty((qty) => (qty > 1 ? qty - 1 : qty));
  };

  const updateCart = () => {
    handleCartUpdate(product, qty);
    if (!isCartOpen) setIsCartOpen();
  };

  if (product.imagePath.includes("/img/")) {
    const pixabayImages = {
      pant: "https://cdn.pixabay.com/photo/2016/11/29/09/41/bag-1868758_960_720.jpg",
      hat: "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_960_720.jpg",
      shirt:
        "https://cdn.pixabay.com/photo/2017/11/14/06/15/shirt-2947548_960_720.jpg",
      shoe: "https://cdn.pixabay.com/photo/2014/09/03/20/15/shoes-434918_960_720.jpg",
      vest: "https://cdn.pixabay.com/photo/2021/02/18/15/17/men-6027492_960_720.jpg",
      jacket:
        "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_960_720.jpg",
      pullover:
        "https://cdn.pixabay.com/photo/2017/08/01/08/29/woman-2563491_960_720.jpg",
    };
    if (product.name.includes("pant")) product.imagePath = pixabayImages.pant;
    if (product.name.includes("hat")) product.imagePath = pixabayImages.hat;
    if (product.name.includes("shirt")) product.imagePath = pixabayImages.shirt;
    if (product.name.includes("shoe")) product.imagePath = pixabayImages.shoe;
    if (product.name.includes("vest")) product.imagePath = pixabayImages.vest;
    if (product.name.includes("jacket"))
      product.imagePath = pixabayImages.jacket;
    if (product.name.includes("pullover"))
      product.imagePath = pixabayImages.pullover;
    if (product.imagePath.includes("/img/"))
      product.imagePath = pixabayImages.shirt;
  }

  return (
    <div className="md:flex md:items-center flex-grow">
      <div className="w-full h-64 md:w-1/2 lg:h-96 relative">
        <Image
          src={product.imagePath}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="absolute z-0 rounded"
        />
      </div>
      <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <h3 className="text-gray-700 uppercase text-lg">{product.name}</h3>
        <span className="text-gray-500 mt-3">${product.price}</span>
        <hr className="my-3" />
        <div className="mt-2">
          <label className="text-gray-700 text-sm" htmlFor="count">
            Count:
          </label>
          <div className="flex items-center mt-1">
            <button
              onClick={handleSubtract}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <MinusCircleIcon className="w-5 h-5" />
            </button>
            <span className="text-gray-700 text-lg mx-2">{qty}</span>
            <button
              onClick={handleAdd}
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <PlusCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button
            onClick={updateCart}
            className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
