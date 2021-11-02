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
import { useCategory } from "../../context/CategoryContext";
import { useSetSearch } from "../../context/SearchContext";
import { CodeIcon } from "@heroicons/react/outline";

const joyrideStylesWide = {
  options: {
    width: "75vw",
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
    styles: joyrideStylesWide,
    content: (
      <>
        <p>
          This is the query that displays the current results of all the items
          we have for sale:
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
    styles: joyrideStylesWide,
    content: (
      <>
        <p>
          This is the query that provides unique categories to populate in our
          category selector menu:
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
    styles: joyrideStylesWide,
    content: (
      <>
        <p>
          This search bar lets you search across the products in our store using
          Atlas Search, our embedded full-text search solution powered by Apache
          Lucene. Notice that fuzzy search is enabled.
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
        <p>Works!</p>
      </>
    ),
  },
  {
    title: "Product JSON Document",
    target: "#allProducts",
    placement: "bottom-start",
    placementBeacon: "bottom",
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
        <p>
          [<em>TODO: ADD/UPDATE/DELETE PRODUCT</em>]
        </p>
      </>
    ),
  },
  {
    title: "Atlas Data Lake",
    target: "#productGrid",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesWide,
    content: (
      <>
        <p>
          Here you can see that we are bringing in data from AWS S3 buckets and
          combining it with live cluster data using Atlas Data Lake. We’re able
          to federate queries using a single endpoint to combine data across
          both sources.
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
          Atlas Charts supports embedding charts directly within any website or
          application.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesWide,
    content: (
      <>
        <p>To get up and running quickly, use an iFrame.</p>
        <StyledCode codeString={chartsIframe} lang="javascript" />
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    styles: joyrideStylesWide,
    content: (
      <>
        <p>For more advanced functionality, use the embedding SDK.</p>
        <StyledCode codeString={chartsSDK} lang="javascript" />
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          If you’ve used the SDK, like I’ve done here, I can click into any
          chart and interact with the data to focus my analysis.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          Looking at another chart in my dashboard, you’ll notice that Charts
          supports a number of chart types for different visualization needs.
          Here’s a [pick a chart type].
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          Here on the map, you can see a geospatial query being run ($geoNear)
          to show you the nearest store locations
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          Here you can see aggregation pipelines built to showcase how the
          eCommerce store is doing.
        </p>
      </>
    ),
  },
  {
    title: "Atlas Charts",
    target: "#atlasCharts",
    placement: "top-start",
    placementBeacon: "right",
    content: (
      <>
        <p>
          With one click you can run a report that shows you your sales in the
          past 3 months.
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
        <p>What do you think?</p>
        <p>
          Throughout the site you will see code icons:
          <button className="z-10 p-2 rounded-full bg-green-600 text-white mx-5 hover:bg-green-500 focus:outline-none focus:bg-green-500">
            <CodeIcon className="w-5 h-5" />
          </button>
        </p>
        <p>
          This will show the code snippets for the underlying code of that item.
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
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }

    if (index === 4 && action === "next" && type === "step:after") {
      router.push("/search/mAngodb");
    }

    if (index === 5 && action === "update" && type === "tooltip") {
      setTimeout(() => {
        setStepIndex((idx) => idx + 1);
      }, 4000);
    }

    if (index === 7 && action === "next" && type === "step:after") {
      router.push("/dashboard/products");
    }

    if (index === 10 && action === "next" && type === "step:after") {
      router.push("/dashboard");
    }

    if (index === 18 && action === "next" && type === "step:after") {
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
    />
  );
};

export default JoyrideComponent;
