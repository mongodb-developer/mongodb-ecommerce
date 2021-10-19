import { UserProvider } from "@auth0/nextjs-auth0";
import { CartProvider } from "../context/CartContext";
import Script from "next/script";

import "tailwindcss/tailwind.css";
import "../css/style.scss";
// import '../css/shepherd.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider>
        {/* <Script 
          src="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/js/shepherd.js"
          strategy="beforeInteractive"
        ></Script> */}
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp;
