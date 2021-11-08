import { useEffect, useState } from "react";
import {
  useAddProduct,
  useSetAddProduct,
} from "../../context/AddProductContext";

const AddProduct = ({ product, setPortalIsOpen, setProducts }) => {
  const [productName, setProductName] = useState(product?.name || "");
  const [productPrice, setProductPrice] = useState(product?.price || "");
  const [productImage, setProductImage] = useState(product?.image || "");
  const [productCategory, setProductCategory] = useState(
    product?.category || ""
  );

  const addProduct = useAddProduct();
  const setAddProduct = useSetAddProduct();

  useEffect(() => {
    if (!product) {
      setProductName(addProduct.name);
      setProductPrice(addProduct.price);
      setProductCategory(addProduct.category);
    }
  }, [addProduct]);

  useEffect(async () => {
    if (!productImage) {
      const res = await fetch("/api/getimage");
      const data = await res.json();
      setProductImage(data.webformatURL);
    }
  }, []);

  const handleNameUpdate = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceUpdate = (e) => {
    setProductPrice(e.target.value);
  };

  const handleCategoryUpdate = (e) => {
    setProductCategory(e.target.value);
  };

  const handleSetProducts = () => {
    if (product) {
      setProducts((p) => {
        return p.map((item) => {
          if (item._id === product._id) {
            return {
              ...item,
              name: productName,
              price: productPrice,
              category: productCategory,
            };
          }
          return item;
        });
      });
    } else {
      setProducts((p) => [
        ...p,
        {
          name: productName,
          price: productPrice,
          category: productCategory,
          image: productImage,
          _id: productName,
        },
      ]);
    }
    setPortalIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      <label className="flex items-center gap-8">
        <span className="w-20">Image:</span>
        {productImage && (
          <div
            className="bg-cover bg-center h-64 w-64"
            style={{ backgroundImage: `url(${productImage})` }}
          ></div>
        )}
      </label>
      <label className="flex items-center gap-8">
        <span className="w-20">Name:</span>
        <input
          type="text"
          className="w-full text-gray-800 text-lg border border-green-500 px-4 py-2"
          value={productName}
          onChange={handleNameUpdate}
        />
      </label>
      <label className="flex items-center gap-8">
        <span className="w-20">Price:</span>
        <input
          type="number"
          className="w-full text-gray-800 text-lg border border-green-500 px-4 py-2"
          value={productPrice}
          onChange={handlePriceUpdate}
        />
      </label>
      <label className="flex items-center gap-8">
        <span className="w-20">Category:</span>
        <select
          className="w-full text-gray-800 text-lg border border-green-500 px-4 py-2"
          value={productCategory}
          onChange={handleCategoryUpdate}
        >
          <option value="">Select a category</option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Hoodie">Hoodie</option>
          <option value="Sweater">Sweater</option>
          <option value="Jacket">Jacket</option>
          <option value="Mask">Mask</option>
          <option value="Hat">Hat</option>
        </select>
      </label>
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        <button
          id="addProductButton"
          className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
          onClick={() => handleSetProducts()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
