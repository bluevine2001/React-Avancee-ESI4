import { useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { Navigate } from "react-router-dom";
import Product from "./shop/Product";
/* import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore()
const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
}); */

function Shop() {
  const { user } = useContext(UserContext);
  console.log(user);
  //useEffect
  if (user == undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <section className="mainSection bg-mainBg  h-[600px]"></section>
      <Product
        nom="Pot de fleurs"
        prix={12.99}
        imgurl="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
      />
    </div>
  );
}

export default Shop;
