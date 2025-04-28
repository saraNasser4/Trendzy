"use client"

import React, { useEffect } from 'react'
import useWixClient from '../hooks/useWixClient'
import Items from './Items'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../store/hookType'
import { reset } from '../store/counterSlice'
import { IoIosClose } from 'react-icons/io'


export default function CartModal({ setIsCartOpen }: { setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const wixClient = useWixClient()
  const dispatch = useAppDispatch()
  const count = useAppSelector(state => state.value)
  
  const cartItem = count > 0
  

  const btnStyle = 'px-3 py-2 rounded-lg transition-all duration-200'

  const handleClearAll = async ()=> {
    dispatch(reset())

  }
  

  useEffect(()=> {
    const getCart = async ()=> await wixClient.currentCart.getCurrentCart()
    getCart()
  }, [wixClient])

  return (      
         
    <div className={`fixed sm:absolute bg-zinc-800 rounded-xl p-4 shadow-xl z-20 w-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-auto sm:min-w-[300px] sm:left-auto sm:right-8 sm:top-20 sm:translate-x-0 sm:translate-y-0 [&>*]:mb-4`}>
      <span className='hidden sm:block absolute border-[14px] border-b-zinc-800 border-x-transparent border-t-transparent -top-[26px] right-2'></span>
      <button onClick={()=> setIsCartOpen(false)} className='sm:hidden absolute top-2 right-1 p-1 hover:text-primary duration-150'>
        <IoIosClose size={35} /> 
      </button>
      <h3 className='text-2xl font-semibold pb-6'>Shipping Cart</h3>
      {cartItem ? 
      <>
        <div className={`max-h-[330px] flex flex-col gap-6 overflow-y-scroll scroll`}>
          {[...Array(count)].map((_, ind)=> <Items key={ind} /> )}
        </div>
        <div className='flex justify-between items-center font-medium text-xl'>
            <span>Subtotal</span>
            <span>$ 30</span>
          </div>
          <p className='text-zinc-500 text-[14px]'>Shippeing and taxes calcuart</p>
      </>
      : 
        <div className='my-4 text-zinc-500 text-center text-xl'>Cart is Empty</div>
      }
        
      <div className='bg-zinc-500 h-[1px] rounded-md w-full' />
      <div className='flex justify-between'>
        <Link href={'/list?cat=all-products'} className={`${btnStyle} border border-zinc-500 hover:border-primary/70 hover:text-primary/70`}>Keep Looking</Link>
        <button onClick={handleClearAll} className={`${btnStyle} bg-primary text hover:bg-primary/70`}>Clear All</button>
      </div>
    </div>
  )
}
