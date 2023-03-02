import Router from "./components/Router";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "./context/user";
import { CartContextProvider } from "./context/cart";
function App() {
  //console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  return (
    <UserContextProvider>
      <CartContextProvider>
        <div className="App">
          <Navbar />
          <Router />
        </div>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
