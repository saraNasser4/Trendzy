"use client"

import { useEffect } from 'react'
import useWixClient from '../hooks/useWixClient'
import Items from './Items'

export default function CartModal() {
  const cartItem = true

  const wixClient = useWixClient()

  useEffect(()=> {
    const getCart = async ()=> {
      const response = await wixClient.currentCart.getCurrentCart()
      console.log(response)
    }
    getCart()
  }, [wixClient])

  return (
    <div className='min-w-[250px] absolute top-12 right-0 flex flex-col gap-3 bg-zinc-800 rounded-xl p-4 shadow-xl z-20'>
      <span className='absolute border-[14px] border-b-zinc-800 border-x-transparent border-t-transparent -top-[26px] right-2'></span>
      <h3 className='text-2xl font-semibold'>Shipping Cart</h3>
      {cartItem ? <Items /> : <div>Cart is Empty</div>}
        <div className='flex justify-between items-center font-medium text-xl'>
            <span>Subtotal</span>
            <span>$ 30</span>
        </div>
        <p className='text-zinc-500 text-[14px]'>Shippeing and taxes calcuart</p>
        <div className='flex justify-between'>
          {['View Cart', 'Clear All'].map((btn, ind)=> <button key={ind} className={`${ind === 0 ? 'border border-zinc-500 hover:border-primary/70 hover:text-primary/70' : 'bg-primary text hover:bg-primary/70'} px-3 py-2 rounded-lg transition-all duration-200`}>{btn}</button>)}
        </div>
    </div>
  )
}
