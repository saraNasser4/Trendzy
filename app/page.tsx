import { Suspense } from "react";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";
import { Provider } from 'react-redux'
import store from './store/store'

export default async function Home() {
  const categoryId = process.env.FEATURED_PRODUCTS_CATEGORY_ID || ""
  
  return (
    <main>
      <Provider store={store}>
        <Slider />
        <Suspense fallback="loading...">
          <ProductList categoryId= {categoryId} limit={4} />
        </Suspense>
        <Suspense fallback="loading...">
          <Categories />
        </Suspense>
      </Provider>
    </main>
  );
}
