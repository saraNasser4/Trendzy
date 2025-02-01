import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main>
      <Slider />
      <ProductList />
      <Categories />
    </main>
  );
}
