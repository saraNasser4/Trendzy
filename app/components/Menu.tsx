"use client"

import React, { useState } from "react"
import { IoIosClose, IoIosMenu } from "react-icons/io";
import Link from 'next/link'
import useWixClient from "../hooks/useWixClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store/hookType";

export default function Menu({ setIsCartOpen }: { setIsCartOpen: React.FC}) {
  const wixClient = useWixClient()
  const isLoggedIn = (Cookies.get("refreshToken") && Cookies.get("accessToken") !== null ) || wixClient.auth.loggedIn()
  
  const listStyle ="hover:text-primary text-[18px]"

  const listItems = [
    { item: 'homePage', link: '/' },
    { item: 'shop', link: '/list?cat=all-products' },
    { item: 'deals', link: '/list?cat=all-products&type=New+Arrival' },
    { item: 'about', link: '/' },
    { item: 'contact', link: '/' },
  ]
  const listMap = listItems.map((itemObj, index)=> <Link onClick={()=> setIsMenueOpen(false)} key={index} href={itemObj.link} className={listStyle}>{itemObj.item}</Link>)
  const [isMenuOpen, setIsMenueOpen] = useState(false)
  
  
  const router = useRouter()
  const handleLogout = async ()=> {
    const { logoutUrl} = await wixClient.auth.logout(window.location.href)
    Cookies.remove("refreshToken")
    setIsMenueOpen(false)
    router.push(logoutUrl)
    
  }

  const handleViewCart = ()=> {
    setIsMenueOpen(prev => !prev)
    setIsCartOpen(prev => !prev)
   }

   
  const count = useAppSelector(state => state.value)

  return (
    <>
      <button onClick={()=> setIsMenueOpen(prev => !prev)} className="sm:hidden">
        {isMenuOpen ? <IoIosClose size={35} /> : <IoIosMenu size={30} />}
      </button>
      
      {isMenuOpen && (
        <div className='-z-[1] fixed bg-black/90 left-0 right-0 top-0 bottom-0 flex items-center justify-center flex-col sm:flex-row sm:top-1 sm:relative gap-4 capitalize md:hidden'>
          {listMap}
          {isLoggedIn ? <button className={listStyle} onClick={handleLogout}>Logout</button> : <Link href='/login' onClick={()=> setIsMenueOpen(prev => !prev)} className={listStyle}>Login</Link>}
          <button onClick={handleViewCart} className='relative my-2 rounded-xl px-6 py-2 ring-1 ring-primary bg-primary transition-all duration-200 hover:text-primary hover:bg-transparent'>
            {count > 0 && 
              <span className="absolute -top-2 right-2 flex size-[16px]">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative size-[16px] rounded-full bg-red-600"></span>
              </span>
            }
            <p>View Cart</p>
          </button>
        </div>
      )}

      

      <div className="hidden md:flex gap-3 items-center capitalize">
        {listMap}
      </div>
    </>
  )
}
