"use client"

import { useEffect, useState } from 'react'
import { IoBasketOutline, IoNotificationsOutline, IoPerson } from 'react-icons/io5'
import Link from 'next/link'
import CartModal from './CartModal'
import useWixClient from '../hooks/useWixClient'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function NavIcons() {
    const wixClient = useWixClient();
    const router = useRouter()
    const isLoggedIn = wixClient.auth.loggedIn()
    
    if (isLoggedIn) router.push("/")

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    

    
    const handleProfile = ()=> {
        if(isCartOpen) setIsCartOpen(false)
            setIsProfileOpen(prev => !prev) 
    }
    
    const handleCart = ()=> {
        if(isProfileOpen) setIsProfileOpen(false)
            setIsCartOpen(prev => !prev) 
    }
    
    const handleLogout = async ()=> {
        const { logoutUrl} = await wixClient.auth.logout(window.location.href)
        Cookies.remove("refreshToken")
        setIsProfileOpen(false)
        router.push(logoutUrl)
        console.log(logoutUrl)
        
    }
    
    const btnStyle = 'relative cursor-pointer p-2 rounded-full transition-colors duration-200 hover:text-primary'
    useEffect(() => {
    if (wixClient?.auth?.loggedIn()) {
        router.push("/")
    }
    }, [wixClient])


    return (
        <div className='hidden sm:flex gap-4 relative'>
            <button className={btnStyle}>
                <IoNotificationsOutline size={25} />
            </button>

            {!isLoggedIn ? (
                <Link href='/login' className={btnStyle}>
                    <IoPerson size={25} />
                </Link>
            ) : (
                <button onClick={handleProfile} className={btnStyle}>
                    <IoPerson size={25} />
                </button>
            )}

           {isProfileOpen && 
                <div className='absolute top-12 flex flex-col gap-4 bg-zinc-800 rounded-xl p-4 shadow-xl z-20 min:w-30 [&>*]:text-start'>
                    <span className='absolute border-[14px] border-b-zinc-800 border-x-transparent border-t-transparent -top-[26px] right-2'></span>
                    <p><span className='text-primary font-medium text-[18px]'>Hello!</span> {isLoggedIn ? "Friend" : "Guest"}</p> 
                    {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                    {!isLoggedIn && <Link href="/login">Login</Link>}
                </div>
           }

            <button className={btnStyle} onClick={handleCart}>
                <span className='absolute -top-1 bg-red-600 !transition-none text-white px-1.5 rounded-full z-[-1]'>2</span>
                <IoBasketOutline size={25} />
            </button>

            {isCartOpen && <CartModal />}
        </div>
    )
}
