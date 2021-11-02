import { UserProvider } from "@auth0/nextjs-auth0";
import { CartProvider } from "../context/CartContext";
import { CategoryProvider } from "../context/CategoryContext";
import { SearchProvider } from "../context/SearchContext";
import Script from "next/script";

import "tailwindcss/tailwind.css";
import "../css/style.scss";
import JoyrideComponent from "../components/portal/Joyride";
// import '../css/shepherd.css';

function MyApp({ Component, pageProps }) {
  return (
    <div id="mainDiv">
      <UserProvider>
        <CartProvider>
          <SearchProvider>
            <CategoryProvider>
              {/* <Script 
              src="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/js/shepherd.js"
              strategy="beforeInteractive"
            ></Script> */}
              <Component {...pageProps} />
              <JoyrideComponent />
            </CategoryProvider>
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default MyApp;
