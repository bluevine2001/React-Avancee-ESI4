import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
import CartItem from "./CartItem";
function Order() {
  type Product = {
    id: number;
    nom: string;
    prix: number;
    imgUrl: string;
    quantity: number;
  };

  const { cart } = useContext(CartContext);
  return (
    <div>
      {cart.productTab.map((product: Product) => {
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
      <p>Total à payer : {cart.totalprice}</p>
      <PayPalScriptProvider
        options={{ "client-id": import.meta.env.VITE_CLIENT_ID }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: cart.totalprice.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order?.capture();
            const name = details?.payer.name?.given_name;
            alert("Transaction completed by " + name);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Order;
