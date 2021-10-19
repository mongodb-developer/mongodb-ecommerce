import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import * as Realm from "realm-web";
import { useUser } from "@auth0/nextjs-auth0";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

import StyledCode from "../components/portal/StyledCode";
import allProductsSample from "../code_snippets/allProductsSample";
import uniqueCategoriesSample from "../code_snippets/uniqueCategoriesSample";
import productExample from "../code_snippets/productExample";

import Category from "../components/storefront/Category";
import Container from "../components/storefront/Container";
import Footer from "../components/storefront/Footer";
import Header from "../components/storefront/Header";
import Hero from "../components/storefront/Hero";
import Pagination from "../components/storefront/Pagination";
import Products from "../components/storefront/Products";

const joyrideStylesWide = {
  options: {
    width: "75vw",
    maxWidth: "75vw",
  },
};

const joyrideSteps = [
  {
    title: "Welcome to the Store!",
    target: "#joyrideHome",
    content: "Take a tour of the <code />",
  },
  {
    title: "All Products Query",
    target: "#allProducts",
    placement: "top-start",
    placementBeacon: "top",
    styles: joyrideStylesWide,
    content: (
      <>
        <p>This is the Quiry API call to get all products:</p>
        <StyledCode codeString={allProductsSample} lang="javascript" />
      </>
    ),
  },
  {
    title: "Unique Categories Query",
    target: "#uniqueCategories",
    placement: "top-end",
    placementBeacon: "right",
    styles: joyrideStylesWide,
    content: (
      <>
        <p>This is the Quiry API call to get all unique categories:</p>
        <StyledCode codeString={uniqueCategoriesSample} lang="javascript" />
      </>
    ),
  },
  {
    title: "Product JSON Document",
    target: "#allProducts",
    placement: "top-start",
    placementBeacon: "top",
    styles: joyrideStylesWide,
    content: (
      <>
        <p>This is the JSON document structure for the products:</p>
        <StyledCode
          codeString={JSON.stringify(productExample, null, 2)}
          lang="json"
        />
      </>
    ),
  },
];

export default function Home() {
  const { user: auth0User } = useUser();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [steps, setSteps] = useState(joyrideSteps);
  const [run, setRun] = useState(true);
  const categoryRef = useRef(null);

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
      setProducts(() => allProducts);
      const uniqueCategories = await realmUser.functions.getUniqueCategories();
      setCategories(() => uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  }, []);

  function handleJoyrideCallback({ action, index, status, type }) {
    if (index === 2 && action === "update" && type === "tooltip") {
      categoryRef.current.style.transform = "scale(1)";
    }

    if (index === 2 && action === "next" && type === "step:after") {
      categoryRef.current.style.transform = "scale(0)";
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTimeout(() => {
        setRun((run) => !run);
      }, 500);
    }
  }

  return (
    <>
      {products && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Joyride
              run={run}
              steps={steps}
              showProgress={true}
              continuous={true}
              callback={handleJoyrideCallback}
              disableScrolling={true}
            />
            <Header />
            <Container>
              <Hero />
              <Category
                category="Tech Wear"
                categories={categories}
                productCount={`${products.length} Products`}
                categoryRef={categoryRef}
              />
              <Products products={products} />
              <Pagination />
            </Container>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
