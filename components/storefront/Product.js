import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, CodeIcon } from "@heroicons/react/outline";
import Portal from "../portal/Portal";
import StyledCode from "../../components/portal/StyledCode";
import {
  useCartUpdate,
  useIsCartOpen,
  useUpdateCartOpen,
} from "../../context/CartContext";

const Product = ({ product }) => {
  const [portalIsOpen, setPortalIsOpen] = useState(false);
  const handleCartUpdate = useCartUpdate();
  const isCartOpen = useIsCartOpen();
  const setIsCartOpen = useUpdateCartOpen();

  const updateCart = () => {
    handleCartUpdate(product);
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
    <div className="relative">
      <Link href={`/products/${product._id}`}>
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition">
          <div className="flex items-end justify-end h-56 w-full bg-cover relative">
            <Image
              src={product.imagePath}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="absolute z-0"
            />
          </div>
          <div className="px-5 py-3">
            <h3 className="text-gray-700 uppercase font-medium w-3/5">
              {product.name}
            </h3>
            <span className="text-gray-500 mt-2">${product.price}</span>
          </div>
        </div>
      </Link>
      <button
        className="absolute z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500 top-52 right-12"
        onClick={() => setPortalIsOpen(true)}
      >
        <CodeIcon className="w-5 h-5" />
      </button>
      <Portal
        open={portalIsOpen}
        onClose={() => setPortalIsOpen(false)}
        title="Product JSON"
      >
        <StyledCode
          codeString={JSON.stringify(product, null, "\t")}
          lang="json"
        />
      </Portal>
      <button
        onClick={updateCart}
        className="addToCart absolute z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500 top-52 right-0"
      >
        <ShoppingCartIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Product;
