"use client"

import { useState } from 'react'
import { IoBasketOutline, IoNotificationsOutline, IoPerson } from 'react-icons/io5'
import Link from 'next/link'
import CartModal from './CartModal'
import useWixClient from '../hooks/useWixClient'
import { useRouter } from 'next/navigation'

export default function NavIcons() {
    const wixClient = useWixClient();
    const router = useRouter()
    const isLoggedIn = wixClient.auth.loggedIn()
    
    if (isLoggedIn) router.push("/")

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    

    const btnStyle = 'relative cursor-pointer p-2 rounded-full transition-colors duration-200 hover:text-primary'
    const icons = [
        { icon: <IoNotificationsOutline size={25} /> },
        { icon: <IoPerson size={25}/>, fun: 'profile'},
        { icon: <IoBasketOutline size={25} />, fun: 'cart' }
    ]

    const handleProfile = ()=> {
        if(isLoggedIn) { 
            setIsProfileOpen(prev => !prev) 
            if(isCartOpen) setIsCartOpen(false)
        }
    }

    return (
        <div className='hidden sm:flex gap-4 relative'>
            <button className={btnStyle}>
                <IoNotificationsOutline size={25} />
            </button>

            <Link href={!isLoggedIn ? '/login': '/'} onClick={handleProfile} className={btnStyle}>
                <IoPerson size={25} />
            </Link>

            <button className={btnStyle}>
                <IoBasketOutline size={25} />
            </button>
            {/* {icons.map((ic, index)=> {
                const fun = ()=> {
                    if(!ic.fun) return
                    if(ic.fun === "profile"){
                        setIsProfileOpen(prev => !prev) 
                        if(isCartOpen) setIsCartOpen(false) 
                    } else {
                        setIsCartOpen(prev => !prev) 
                        if(isProfileOpen) setIsProfileOpen(false)
                    }
                } 
                return(
                    <Link href={!isLoggedIn && ic.fun === "profile" ? '/login' :'/'} key={index} className={`${btnStyle} ${ic.fun === 'cart' ? '' : ' hover:border hover:p-[7.2px] hover:border-primary'}`} onClick={fun}>
                        {ic.icon}
                        {ic.fun === 'cart' && <span className='absolute -top-1 bg-red-600 !transition-none text-white px-1.5 rounded-full z-[-1]'>2</span>}
                    </Link> 
                )
            })} */}

            {(isProfileOpen && isLoggedIn) && 
                <div className='absolute top-12 flex flex-col gap-4 bg-zinc-800 rounded-xl p-4 shadow-xl z-20 min:w-30 [&>*]:text-start'>
                    <span className='absolute border-[14px] border-b-zinc-800 border-x-transparent border-t-transparent -top-[26px] right-2'></span>
                    <p><span className='text-primary font-medium text-[18px]'>Hi!</span> Friend</p>
                    <button onClick={async ()=> await wixClient.auth.logout(window.location.href)}>Logout</button>
                </div>
            }

            {isCartOpen && <CartModal />}
        </div>
    )
}
