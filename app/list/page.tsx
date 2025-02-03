import Image from 'next/image'
import React from 'react'
import Product from '../components/Product'
import Filter from '../components/Filter'

export default function List() {
  return (
    <main className='px-4 md:px-8 mx-auto max-w-[1550px] w-full '>
      <div className='relative mb-20'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl 2xl:text-5xl sm:text-nowrap'>Grab up to 50% off on Selected Products</h2>
          <button className='bg-primary hover:bg-primary/70 rounded-xl px-5 py-2 my-4 flex mx-auto'>Buy Now</button>
        </div>
        <Image src="https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={1500} height={250} alt="background image" className='max-h-[350px] -z-[1]' />
      </div>

      <Filter />

      <div className='my-8'>
        <h3 className='font-semibold text-[18px] sm:text-xl lg:text-2xl 2xl:text-3xl'>All Products For You!</h3>
        <Product />
      </div>
    </main>
  )
}
