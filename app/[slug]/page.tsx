import ProductImages from "../components/ProductImages";
import CustomizeProduct from "../components/CustomizeProduct";
import AddProduct from "../components/AddProduct";
import wixServer from "../lib/wixServer";
import { notFound } from "next/navigation";

export default async function SinglePage({ params }: { params: { slug: string } }) {
  const myWixServer = await wixServer()
  
  const resolvedParams = await params
  const paramsSlug = resolvedParams.slug

  const products = await myWixServer.products.queryProducts().eq("slug", paramsSlug).find();
  
  if(!products.items) return notFound()
  const product = products.items[0];

  const productQuantity = product.variants?.[0].stock?.quantity
  const productId = product?.inventoryItemId



  return (
    <main className='px-4 md:px-8 mx-auto max-w-[1550px] w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative'>
      
      <div>
        <ProductImages productMedia={product.media?.items} />
      </div>
      
      <div className="xl:col-span-2">
        <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl my-4">{product.name}</h3>
        <p className="text-zinc-500 text-sm">{product.description}</p>
        <div className="my-6 text-[17px] md:text-[18px] lg:text-xl flex items-center gap-6">
          {product.ribbon === "Sale" && <p className="line-through text-zinc-500">{product.price?.currency} {product.price?.price}</p>}
          <p className="text-primary">{product.price?.currency} {product.ribbon === "Sale" ? product.price?.discountedPrice : product.price?.price}</p>
        </div>
        <CustomizeProduct productOptions={product?.productOptions || {}}/>
        <AddProduct productId={productId} productQuantity={productQuantity || 0}  />
        {product?.additionalInfoSections?.map((detail, index)=> {
          return(
            <div key={index} className="my-5">
              <h4 className="font-medium text-[18px] md:text-xl my-2 capitalize">{detail.title?.toLocaleLowerCase()}</h4>
              <p className="text-zinc-400">{detail.description}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
