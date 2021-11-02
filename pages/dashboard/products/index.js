import { useState, useEffect } from "react";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

import Sidebar from "../../../components/dashboard/Sidebar";
import Header from "../../../components/dashboard/Header";
import Product from "../../../components/dashboard/Products";

function Products() {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const response = await fetch("/api/dashboard");
    const data = await response.json();
    setProducts(data);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div
            id="productGrid"
            className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-8 w-full bg-gray-100"
          >
            <div className="sm:flex sm:justify-end sm:items-center">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button
                  id="addProduct"
                  className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="grid gap-6 pr-8 grid-cols-5 w-full items-center">
              <h3>Image</h3>
              <h3 className="col-span-2">Product Name</h3>
              <h3 className="col-span-2">Product Price</h3>
            </div>
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;

export const getServerSideProps = withPageAuthRequired();
