import { useRef, createContext, useContext } from "react";

const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const categoryRef = useRef(null);

  return (
    <CategoryContext.Provider value={categoryRef}>
      {children}
    </CategoryContext.Provider>
  );
}
