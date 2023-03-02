import Product from "./shop/Product";

function Shop() {
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
