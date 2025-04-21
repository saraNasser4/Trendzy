"use client" 
import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'
import SearchForm from './SearchForm'
import NavIcons from './NavIcons'
import { useState } from 'react'
import CartModal from './CartModal'

export default function NavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
    
  
  return (
    <nav className='h-20 px-4 md:px-8 mx-auto max-w-[1550px] w-full flex items-center justify-between [&>*]:items-center relative z-50'>
      <Link href='/'>
        <Image src='/logo.png' width={160} height={18} alt='logo' priority={true} />
      </Link>
      <Menu setIsCartOpen={setIsCartOpen} />  
      <SearchForm />
      <NavIcons setIsCartOpen={setIsCartOpen} />
      {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} />}
    </nav>
  )
}
