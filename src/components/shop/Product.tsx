import { useContext } from "react";
import { CartContext } from "../../context/cart";

function Product(props: any) {
  const { cart, setCart } = useContext(CartContext);
  const addToCart = (product: any) => {
    //console.log(product);
    setCart({ type: "ADD_PRODUCT", product });
  };
  return (
    <div className="flex font-sans w-1/3 shadow-lg rounded-md m-2 border-2 min-[500]">
      <div className="flex-none w-48 relative">
        <img
          src={props.imgurl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {props.nom}
          </h1>
          <div className="text-lg font-semibold text-slate-500">
            {props.prix} €
          </div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            En stock
          </div>
        </div>
        <div className="flex space-x-4 my-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-4 py-1 font-semibold rounded-md border border-slate-200 text-slate-900 hover:text-white hover:bg-slate-900"
              type="button"
              onClick={() => {
                addToCart({
                  id: cart.numProducts,
                  nom: props.nom,
                  prix: props.prix,
                  imgUrl: props.imgurl,
                  quantity: 1,
                });
              }}
            >
              Ajouter au panier
            </button>
          </div>
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
            type="button"
            aria-label="Like"
          >
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-700">
          Free shipping on all continental US orders.
        </p>
      </form>
    </div>
  );
}

export default Product;
