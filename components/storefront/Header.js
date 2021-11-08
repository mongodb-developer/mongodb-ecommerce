import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import {
  ShoppingCartIcon,
  MenuIcon,
  SearchIcon,
  CodeIcon,
} from "@heroicons/react/outline";
import Cart from "./Cart";
import UserMenu from "../dashboard/header/UserMenu";
import { useIsCartOpen, useUpdateCartOpen } from "../../context/CartContext";
import Portal from "../portal/Portal";
import StyledCode from "../../components/portal/StyledCode";
import searchSample from "../../code_snippets/searchSample";

const Header = ({ searchTerm, setSearchTerm }) => {
  const { user: auth0User, error, isLoading } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalIsOpen, setPortalIsOpen] = useState(false);
  const [autoComplete, setAutoComplete] = useState([]);
  const isCartOpen = useIsCartOpen();
  const setIsCartOpen = useUpdateCartOpen();

  useEffect(async () => {
    if (searchTerm.length) {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const realmUser = await app.logIn(credentials);
        const searchAutoComplete = await realmUser.functions.searchAutoComplete(
          searchTerm
        );
        setAutoComplete(() => searchAutoComplete);
      } catch (error) {
        console.error(error);
      }
    } else {
      setAutoComplete([]);
    }
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchTerm("");
    router.push({
      pathname: `/search/${searchTerm}`,
    });
  };

  const handleSelect = (id) => {
    setSearchTerm("");
    router.push({
      pathname: `/products/${id}`,
    });
  };

  return (
    <>
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
                MongoStore
              </div>
            </Link>

            <div className="flex items-center justify-end w-full gap-4">
              <UserMenu />
              <button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
                <ShoppingCartIcon
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="h-5 w-5"
                />
              </button>

              <div className="flex sm:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <nav
            className={`${
              isMenuOpen ? "" : "hidden"
            } sm:flex sm:justify-center sm:items-center mt-4`}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/">Home</Link>
              </div>
              <div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                <Link href="/products">Shop</Link>
              </div>
              <div
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                <Link href="/products/category">Categories</Link>
              </div>
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Contact
              </a>
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                About
              </a>
            </div>
          </nav>

          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5" />
            </span>
            <form onSubmit={handleSubmit}>
              <input
                id="searchQuery"
                className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </form>
            <span className="absolute inset-y-0 right-0 flex items-center">
              <button
                className="z-10 p-2 rounded-full bg-green-600 text-white m-5 hover:bg-green-500 focus:outline-none focus:bg-green-500"
                onClick={() => setPortalIsOpen(true)}
              >
                <CodeIcon className="w-5 h-5" />
              </button>
            </span>
            <Portal
              open={portalIsOpen}
              onClose={() => setPortalIsOpen(false)}
              title="Atlas Search Query with Fuzzy Matching"
            >
              <StyledCode codeString={searchSample} lang="javascript" />
            </Portal>
            {autoComplete.length > 0 && (
              <ul className="absolute inset-x-0 top-full bg-green-200 border border-green-500 rounded-md z-20">
                {autoComplete.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="px-4 py-2 hover:bg-green-300 cursor-pointer"
                      onClick={() => handleSelect(item._id)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </header>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>
  );
};

export default Header;
