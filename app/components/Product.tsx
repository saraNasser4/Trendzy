import Image from "next/image";
import Link from "next/link";

export default function Product() {
  return (
    <div className="flex gap-x-8 gap-y-16 justifybetween flex-wrap mt-10">
        <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[46%] lg:w-[22%]">
            <div className="relative w-full h-80">
                <Image 
                    src="https://images.pexels.com/photos/20684681/pexels-photo-20684681/free-photo-of-a-close-up-of-a-flower-on-a-branch.jpeg?auto=compress&cs=tinysrgb&w=80&lazy=load" 
                    alt="product image" 
                    fill 
                    sizes="25vw" 
                    className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
                />
                <Image 
                    src="https://images.pexels.com/photos/20684681/pexels-photo-20684681/free-photo-of-a-close-up-of-a-flower-on-a-branch.jpeg?auto=compress&cs=tinysrgb&w=80&lazy=load" 
                    alt="product image" 
                    fill 
                    sizes="25vw" 
                />
            </div>
            <div className="flex justify-between sm:text-xl">
                <h4>Product Name</h4>
                <span>$45</span>
            </div>
            <p>Description</p>
            <button className="text-sm text-primary border border-primary w-max py-2 px-3 rounded-2xl hover:bg-primary hover:text-white">Add to Cart</button>
        </Link>
        <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[46%] lg:w-[22%]">
            <div className="relative w-full h-80">
                <Image 
                    src="https://images.pexels.com/photos/20684681/pexels-photo-20684681/free-photo-of-a-close-up-of-a-flower-on-a-branch.jpeg?auto=compress&cs=tinysrgb&w=80&lazy=load" 
                    alt="product image" 
                    fill 
                    sizes="25vw" 
                    className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500"
                />
                <Image 
                    src="https://images.pexels.com/photos/20684681/pexels-photo-20684681/free-photo-of-a-close-up-of-a-flower-on-a-branch.jpeg?auto=compress&cs=tinysrgb&w=80&lazy=load" 
                    alt="product image" 
                    fill 
                    sizes="25vw" 
                />
            </div>
            <div className="flex justify-between sm:text-xl">
                <h4>Product Name</h4>
                <span>$45</span>
            </div>
            <p>Description</p>
            <button className="text-sm text-primary border border-primary w-max py-2 px-3 rounded-2xl hover:bg-primary hover:text-white">Add to Cart</button>
        </Link>
    </div>
  )
}
