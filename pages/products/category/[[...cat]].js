import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import Category from "../../../components/storefront/Category";
import Container from "../../../components/storefront/Container";
import Footer from "../../../components/storefront/Footer";
import Header from "../../../components/storefront/Header";
import Pagination from "../../../components/storefront/Pagination";
import Products from "../../../components/storefront/Products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { query } = useRouter();

  useEffect(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      let getProducts;
      if (query.cat) {
        getProducts = await user.functions.getProductsByCategory(query.cat);
        setCategoryName(() => query.cat);
      } else {
        getProducts = await user.functions.getAllProducts();
        setCategoryName(() => "All Products");
      }
      setProducts(() => getProducts);
      const uniqueCategories = await user.functions.getUniqueCategories();
      setCategories(() => uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen flex flex-col h-screen">
        <Header />
        <Container>
          <Category
            category={categoryName}
            categories={categories}
            productCount={`${products.length} Products`}
          />
          <Products products={products} />
          <Pagination />
        </Container>
        <Footer />
      </div>
    </>
  );
}
