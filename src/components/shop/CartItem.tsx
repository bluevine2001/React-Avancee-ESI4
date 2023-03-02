import { useContext } from "react";
import { CartContext } from "../../context/cart";
function CartItem(props: any) {
  const { setCart } = useContext(CartContext);
  return (
    <li className="flex py-6 px-3 border-b-2">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={props.imgurl}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <p>{props.nom}</p>
            </h3>
            <p className="ml-4">{props.prix} €</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {props.quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                setCart({
                  type: "REMOVE_PRODUCT",
                  product: { id: props.id, prix: props.prix },
                });
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
