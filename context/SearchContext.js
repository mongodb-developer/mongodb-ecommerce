import { useState, createContext, useContext } from "react";

const SearchContext = createContext();
const SetSearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function useSetSearch() {
  return useContext(SetSearchContext);
}

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={searchTerm}>
      <SetSearchContext.Provider value={setSearchTerm}>
        {children}
      </SetSearchContext.Provider>
    </SearchContext.Provider>
  );
}
