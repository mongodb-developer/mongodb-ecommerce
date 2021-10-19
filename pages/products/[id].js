import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Realm from "realm-web";

import Header from "../../components/storefront/Header";
import Container from "../../components/storefront/Container";
import Footer from "../../components/storefront/Footer";
import ProductDetail from "../../components/storefront/ProductDetail";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { query } = useRouter();

  useEffect(async () => {
    if (query.id) {
      // add your Realm App Id to the .env.local file
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const oneProduct = await user.functions.getOneProduct(query.id);
        setProduct(() => oneProduct);
      } catch (error) {
        console.error(error);
      }
    }
  }, [query]);

  return (
    <>
      {product && (
        <>
          <Head>
            <title>MongoDB E-Commerce Demo - {product.name}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen flex flex-col h-screen">
            <Header />
            <Container>
              <ProductDetail product={product} />
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
