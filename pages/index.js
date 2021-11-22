import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useUser } from "@auth0/nextjs-auth0";
import { useSearch, useSetSearch } from "../context/SearchContext";
import { useRouter } from "next/router";

import Category from "../components/storefront/Category";
import Container from "../components/storefront/Container";
import Footer from "../components/storefront/Footer";
import Header from "../components/storefront/Header";
import Hero from "../components/storefront/Hero";
import Pagination from "../components/storefront/Pagination";
import Products from "../components/storefront/Products";
import Banner from "../components/storefront/Banner";
import Portal from "../components/portal/Portal";

export default function Home() {
  const { user: auth0User } = useUser();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showBanner, setShowBanner] = useState();
  const searchTerm = useSearch();
  const setSearchTerm = useSetSearch();
  const [portalIsOpen, setPortalIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowBanner(() => JSON.parse(localStorage.getItem("banner")) ?? true);
  }, []);

  useEffect(() => {
    localStorage.setItem("banner", showBanner);
  }, [showBanner]);

  useEffect(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });

    let realmUser = app.currentUser;
    if (!app.currentUser) {
      console.log("no user");
      const credentials = Realm.Credentials.anonymous();
      realmUser = await app.logIn(credentials);
    }

    if (auth0User) {
      const accessToken = await fetch("/api/gettoken");
      const token = await accessToken.json();
      const credentials = Realm.Credentials.jwt(token.accessToken);
      realmUser = await app.logIn(credentials);
    }

    try {
      const allProducts = await realmUser.functions.getAllProducts();
      const filteredProducts = allProducts.filter(
        (product) => product.category !== "Apparel"
      );
      setProducts(() => filteredProducts);
      const uniqueCategories = await realmUser.functions.getUniqueCategories();
      setCategories(() => uniqueCategories);
    } catch (error) {
      console.error(error);
    }

    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setPortalIsOpen(true)
    }
  }, []);

  return (
    <>
      {products && (
        <>
          {showBanner && <Banner setShowBanner={setShowBanner} />}
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
              <title>Create Next App</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-white w-full min-h-screen">
              <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <Container>
                <Hero />
                <Category
                  category="Tech Wear"
                  categories={categories}
                  productCount={`${products.length} Products`}
                />
                <Products products={products} />
                <Pagination />
              </Container>
              <Footer />
              <Portal
                open={portalIsOpen}
                onClose={() => {
                  setPortalIsOpen(false);
                  router.push("/");
                }}
                title="Order Placed!"
              >
                <p className="p-6">Thank you for your order.</p>
              </Portal>
            </div>
          </div>
        </>
      )}
    </>
  );
}
