import { useContext } from "react";
import { UserContext } from "../context/user";
import LoginForm from "./LoginForm";
import Shop from "./Shop";
import { Routes, Route } from "react-router-dom";
import Order from "./shop/Order";

function Router() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      {/* 
      {user == undefined ? <LoginForm /> : <Shop />} */}
    </div>
  );
}

export default Router;
