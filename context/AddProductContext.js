import { useState, createContext, useContext } from "react";

const AddProductContext = createContext();
const SetAddProductContext = createContext();

export function useAddProduct() {
  return useContext(AddProductContext);
}

export function useSetAddProduct() {
  return useContext(SetAddProductContext);
}

export function AddProductProvider({ children }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
  });

  return (
    <AddProductContext.Provider value={product}>
      <SetAddProductContext.Provider value={setProduct}>
        {children}
      </SetAddProductContext.Provider>
    </AddProductContext.Provider>
  );
}
