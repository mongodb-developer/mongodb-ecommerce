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
    title: "Welcome to the Store!",
    target: "#joyrideHome",
    content: "This demo includes just about every MongoDB feature!",
  },
  {
    title: "All Products Query",
    target: "#allProducts",
    placement: "top-start",
    placementBeacon: "top",
    styles: joyrideStylesExtraWide,
    content: (
      <>
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
            m<em>A</em>ngoDB
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
    content: (
      <>
        <p>Our product was added and the collection automatically refreshed.</p>
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
          In our examples, we have used the MongoDB JavaScript driver to access
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
        </p>
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
        <p>To get up and running quickly, just use an iFrame.</p>
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
    title: "Questions?",
    target: "#mainDiv",
    placement: "top-start",
    content: (
      <>
        <p>
          Throughout the site you will see code icons:
          <button className="z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500">
            <CodeIcon className="w-5 h-5" />
          </button>
        </p>
        <p>
          This will show the code snippets for the underlying code of that item.
        </p>
        <p>What do you think? </p>
        <p className="pt-6">
          Interested in building out an app like this? Check out{" "}
          <a
            href="https://www.mongodb.com/atlas"
            target="_blank"
            className="text-green-500 font-bold"
          >
            &nbsp;MongoDB Atlas
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
    if (index === 2 && action === "update" && type === "tooltip") {
      categoryRef.current.style.transform = "scale(1)";
    }

    if (index === 2 && action === "next" && type === "step:after") {
      categoryRef.current.style.transform = "scale(0)";
    }

    if (index === 3 && action === "next" && type === "step:after") {
      setTimeout(() => {
        setSearchTerm("m");
        setTimeout(() => {
          setSearchTerm("mA");
          setTimeout(() => {
            setSearchTerm("mAn");
            setTimeout(() => {
              setSearchTerm("mAng");
              setTimeout(() => {
                setSearchTerm("mAngo");
                setTimeout(() => {
                  setSearchTerm("mAngod");
                  setTimeout(() => {
                    setSearchTerm("mAngodb");
                  }, 500);
                }, 400);
              }, 300);
            }, 500);
          }, 300);
        }, 200);
      }, 500);
    }

    if (index === 4 && action === "next" && type === "step:after") {
      router.push("/search/mAngodb");
    }

    if (index === 5 && action === "update" && type === "tooltip") {
      setTimeout(() => {
        setStepIndex((idx) => idx + 1);
      }, 3000);
    }

    if (index === 7 && action === "next" && type === "step:after") {
      router.push("/dashboard/products");
    }

    if (index === 9 && action === "next" && type === "step:after") {
      document.getElementById("addProduct").click();
    }

    if (index === 10 && action === "next" && type === "step:before") {
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

    if (index === 13 && action === "next" && type === "step:after") {
      router.push("/dashboard");
    }

    if (index === 20 && action === "next" && type === "step:before") {
      window.scrollTo(0, 0);
    }

    if (index === 21 && action === "next" && type === "step:after") {
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
      scrollToFirstStep={true}
      spotlightClicks={true}
      disableOverlayClose={true}
    />
  );
};

export default JoyrideComponent;
