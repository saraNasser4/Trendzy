import Product from "./Product";

export default function ProductList({ categoryId, limit }: { categoryId: string, limit: number }) {
  return (
    <div className="my-24 px-4 md:px-8 mx-auto max-w-[1550px] w-full">
        <h2 className="font-medium text-xl md:text-2xl lg:text-3xl 2xl:text-5xl">Fetures</h2>
        <Product categoryId={categoryId} limit={limit} />
    </div>
  )
}
