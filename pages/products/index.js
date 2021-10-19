import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import Category from "../../components/storefront/Category";
import Container from "../../components/storefront/Container";
import Footer from "../../components/storefront/Footer";
import Header from "../../components/storefront/Header";
import Pagination from "../../components/storefront/Pagination";
import Products from "../../components/storefront/Products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    let credentials = ls.get('react_creds', true)
    console.log("credentials: " + credentials)
    if(!credentials) {
      credentials = Realm.Credentials.anonymous();
      ls.set("react_creds", credentials)
    }
    try {
      const user = await app.logIn(credentials);
      const allProducts = await user.functions.getAllProducts();
      setProducts(() => allProducts);
      const uniqueCategories = await user.functions.getUniqueCategories();
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
        <Header />
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
