import { useCart, useCartEmpty } from "../../context/CartContext";
import { XIcon, ArrowNarrowRightIcon } from "@heroicons/react/outline";
import CartItem from "./CartItem";
import { useUser } from "@auth0/nextjs-auth0";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const cart = useCart();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const lineItems = {
      items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      })),
    };
    const checkoutSession = await axios.post(
      "/api/checkout_sessions",
      lineItems
    );
    // console.log(checkoutSession);
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    // console.log(result);
  };

  return (
    <div
      className={`${
        isCartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 z-20`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <button className="text-gray-600 focus:outline-none">
          <XIcon
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="h-5 w-5"
          />
        </button>
      </div>
      <hr className="my-3" />
      {/* Items */}
      {cart.length > 0 ?
        cart.map((item) => {
          return <CartItem key={item._id} product={item} />;
        }) : <span className="italic">Your Cart is Empty</span>}
      {/* Bottom Menu */}
      <div className="mt-8">
        <form className="flex items-center justify-center">
          <input
            className="form-input w-48"
            type="text"
            placeholder="Add promocode"
          />
          <button className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
            <span>Apply</span>
          </button>
        </form>
      </div>
      <a
        className="flex items-center justify-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500 cursor-pointer"
        onClick={() => handleCheckout()}
      >
        <span>Chechout</span>
        <ArrowNarrowRightIcon className="w-5 h-5" />
      </a>
      <div className="pt-4">
        <h3 className="py-4 text-xl font-bold">Stripe Integration</h3>
        <p className="pb-4">The Stripe integration is in "Test" mode.</p>
        <p className="pb-4">To simulate a successful payment, use the following credit card number at checkout:</p>
        <h4 className="text-green-500 font-bold">4242 4242 4242 4242</h4>
      </div>
    </div>
  );
};

export default Cart;
