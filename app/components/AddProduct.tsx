"use client"
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

import AddBtn from './AddBtn'

export default function AddProduct({ productObj, productId, productQuantity, variantId }: { productObj: any, productId: string, productQuantity: number, variantId?: string }) {
  const [quantity, setQuantity] = useState(1)
  const total = productQuantity || 0;

  
  useEffect(()=> {
    if(total < 1) {
      setQuantity(0)
    } else setQuantity(1)
  }, [total])

  return (
    <section className='my-4'>
      <h4 className="font-medium text-[18px] md:text-xl mb-2">Choose Quantity</h4>
      <div className='flex justify-between items-start flex-col lg:flex-row gap-4'>
        <div className='flex gap-4 items-center'>
          <div className='flex gap-4 items-center px-4 py-2 rounded-xl bg-zinc-800'>
            <button onClick={()=> setQuantity(prev => prev > 1 ? prev - 1 : 1)}><FaMinus /></button>
            <span>{quantity}</span>
            <button onClick={()=> setQuantity(prev=> prev < total ? prev + 1 : total)}><FaPlus /></button>
          </div>
          { total < 1 ? 
            <p>All went for legends</p> :
            <p>Only <span className='text-primary'>{total} {total > 1 ? 'items' : 'item'}</span> left!<br /> Don&apos;t miss it</p>
          }
        </div>
        <AddBtn productObj={productObj} productId={productId} productQuantity={quantity} variantId={variantId} />
      </div>
    </section>
  )
}
