import React, { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../context/user";
import LoginForm from "./LoginForm";
import Shop from "./Shop";

function Router() {
  const { user } = useContext(UserContext);
  console.log(user);
  return <div>{user == undefined ? <LoginForm /> : <Shop />}</div>;
}

export default Router;
