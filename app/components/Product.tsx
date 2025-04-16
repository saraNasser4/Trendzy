import Image from "next/image";
import Link from "next/link";
import wixServer from "../lib/wixServer";
import Pagination from "./Pagination";
import AddBtn from "./AddBtn";

const PRODUCT_PER_PAGE: number = 6

export default async function Product({ categoryId, limit, searchParams, paginationAppear }: { categoryId: string, limit?: number, searchParams?: Promise<{ name: string, type: string, min: string, max: string, sort: string, page: string }>, paginationAppear: boolean }) {
    const myWixServer = await wixServer()
    const resolvedSearchParams = await searchParams
    
    const productQuery = myWixServer.products
                                .queryProducts()
                                .startsWith("name", resolvedSearchParams?.name || "")
                                .eq("collectionIds", categoryId)
                                .gt("priceData.price", Number(resolvedSearchParams?.min) || 0)
                                .lt("priceData.price", Number(resolvedSearchParams?.max) || 100000)
                                .limit(limit || PRODUCT_PER_PAGE)
                                .skip(resolvedSearchParams?.page ? parseInt(resolvedSearchParams?.page) * (limit || PRODUCT_PER_PAGE) : 0)
                                
    let response;

    try {
        if(resolvedSearchParams?.sort) {
            const [sortType, sortBy] = resolvedSearchParams?.sort?.split(" ") ?? []
            
            if(sortType === "asc" && sortBy) response = await productQuery.ascending(sortBy).find();
            if(sortType === "desc" && sortBy) response = await productQuery.descending(sortBy).find();
            if(sortType === "sort" && sortBy) response = await productQuery.find();
        
        } else{
            response =  await productQuery?.find()
        }
    } catch (err) {
        console.error(err)
        response = { items: [] }
    }
    
    const itemsList = response?.items || []
    console.log(itemsList[0])
    
    
    return (
        <div className="flex gap-x-8 gap-y-16 justifybetween flex-wrap mt-10">

            {itemsList.length > 0 ?
                <>
                    {itemsList?.map(item => {
                        const productId = item?.inventoryItemId
                        return(

                            <div key={item.name} className="w-full sm:w-[46%] lg:w-[22%] [&>:last-child]:my-5">
                                <Link href={`/${item.slug}`} className="flex flex-col gap-4">
                                    <div className="relative w-full h-80">
                                        <Image 
                                            src={item.media?.items?.[0]?.image?.url || 'https://placehold.co/600x400'} 
                                            alt={item.media?.items?.[0]?.title || 'product image'}
                                            fill 
                                            sizes="250vw" 
                                            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
                                            />
                                        <Image 
                                            src={item.media?.items?.[1]?.image?.url || 'https://placehold.co/600x400'} 
                                            alt={item.media?.items?.[1]?.title || 'product image'}
                                            fill 
                                            sizes="250vw" 
                                        />
                                    </div>
                                    <div className="flex justify-between sm:text-xl">
                                        <h4>{item.name}</h4>
                                        <span>{item?.price?.price} {item?.price?.currency}</span>
                                    </div>
                                    <p className="line-clamp-1 text-[15px] text-gray-400">{item.description}</p>
                                </Link>
                                
                                <AddBtn productId={productId} productQuantity={item?.productOptions?.[0]?.choices?.[0]?.inStock ? 1 : 0} variantId={"variantId"} />
                            </div>
                        )
                         
                    })}
                    
                    {paginationAppear && <Pagination currentPage={response?.currentPage || 0} hasPrev={response?.hasPrev()} hasNext={response?.hasNext()} />}
                </>
            : <p>There aren&apos;t any Products</p>
            }
        </div>
    )
}
