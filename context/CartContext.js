import * as Realm from "realm-web";
import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect, createContext, useContext } from "react";

const testProduct = {
  _id: "612faf8905e540b8f3ffb41b",
  name: "C++ Hoodie",
  price: 49,
  category: "T-Shirt",
  image: "/images/cplusplus.jpg",
  qty: 1,
};

const CartContext = createContext();
const CartUpdateContext = createContext();
const CartAddContext = createContext();
const CartSubtractContext = createContext();
const CartDeleteContext = createContext();
const IsCartOpenContext = createContext();
const UpdateCartOpenContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function useCartUpdate() {
  return useContext(CartUpdateContext);
}

export function useCartAdd() {
  return useContext(CartAddContext);
}

export function useCartSubtract() {
  return useContext(CartSubtractContext);
}

export function useCartDelete() {
  return useContext(CartDeleteContext);
}

export function useUpdateCartOpen() {
  return useContext(UpdateCartOpenContext);
}

export function useIsCartOpen() {
  return useContext(IsCartOpenContext);
}

export function CartProvider({ children }) {
  const { user: auth0User } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [init, setInit] = useState(true);

  useEffect(async () => {
    try {
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });

      const user = app.currentUser;
      const getCart = await user.functions.getCart();
      const cartItems = getCart[0]?.cartItems;
      if (cartItems && cartItems.length > 0) setCart(cartItems);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(async () => {
    if (init) {
      setInit(false);
      return;
    }
    try {
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      let user = app.currentUser;

      const payload = {
        user_id: auth0User?.sub || "",
        cartItems: cart,
        realm_id: user.id,
      };

      await user.functions.updateCart(payload);
    } catch (error) {
      console.error(error);
    }
  }, [cart]);

  function handleCartUpdate(product, qty = 1) {
    setCart((ct) => {
      const i = ct.findIndex((item) => item._id === product._id);
      if (i > -1) {
        const update = ct.map((item) => {
          if (item._id === product._id) {
            return { ...item, qty: item.qty + qty };
          } else {
            return { ...item };
          }
        });
        return update;
      } else {
        return [...ct, { ...product, qty: qty }];
      }
    });
  }

  function handleCartAdd(product) {
    setCart((ct) => {
      const update = ct.map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      return update;
    });
  }

  function handleCartSubtract(product) {
    setCart((ct) => {
      const update = ct.map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return { ...item };
        }
      });
      return update;
    });
  }

  function handleCartDelete(product) {
    setCart((ct) => ct.filter((item) => item._id !== product._id));
  }

  function handleUpdateCartOpen() {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <CartContext.Provider value={cart}>
      <CartUpdateContext.Provider value={handleCartUpdate}>
        <CartAddContext.Provider value={handleCartAdd}>
          <CartSubtractContext.Provider value={handleCartSubtract}>
            <CartDeleteContext.Provider value={handleCartDelete}>
              <IsCartOpenContext.Provider value={isCartOpen}>
                <UpdateCartOpenContext.Provider value={handleUpdateCartOpen}>
                  {children}
                </UpdateCartOpenContext.Provider>
              </IsCartOpenContext.Provider>
            </CartDeleteContext.Provider>
          </CartSubtractContext.Provider>
        </CartAddContext.Provider>
      </CartUpdateContext.Provider>
    </CartContext.Provider>
  );
}
