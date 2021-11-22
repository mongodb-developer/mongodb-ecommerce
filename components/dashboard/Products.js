import { useState } from "react";
import Image from "next/image";
import Portal from "../portal/Portal";
import AddProduct from "../dashboard/AddProduct";

const Products = ({ product, setProducts }) => {
  const [portalIsOpen, setPortalIsOpen] = useState(false);
  return (
    <>
      <div
        className="product grid gap-6 pr-8 grid-cols-3 items-center bg-white rounded-md shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
        onClick={() => setPortalIsOpen(true)}
      >
        <div className="flex items-end justify-end h-24 w-24 w-full bg-cover relative">
          {!product.imagePath.includes("http") ? (
            <Image
              src={product.imagePath}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="absolute z-0"
            />
          ) : (
            <div
              className="bg-contain bg-top h-64 w-64"
              style={{ backgroundImage: `url(${product.imagePath})` }}
            ></div>
          )}
        </div>
        <div>
          <h2 className="text-2xl">{product.name}</h2>
          <p className="text-sm">{product.category}</p>
        </div>
        <div className="text-2xl">${product.price}</div>
      </div>
      <Portal
        open={portalIsOpen}
        onClose={() => setPortalIsOpen(false)}
        title="Edit Product"
      >
        <AddProduct
          product={product}
          setPortalIsOpen={setPortalIsOpen}
          setProducts={setProducts}
        />
      </Portal>
    </>
  );
};

export default Products;
