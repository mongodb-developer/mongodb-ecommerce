import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSearch, useSetSearch } from "../../context/SearchContext";
import * as Realm from "realm-web";
import Category from "../../components/storefront/Category";
import Container from "../../components/storefront/Container";
import Footer from "../../components/storefront/Footer";
import Header from "../../components/storefront/Header";
import Pagination from "../../components/storefront/Pagination";
import Products from "../../components/storefront/Products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { query } = useRouter();
  const searchTerm = useSearch();
  const setSearchTerm = useSetSearch();

  useEffect(async () => {
    if (query.term) {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const searchProducts = await user.functions.searchProducts(query.term);
        setProducts(() => searchProducts);
        setSearchTerm(() => query.term);
      } catch (error) {
        console.error(error);
      }
    }
  }, [query]);

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
            category={`Results for: "${query?.term}"`}
            categoryCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </div>
  );
}
