import { useState } from "react";
import Cart from "./shop/Cart";
import { CartContext } from "../context/cart";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const [isHidden, setIsHidden] = useState(true);
  const toggleCart = () => {
    setIsHidden(() => {
      return !isHidden;
    });
  };
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-lg">
      <div className="container flex flex-wrap items-center justify-between mx-auto relative">
        <Link
          to="/"
          className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
        >
          My React Shop
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {user !== undefined && (
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setUser(undefined);
                    navigate("/login");
                  }}
                  className="block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Déconnexion
                </a>
              </li>
            )}
            {user !== undefined && (
              <li>
                <div className="h-1 w-1 flex">
                  <a href="#" onClick={toggleCart}>
                    <svg
                      height="1.5em"
                      width="1.5em"
                      focusable="false"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-labelledby="mon-panier-13773115"
                      role="img"
                      aria-hidden="false"
                    >
                      <title id="mon-panier-13773115">Mon panier</title>
                      <path d="M21.193 8.712a2.984 2.984 0 0 0-2.986-2.726h-.952v-.751a5.255 5.255 0 0 0-10.51 0v.75h-.951a2.983 2.983 0 0 0-2.986 2.727L1.715 20.73A2.999 2.999 0 0 0 4.7 24h.005l14.599-.027a2.998 2.998 0 0 0 2.98-3.27L21.193 8.712zM8.246 5.235a3.754 3.754 0 0 1 7.508 0v.75H8.246v-.75zm11.056 17.238-14.599.025h-.002a1.496 1.496 0 0 1-1.49-1.631l1.093-12.02a1.488 1.488 0 0 1 1.49-1.36h.95V9.74a.75.75 0 0 0 1.502 0V7.487h7.508V9.74c0 .415.336.75.75.75h.002a.75.75 0 0 0 .75-.75V7.487h.951a1.49 1.49 0 0 1 1.49 1.361l1.092 11.993a1.496 1.496 0 0 1-1.488 1.632z"></path>
                    </svg>
                  </a>
                  <p className="p-1">{cart.numProducts}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
        <Cart hidden={isHidden} />
      </div>
    </nav>
  );
}

export default Navbar;
