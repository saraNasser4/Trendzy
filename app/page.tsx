import { Suspense } from "react";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";
import Loading from "./loading";

export default async function Home() {
  const categoryId = process.env.FEATURED_PRODUCTS_CATEGORY_ID || ""
  
  return (
    <main>
      <Slider />
      <Suspense fallback={<Loading />}>
        <ProductList categoryId= {categoryId} limit={4} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>
    </main>
  );
}
