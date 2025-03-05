import Link from 'next/link'
import Image from 'next/image'

import wixServer from '../lib/wixServer';

export default async function Categories() {
    const myWixServer = await wixServer()
    const res = await myWixServer.collections.queryCollections().find();
    const categoriesList = res.items;
    console.log(categoriesList)
    
    return (
        <div className="my-24">
            <h2 className="mx-auto px-4 md:px-8 max-w-[1550px] w-full font-medium text-xl md:text-2xl lg:text-3xl 2xl:text-5xl">Categories</h2>
            <div className="overflow-x-scroll mt-8 scrollbar-hidden">
                <div className="flex gap-8 items-center whitespace-nowrap">
                    {categoriesList.map(category => {
                        return(
                            <Link key={category._id} href={`/list?cat=${category?.slug}`} className='w-full sm:w-1/2 lg:w-1/4'>
                                <div className='flex flex-col items-center'>
                                    <Image src={category.media?.items?.[0]?.image?.url || 'https://placehold.co/600x400'} alt={`${category?.slug} image`} width={250} height={250} className=' w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-[250px] object-cover '/>
                                    <h4 className='my-4 text-center text-[17px] md:text-xl lg:text-2xl font-medium'>{category.name}</h4>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
