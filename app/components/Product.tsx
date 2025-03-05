import Image from "next/image";
import Link from "next/link";
import wixServer from "../lib/wixServer";

const PRODUCT_PER_PAGE: number = 20

export default async function Product({ categoryId, limit }: { categoryId: string, limit: number}) {
    const myWixServer = await wixServer()
    const res = await myWixServer.products.queryProducts().eq("collectionIds", categoryId).limit(limit || PRODUCT_PER_PAGE).find();
    const itemsList = res.items;
    

    return (
        <div className="flex gap-x-8 gap-y-16 justifybetween flex-wrap mt-10">
            {itemsList.map(item => {
                return(
                    <Link key={item.name} href={`/${item.slug}`} className="w-full flex flex-col gap-4 sm:w-[46%] lg:w-[22%]">
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
                        <button className="text-sm text-primary border border-primary w-max py-2 px-3 rounded-2xl hover:bg-primary hover:text-white">Add to Cart</button>
                    </Link>
                )
            })}
        </div>
    )
}
