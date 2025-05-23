"use client" 
import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'
import SearchForm from './SearchForm'
import NavIcons from './NavIcons'
import { useEffect, useState } from 'react'
import CartModal from './CartModal'
import { wixClient } from '../lib/wixClient'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Profile } from '../type/user'


export default function NavBar() {
  // console.log(userProfile)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()
  const logout = async ()=> {
          const { logoutUrl} = await wixClient.auth.logout(window.location.href)
          Cookies.remove("refreshToken")
          Cookies.remove("accessToken")
          router.push(logoutUrl)
  }
    
  
  return (
    <nav className='h-20 px-4 md:px-8 mx-auto max-w-[1550px] w-full flex items-center justify-between [&>*]:items-center relative z-50'>
      <Link href='/'>
        <Image src='/logo.png' width={160} height={18} alt='logo' priority={true} />
      </Link>
      <Menu logoutFun={logout} setIsCartOpen={setIsCartOpen} />  
      <SearchForm />
      <NavIcons logoutFun={logout} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} />}
    </nav>
  )
}
