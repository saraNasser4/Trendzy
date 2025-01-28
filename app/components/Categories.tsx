import Link from 'next/link'
import Image from 'next/image'

export default function Categories() {
    const categoriesList = [
        { id: 0, title: "Accesories", image: "" },
        { id: 1, title: "Home", image: "" },
        { id: 2, title: "Featured", image: "" },
        { id: 3, title: "Health", image: "" },
        { id: 4, title: "T-Shirts", image: "" },
        { id: 5, title: "Accesories", image: "" },
    ]
    return (
        <div className="my-24">
            <h2 className="mx-auto px-4 md:px-8 max-w-[1550px] w-full font-medium text-xl md:text-2xl lg:text-3xl 2xl:text-5xl">Categories</h2>
            <div className="overflow-x-scroll mt-8 scrollbar-hidden">
                <div className="flex gap-8">
                    {categoriesList.map(category => {
                        return(
                            <Link key={category.id} href="/list?cat=test" className='w-full sm:w-1/2 lg:w-1/4'>
                                <div>
                                    <Image src="https://images.pexels.com/photos/30379636/pexels-photo-30379636/free-photo-of-woman-in-winter-clothes-enjoying-snowy-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={250} height={250}  alt={`${category.title} image`} className='min-w-60 h-30'/>
                                    <h4 className='my-4 text-center text-[17px] md:text-xl lg:text-2xl font-medium'>{category.title}</h4>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
