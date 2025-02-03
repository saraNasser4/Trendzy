"use client"

import { useState } from "react"
import { IoIosClose, IoIosMenu } from "react-icons/io";
import Link from 'next/link'

export default function Menu() {
  const listItems = ['homePage', 'shop', 'deals', 'about', 'contact', 'logout']
  const listMap = listItems.map((item, index)=> <Link onClick={()=> setOpen(false)} key={index} href={`/${index < 1 ? '' : item}`} className="hover:text-primary text-[18px]">{item}</Link>)
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button onClick={()=> setOpen(prev => !prev)} className="sm:hidden">
        {open ? <IoIosClose size={35} /> : <IoIosMenu size={30} />}
      </button>
      
      {open && (
        <div className='-z-[1] fixed bg-black/90 left-0 right-0 top-0 bottom-0 flex items-center justify-center flex-col sm:flex-row sm:top-1 sm:relative gap-4 capitalize'>
          {listMap}
        </div>
      )}

      <div className="hidden md:flex gap-3 items-center capitalize">
        {listMap}
      </div>
    </>
  )
}
