import CartItem from "./CartItem";
import { CartContext } from "../../context/cart";
import { useContext } from "react";
function Cart(props: { hidden: boolean }) {
  type Product = {
    id: number;
    nom: string;
    prix: number;
    imgUrl: string;
    quantity: number;
  };
  const { cart, setCart } = useContext(CartContext);
  function emptyCart(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    setCart({ type: "EMPTY_CART" });
  }
  let hidden = "hidden";
  if (props.hidden == false) {
    hidden = "";
  }
  return (
    <div
      className={
        hidden + " absolute shadow-lg bg-white top-16 right-0 z-10 border-2"
      }
    >
      <div className="cartHeader flex justify-between p-2 border-b-2">
        <p className="py-1">Nombre de Produits : {cart.numProducts}</p>
        {cart.numProducts > 0 ? (
          <a
            onClick={(e) => {
              emptyCart(e);
            }}
            className="p-1 bg-red-500 rounded-lg ml-3 text-white"
          >
            vider
          </a>
        ) : (
          <a className="p-1 bg-gray-500 rounded-lg ml-3 text-white">vider</a>
        )}
      </div>

      {cart.numProducts > 0 &&
        cart.productTab.map((product: Product) => {
          return (
            <CartItem
              key={product.id}
              id={product.id}
              nom={product.nom}
              prix={product.prix}
              imgurl={product.imgUrl}
              quantity={product.quantity}
            />
          );
        })}
      <div className="cartFooter flex justify-between p-2">
        <div className="totalPrice p-1">Total : {cart.totalprice} €</div>
        {cart.numProducts > 0 ? (
          <div className="paybtn p-1 rounded-lg bg-green-500 text-white">
            Acheter
          </div>
        ) : (
          <div className="paybtn p-1 rounded-lg bg-gray-500 text-white">
            Acheter
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
