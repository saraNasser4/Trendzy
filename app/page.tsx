import { Suspense } from "react";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";

export default async function Home() {
  const categoryId = process.env.FEATURED_PRODUCTS_CATEGORY_ID || ""
  
  return (
    <main>
      <Slider />
      <Suspense fallback="loading...">
        <ProductList categoryId= {categoryId} limit={4} />
      </Suspense>
      <Suspense fallback="loading...">
        <Categories />
      </Suspense>
    </main>
  );
}
