import ProductImages from "../components/ProductImages";

export default function SinglePage() {
  return (
    <main className='px-4 md:px-8 mx-auto max-w-[1550px] w-full flex flex-col lg:flex-row gap-8'>
      <div>
        <ProductImages />
      </div>
      <div>Text</div>
    </main>
  )
}
