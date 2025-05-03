"use client"

import { useEffect, useState } from "react"
import { wixClient } from "../lib/wixClient"
import { useAppDispatch } from "../store/hookType"
import { incrementByAmount } from "../store/counterSlice"



export default function AddBtn({ productId, productQuantity, variantId }: { productId: string, productQuantity: number, variantId?: string }) {
    const [inStock, setInStock] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
        
    const addItem = async () => {
      setIsLoading(true)
      try {
        await wixClient.currentCart.addToCurrentCart({
          lineItems:[
            {
              catalogReference: { 
                appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
                catalogItemId: productId,
                options: {
                  variantId: variantId || ''
                },
              },
              quantity: productQuantity,
            }
          ]
        })
              
        dispatch(incrementByAmount(productQuantity))
        
      } catch (err) {
        console.error('Failed to add to cart: ', err)
      }finally {
        setIsLoading(false)
      }
        
    }

    useEffect(()=>{
      if(productQuantity < 1) {
          setInStock(false)
      } else {
          setInStock(true)
      }
    },[productQuantity])

    return (
      <>
        <div className={`${isLoading ? 'flex' : 'hidden'} fixed top-0 right-0 left-0 bottom-0 bg-black/40 items-center justify-center z-50`}>
          <span className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        
        <button onClick={()=> addItem()} disabled={!inStock} className='w-full lg:max-w-fit my-5 lg:my-0 text-xl rounded-xl px-6 py-2 ring-1 ring-primary text-primary transition-all duration-200 hover:text-white hover:bg-primary disabled:cursor-not-allowed disabled:text-white disabled:bg-light-blue'>{inStock ? 'Add to Cart' : 'Sold out'}</button>
      </>
    )

}