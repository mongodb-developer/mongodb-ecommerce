import { useState } from "react";
import { useRouter } from "next/router";
import { CodeIcon } from "@heroicons/react/outline";
import { useCategory } from "../../context/CategoryContext";
import Portal from "../portal/Portal";
import StyledCode from "../../components/portal/StyledCode";
import allProductsSample from "../../code_snippets/allProductsSample";
import uniqueCategoriesSample from "../../code_snippets/uniqueCategoriesSample";

const Category = ({ category, categories, productCount }) => {
  const [portalOneIsOpen, setPortalOneIsOpen] = useState(false);
  const [portalTwoIsOpen, setPortalTwoIsOpen] = useState(false);
  const router = useRouter();
  const categoryRef = useCategory();
  const handleSelect = (cat) => {
    router.push({
      pathname: `/products/category/${cat}`,
    });
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <div>
            <h3 className="text-gray-700 text-2xl font-medium block mt-8">
              {category}
            </h3>
            <span className="mt-3 text-sm text-gray-500">{productCount}</span>
          </div>
          <button
            className="p-2 rounded-full bg-green-600 text-white mx-5 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500"
            onClick={() => setPortalOneIsOpen(true)}
          >
            <CodeIcon className="w-5 h-5" />
          </button>
          <Portal
            open={portalOneIsOpen}
            onClose={() => setPortalOneIsOpen(false)}
            title="All Products Query"
          >
            <StyledCode codeString={allProductsSample} lang="javascript" />
          </Portal>
        </div>
        <div className="flex items-center">
          <div className="group inline-block self-center relative">
            <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-md flex items-center min-w-32">
              <span className="pr-1 font-semibold flex-1">Categories</span>
              <span>
                <svg
                  className="fill-current h-4 w-4 transform group-hover:-rotate-180
          transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            </button>
            <ul
              id="uniqueCategories"
              ref={categoryRef}
              className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute inset-x-0 transition duration-150 ease-in-out origin-top min-w-32 z-20"
            >
              {categories &&
                categories.map((cat) => {
                  return (
                    <li
                      className="rounded-sm px-3 py-1 hover:bg-green-100 cursor-pointer"
                      key={cat}
                      onClick={() => handleSelect(cat)}
                    >
                      {cat}
                    </li>
                  );
                })}
            </ul>
          </div>
          <button
            className="z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500"
            onClick={() => setPortalTwoIsOpen(true)}
          >
            <CodeIcon className="w-5 h-5" />
          </button>
          <Portal
            open={portalTwoIsOpen}
            onClose={() => setPortalTwoIsOpen(false)}
            title="Unique Categories"
          >
            <StyledCode codeString={uniqueCategoriesSample} lang="javascript" />
          </Portal>
        </div>
      </div>
    </>
  );
};

export default Category;
