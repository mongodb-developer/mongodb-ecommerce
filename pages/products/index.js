import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { useUser } from "@auth0/nextjs-auth0";
import { useSearch, useSetSearch } from "../../context/SearchContext";

import Category from "../../components/storefront/Category";
import Container from "../../components/storefront/Container";
import Footer from "../../components/storefront/Footer";
import Header from "../../components/storefront/Header";
import Pagination from "../../components/storefront/Pagination";
import Products from "../../components/storefront/Products";

export default function Home() {
  const { user: auth0User } = useUser();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchTerm = useSearch();
  const setSearchTerm = useSetSearch();

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
      console.log("auth0 user");
      const accessToken = await fetch("/api/gettoken");
      const token = await accessToken.json();
      const credentials = Realm.Credentials.jwt(token.accessToken);
      realmUser = await app.logIn(credentials);
    }

    try {
      const allProducts = await realmUser.functions.getAllProducts();
      setProducts(() => allProducts);
      const uniqueCategories = await realmUser.functions.getUniqueCategories();
      setCategories(() => uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Container>
          <Category
            category="All Products"
            categories={categories}
            productCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
