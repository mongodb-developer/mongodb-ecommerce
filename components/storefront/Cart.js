import { useCart } from "../../context/CartContext";
import {
  XIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";
import CartItem from "./CartItem";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const cart = useCart();
  
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
      {cart && cart.map(item => {
        return (
          <CartItem key={item._id} product={item} />
        )
      })}
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
      <a className="flex items-center justify-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500 cursor-pointer">
        <span>Chechout</span>
        <ArrowNarrowRightIcon className="w-5 h-5" />
      </a>
    </div>
  );
};

export default Cart;
