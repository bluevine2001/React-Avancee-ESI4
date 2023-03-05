import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { Navigate } from "react-router-dom";
import Product from "./shop/Product";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Shop() {
  const [products, setProducts] = useState([] as any);
  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      let newTab: any = [];
      querySnapshot.forEach((doc) => {
        newTab.push(doc.data());
      });
      setProducts(newTab);
    };
    getProducts();
  }, []);

  const { user } = useContext(UserContext);
  console.log(products);
  //useEffect
  //console.log(products);
  if (user == undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <section className="mainSection bg-mainBg  h-[600px]"></section>
      <div className="productlists flex">
        {products.map((product: any) => (
          <Product
            key={product.nom}
            nom={product.nom}
            prix={product.prix}
            imgurl={product.imgUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
