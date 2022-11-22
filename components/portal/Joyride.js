import { useState } from "react";
import { useRouter } from "next/router";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import StyledCode from "../../components/portal/StyledCode";
import allProductsSample from "../../code_snippets/allProductsSample";
import uniqueCategoriesSample from "../../code_snippets/uniqueCategoriesSample";
import productExample from "../../code_snippets/productExample";
import searchSample from "../../code_snippets/searchSample";
import datalakeSample from "../../code_snippets/datalakeSample";
import chartsIframe from "../../code_snippets/chartsIframe";
import chartsSDK from "../../code_snippets/chartsSDK";
import chartAggregation from "../../code_snippets/chartAggregation";
import dataAPIsample from "../../code_snippets/dataAPIsample";
import { useCategory } from "../../context/CategoryContext";
import { useSetSearch } from "../../context/SearchContext";
import { useSetAddProduct } from "../../context/AddProductContext";
import { CodeIcon } from "@heroicons/react/outline";
import addProductSample from "../../code_snippets/addProductSample";

const joyrideStylesExtraWide = {
  options: {
    width: "50vw",
  },
};
const joyrideStyleWide = {
  options: {
    width: "45vw",
  },
};

const joyrideSteps = [
  {
    title: "Welcome to the MongoStore!",
    target: "#joyrideHome",
    content: (
      <>
        <p>This demo includes just about every MongoDB feature!</p><br />
        <p>The MongoStore is an eCommerce demo built to demonstrate most MongoDB features.</p><br />
        <p>All products listed here, account management capabilities, shopping, and product management are powered by MongoDB. </p><br />
        <p>This app was written with Next.js. It's hosted on Vercel. And it uses MongoDB Atlas.</p><br />
        <p>This solution also features MongoDB and code integrations with 3rd party services including Auth0 (for user management), Stripe (for ecommerce), and Twilio for messaging order activity/confirmation.</p><br />
        <p>After the demonstration, you can find all the code <a href="https://github.com/mongodb-developer/mongodb-ecommerce/tree/development" target="_blank" className="text-green-500 hover:underline">here</a>. You can also hear from members of our community and customers who have built similar solutions <a href="https://http://community.mongodb.com/" target="_blank" className="text-green-500 hover:underline">here</a></p>
        <br />
        <p>Be sure to <a href="/api/auth/login" className="text-green-500 hover:underline">Login</a> before beginning the tour since we'll be accessing a secure section of the site later in the tour!</p>
      </>),
  },
  {
    title: "3rd Party Integration",
    target: "#authLogin",
    content: (
      <>
        <p>MongoDB support built-in authentication via email/password, Facebook, Google, Apple, and custom JWT authentication.</p><br />
        <p>For this demo we have implemented user authentication powered by Auth0, an industry leader in website authentication. Auth0 integrates easily with MongoDB via custom JWT authentication.</p>
      </>),
  },
  {
    title: "All Products Query",
    target: "#allProducts",
    placement: "top-start",
    placementBeacon: "top",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>Let's talk about how we are connecting to MongoDB. This application is built using Next.js and we are utilizing our `realm-web` SDK to authenticate and read / write to MongoDB.</p><br />
        <p>
          This is the query that displays the current results of all the items
          we have for sale.
        </p>
        <StyledCode codeString={allProductsSample} lang="javascript" />
      </>
    ),
  },
  {
    title: "Unique Categories Query",
    target: "#uniqueCategories",
    placement: "top-end",
    placementBeacon: "right",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>
          This is the query that provides unique categories to populate in our
          category selector menu.
        </p>
        <StyledCode codeString={uniqueCategoriesSample} lang="javascript" />
      </>
    ),
  },
  {
    title: "Search Query",
    target: "#searchQuery",
    placement: "bottom",
    placementBeacon: "bottom",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>
          This search bar lets you search across the products in our store using
          <a
            href="https://www.mongodb.com/atlas/search"
            target="_blank"
            className="text-green-500 font-bold"
          >
            &nbsp;Atlas Search
          </a>
          , our embedded full-text search solution powered by Apache Lucene.
          Notice that fuzzy search is enabled.
        </p>
        <StyledCode codeString={searchSample} lang="javascript" />
      </>
    ),
  },
  {
    title: "Search Query",
    target: "#searchQuery",
    placement: "bottom",
    placementBeacon: "bottom",
    content: (
      <>
        <div className="text-xl">
          Let's try searching for{" "}
          <span className="font-bold">
            mong<em>A</em>db
          </span>
        </div>
      </>
    ),
  },
  {
    title: "Search Query",
    target: "#searchQuery",
    placement: "bottom",
    placementBeacon: "bottom",
    styles: {
      options: {
        primaryColor: "#fff",
      },
    },
    content: (
      <>
        <div className="text-xl">...searching</div>
      </>
    ),
  },
  {
    title: "Search Query",
    target: "#allProducts",
    placement: "bottom-start",
    placementBeacon: "bottom",
    content: (
      <>
        <p>
          Our search query still works even though we misspelled the name
          because we included fuzzy matching!
        </p>
      </>
    ),
  },
  {
    title: "Product JSON Document",
    target: "#allProducts",
    placement: "bottom-start",
    placementBeacon: "bottom",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>
          This is an example of the JSON document structure for our products.
        </p>
        <StyledCode
          codeString={JSON.stringify(productExample, null, 2)}
          lang="json"
        />
      </>
    ),
  },
  {
    title: "CRUD Products",
    target: "#mainDiv",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          As you add/remove additional items to the store, it automatically
          updates the collection.
        </p>
      </>
    ),
  },
  {
    title: "CRUD Products",
    target: "#addProduct",
    placement: "left",
    placementBeacon: "right",
    content: (
      <>
        <p>Let's add a new product to the store.</p>
      </>
    ),
  },
  {
    title: "CRUD Products",
    target: "#mainDiv",
    placement: "top-start",
    placementBeacon: "right",
    styles: {
      options: {
        primaryColor: "#fff",
      },
    },
    content: (
      <>
        <p>We'll add a new item and save.</p>
      </>
    ),
  },
  {
    title: "CRUD Products",
    target: ".product:last-of-type",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>Our product was added and the collection automatically refreshed.</p><br />
        <p>Here's the code for inserting our new product:</p>
        <StyledCode codeString={addProductSample} lang="javascript" />
      </>
    ),
  },
  {
    title: "Security",
    target: "#productGrid",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>When customers add items to the cart and check out, their personal information is encrypted before the data leaves the application.</p>
        <br/>
        <p>MongoDB drivers encrypt the most sensitive fields in your documents before they leave the application. </p>
        <br/>
        <p>This ensures that data is unreadable to anyone running the database for you, or who has access to the underlying database infrastructure — this includes MongoDB SREs running the Atlas services as well as cloud provider personnel</p>
        <br/>
        <p>Traffic from clients to MongoDB clusters are encrypted in-transit using TLS (Transport Layer Security Protocol)</p>
      </>
    ),
  },
  {
    title: "Data API",
    target: "#productGrid",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesExtraWide,
    content: (
      <div className="flex flex-col gap-6">
        <p>
          In our examples, we have used the MongoDB Node.js driver to access
          our database.
        </p>
        <p>
          A brand new way to access data is through the{" "}
          <a
            href="https://docs.atlas.mongodb.com/api/data-api/"
            target="_blank"
            className="text-green-500 font-bold"
          >
            Atlas Data API
          </a>
          . No drivers needed - it works just like other REST APIs you're
          familiar with.
        </p>
        <p>
          Here is an example of what that would look like. You can also use it
          to integrate MongoDB with other services (such as Stripe or Auth0
          which we've used in this tutorial).
        </p>
        <StyledCode codeString={dataAPIsample} lang="javascript" />
      </div>
    ),
  },
  {
    title: "Atlas Data Lake",
    target: "#productGrid",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>
          Here you can see that we are bringing in data from AWS S3 buckets and
          combining it with live cluster data using{" "}
          <a
            href="https://www.mongodb.com/atlas/data-lake"
            target="_blank"
            className="text-green-500 font-bold"
          >
            &nbsp;Atlas Data Lake
          </a>
          . We’re able to federate queries using a single endpoint to combine
          data across both sources.
        </p><br />
        <p>This allows us to bring in product data from various merchants and query this data as a single source.</p>
        <StyledCode codeString={datalakeSample} lang="json" />
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#mainDiv",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          <a
            href="https://www.mongodb.com/products/charts"
            target="_blank"
            className="text-green-500 font-bold"
          >
            &nbsp;Atlas Charts
          </a>{" "}
          supports embedding charts directly within any website or application.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts - iFrame",
    target: "#dashboardCard01",
    placement: "bottom-start",
    placementBeacon: "top",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>To get up and running quickly, just use an iFrame. These can be embedded anywhere!</p>
        <StyledCode codeString={chartsIframe} lang="html" />
      </>
    ),
  },
  {
    title: "Atlas Charts - Embedding SDK",
    target: "#dashboardCard02",
    placement: "left",
    placementBeacon: "top",
    styles: joyrideStyleWide,
    content: (
      <>
        <p>For more advanced functionality, use the embedding SDK.</p>
        <StyledCode codeString={chartsSDK} lang="javascript" />
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#dashboardCard03",
    placement: "top-start",
    placementBeacon: "top",
    content: (
      <>
        <p>
          If you’ve used the SDK, like I’ve done here, you can click into any
          chart and interact with the data to focus your analysis.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#dashboardCard04",
    placement: "left",
    placementBeacon: "top",
    content: (
      <>
        <p>
          Looking at another chart in my dashboard, you’ll notice that Charts
          supports a number of chart types for different visualization needs.
          Here’s a stacked column chart.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#dashboardCard05",
    placement: "top-start",
    placementBeacon: "top",
    content: (
      <>
        <p>
          In this map, you can see a geospatial query being run using $geoNear
          to show you the order totals by location and payment type.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts Aggregation Pipeline",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesExtraWide,
    content: (
      <>
        <p>
          Here you can see aggregation pipeline built to showcase how the
          eCommerce store is doing.
        </p>
        <StyledCode codeString={chartAggregation} lang="json" />
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#timeChart",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          With one click you can modify a chart that shows you your top 10
          products in the past 3, 6, or 12 months.
        </p>
      </>
    ),
  },
  {
    title: "Explore",
    target: "#mainDiv",
    placement: "top-start",
    content: (
      <>
        <p className="pb-4">
          Throughout the site you will see code icons:
        </p>
        <button className="z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500">
          <CodeIcon className="w-5 h-5" />
        </button>
        
        <p className="pt-4">
          This will show the code snippets for the underlying code of that item.
        </p>
      </>
    ),
  },
  {
    title: "Stripe & Twilio Integraion",
    target: "#mainDiv",
    placement: "top-start",
    content: (
      <>
        <p>This site has Stripe integration at checkout and Twilio will send a text message every time an order is placed!</p>
        <h3 className="py-6 text-black font-bold">Try it out!</h3>
        <p>After the tour, add an item to your cart and use the provided credit card number to simulate an order.</p>
      </>
    ),
  },
  {
    title: "Questions?",
    target: "#mainDiv",
    placement: "top-start",
    content: (
      <>
        <p>What do you think? </p>
        <p className="pt-6">
          Interested in building out an app like this? Check out{" "}
          <a
            href="https://www.mongodb.com/atlas"
            target="_blank"
            className="text-green-500 font-bold"
          >
            MongoDB Atlas
          </a>
          !
        </p>
      </>
    ),
  },
];

const JoyrideComponent = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState(joyrideSteps);
  const [run, setRun] = useState(true);
  const router = useRouter();
  const categoryRef = useCategory();
  const setSearchTerm = useSetSearch();
  const setAddProduct = useSetAddProduct();

  function handleJoyrideCallback({ action, index, status, type }) {
    if (index === 3 && action === "update" && type === "tooltip") {
      categoryRef.current.style.transform = "scale(1)";
    }

    if (index === 3 && action === "next" && type === "step:after") {
      categoryRef.current.style.transform = "scale(0)";
    }

    if (index === 4 && action === "next" && type === "step:after") {
      setTimeout(() => {
        setSearchTerm("m");
        setTimeout(() => {
          setSearchTerm("mo");
          setTimeout(() => {
            setSearchTerm("mon");
            setTimeout(() => {
              setSearchTerm("mong");
              setTimeout(() => {
                setSearchTerm("mongA");
                setTimeout(() => {
                  setSearchTerm("mongAd");
                  setTimeout(() => {
                    setSearchTerm("mongAdb");
                  }, 500);
                }, 400);
              }, 300);
            }, 500);
          }, 300);
        }, 200);
      }, 500);
    }

    if (index === 5 && action === "next" && type === "step:after") {
      router.push("/search/mongAdb");
    }

    if (index === 6 && action === "update" && type === "tooltip") {
      setTimeout(() => {
        setStepIndex((idx) => idx + 1);
      }, 3000);
    }

    if (index === 8 && action === "next" && type === "step:after") {
      router.push("/dashboard/products");
    }

    if (index === 10 && action === "next" && type === "step:after") {
      document.getElementById("addProduct").click();
    }

    if (index === 11 && action === "next" && type === "step:before") {
      setTimeout(() => {
        setAddProduct({
          name: "New Product",
          price: "",
          category: "",
        });
        setTimeout(() => {
          setAddProduct({
            name: "New Product",
            price: 49,
            category: "",
          });
          setTimeout(() => {
            setAddProduct({
              name: "New Product",
              price: 49,
              category: "T-Shirt",
            });
            setTimeout(() => {
              document.getElementById("addProductButton").click();
              setStepIndex((idx) => idx + 1);
            }, 2000);
          }, 1000);
        }, 1000);
      }, 1000);
    }

    if (index === 15 && action === "next" && type === "step:after") {
      router.push("/dashboard");
    }

    if (index === 22 && action === "next" && type === "step:before") {
      window.scrollTo(0, 0);
    }

    if (index === 23 && action === "next" && type === "step:after") {
      router.push("/");
      setSearchTerm("");
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTimeout(() => {
        setRun(() => true);
        return;
      }, 500);
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }
  }

  return (
    <Joyride
      run={run}
      steps={steps}
      showProgress={true}
      continuous={true}
      callback={handleJoyrideCallback}
      disableScrolling={true}
      stepIndex={stepIndex}
      debug={false}
      spotlightClicks={true}
      disableOverlayClose={true}
    />
  );
};

export default JoyrideComponent;
