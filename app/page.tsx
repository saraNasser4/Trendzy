import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <div className="">
      <Slider />
      <ProductList />
      <Categories />
    </div>
  );
}
