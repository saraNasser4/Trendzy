"use client"

import { useState } from "react"
import { IoIosClose, IoIosMenu } from "react-icons/io";
import Link from 'next/link'
import useWixClient from "../hooks/useWixClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Menu() {
  const wixClient = useWixClient()
  const isLoggedIn = wixClient.auth.loggedIn()
  console.log(isLoggedIn)
  
  const listStyle ="hover:text-primary text-[18px]"

  const listItems = ['homePage', 'shop', 'deals', 'about', 'contact']
  const listMap = listItems.map((item, index)=> <Link onClick={()=> setOpen(false)} key={index} href={`/${index < 1 ? '' : item}`} className={listStyle}>{item}</Link>)
  const [isOpen, setIsOpen] = useState(false)
  
  const router = useRouter()
  const handleLogout = async ()=> {
    const { logoutUrl} = await wixClient.auth.logout(window.location.href)
    Cookies.remove("refreshToken")
    setIsOpen(false)
    router.push(logoutUrl)
    
}
  return (
    <>
      <button onClick={()=> setIsOpen(prev => !prev)} className="sm:hidden">
        {isOpen ? <IoIosClose size={35} /> : <IoIosMenu size={30} />}
      </button>
      
      {isOpen && (
        <div className='-z-[1] fixed bg-black/90 left-0 right-0 top-0 bottom-0 flex items-center justify-center flex-col sm:flex-row sm:top-1 sm:relative gap-4 capitalize'>
          {listMap}
          {isLoggedIn ? <button className={listStyle} onClick={handleLogout}>Logout</button> : <Link href='/login' onClick={()=> setIsOpen(prev => !prev)} className={listStyle}>Login</Link>}
        </div>
      )}

      <div className="hidden md:flex gap-3 items-center capitalize">
        {listMap}
      </div>
    </>
  )
}
