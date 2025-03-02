// import { useEffect, useState } from "react";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";
// import useWixClient from "./hooks/useWixClient";
import wixServer from "./lib/wixServer";

export default async function Home() {
  const myWixServer = await wixServer()

  const res = await myWixServer.products.queryProducts().find();
  console.log(res)
  // const myWixClient = useWixClient()
  // console.log("Auth tokens:", myWixClient.auth.getTokens());
  // const [productList, setProductList] = useState<Array[]>([])
  // const [cart, setCart] = useState({})

  // useEffect(()=> {
  //   if(!myWixClient) return;

  //   const getProducts = async ()=> {
  //     try{
  //       const res = await myWixClient.products.queryProducts().find();
  //       const products = res.items;
  //       setProductList(()=> products)
  //     }catch(err) {
  //       console.error('Error fetching products:', err)
  //     }
  //   }
  //   getProducts()
  // }, [myWixClient])

  // console.log(productList)
  return (
    <main>
      <Slider />
      <ProductList />
      <Categories />
    </main>
  );
}
