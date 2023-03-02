import { createContext, ReactNode, useReducer } from "react";

type CartItem = {
  id: number;
  nom: string;
  prix: number;
  imgUrl: string;
  quantity: number;
};
type Cart = {
  numProducts: number;
  productTab: CartItem[];
  totalprice: number;
};

type CartReducer = React.Reducer<Cart, { type: string; action: any }>;
//type CartReducer = (state: Cart, action: any) => Cart;

const defaultCart: Cart = {
  numProducts: 0,
  productTab: [],
  totalprice: 0,
};
const CartContext = createContext<any>({
  cart: defaultCart,
  setCart: () => null,
});

function reducer(state: Cart, action: any) {
  //console.log("initial state", state);
  switch (action.type) {
    case "ADD_PRODUCT": {
      const sameProduct = state.productTab.find(
        (product) => product.nom == action.product.nom
      );
      let newState = {};
      if (sameProduct) {
        sameProduct.quantity += 1;
        const updatedProducts = state.productTab.filter(
          (product) => product.id !== sameProduct.id
        );
        newState = {
          ...state,
          numProducts: state.numProducts + 1,
          productTab: [...updatedProducts, sameProduct],
          totalprice: state.totalprice + action.product.prix,
        };
      } else {
        newState = {
          ...state,
          numProducts: state.numProducts + 1,
          productTab: [...state.productTab, action.product],
          totalprice: state.totalprice + action.product.prix,
        };
      }

      console.log(newState);
      return newState;
    }
    case "REMOVE_PRODUCT": {
      console.log("initial state before remove", state);
      const multipleQtyProduct = state.productTab.find(
        (product) => product.id == action.product.id
      );
      if (multipleQtyProduct && multipleQtyProduct.quantity > 1) {
        multipleQtyProduct.quantity -= 1;
        const filteredTab = state.productTab.filter(
          (product) => product.id !== multipleQtyProduct.id
        );
        return {
          ...state,
          productTab: [...filteredTab, multipleQtyProduct],
          numProducts: state.numProducts > 0 ? state.numProducts - 1 : 0,
          totalprice:
            Math.round((state.totalprice - multipleQtyProduct.prix) * 100) /
            100,
        };
      } else {
        const filteredTab = state.productTab.filter(
          (product) => product.id !== action.product.id
        );
        console.log("filtered tab : ", filteredTab);
        return {
          ...state,
          productTab: filteredTab,
          numProducts: state.numProducts > 0 ? state.numProducts - 1 : 0,
          totalprice:
            Math.round((state.totalprice - action.product.prix) * 100) / 100,
        };
      }
    }
    case "EMPTY_CART": {
      const filteredTab: [] = [];
      return {
        ...state,
        productTab: filteredTab,
        numProducts: 0,
        totalprice: 0,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useReducer<CartReducer>(reducer, defaultCart);
  const value = { cart, setCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartContextProvider };
