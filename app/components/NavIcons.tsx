"use client"

import React, { useEffect, useState } from 'react'
import { IoBasketOutline, IoNotificationsOutline, IoPerson } from 'react-icons/io5'
import Link from 'next/link'
import useWixClient from '../hooks/useWixClient'
import Cookies from 'js-cookie'

import { useAppSelector } from '../store/hookType'
import getUser from '../lib/getUser'
import { wixClient } from '../lib/wixClient'

const btnStyle = 'relative cursor-pointer p-2 rounded-full transition-colors duration-200 hover:text-primary'

type Profile = {
    // user: {}
    nickname?: string | null
    slug?: string | null
    photo?: { id?: string, url?: string, height?: number, width?: number, offsetX?: number | null, offsetY?: number | null }
    cover?: { id?: string, url?: string, height?: number, width?: number, offsetX?: number | null, offsetY?: number | null }
    title?: string | null

}


export default function NavIcons({ logoutFun, isCartOpen, setIsCartOpen }: { logoutFun: ()=> void, isCartOpen: boolean, setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [user, setUser] = useState<Profile>({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    
       
    
    const handleProfile = ()=> {
        if(isCartOpen) setIsCartOpen(false)
        setIsProfileOpen(prev => !prev) 
    }
    
    
    const handleCart = ()=> {
        if(isProfileOpen) setIsProfileOpen(false)
        setIsCartOpen(prev => !prev) 
    }
    
    const handleLogout = async ()=> {
        logoutFun()
        setIsProfileOpen(false)
    }
    
    const count = useAppSelector(state => state.value)
    
    useEffect(()=> {
        const init = async ()=> {
            try {
                const userInit = await getUser()
                setUser(userInit)
                console.log(userInit, user)
                
                const isLoggedInInit = (Cookies.get("refreshToken") && Cookies.get("accessToken") !== null ) || wixClient.auth.loggedIn()
                setIsLoggedIn(isLoggedInInit || !!userInit)
                
            } catch (e) {
                console.error('Error fetching user', e)
            }
        }
        init()
    }, [user])
    console.log(user)

    return (
        <div className='hidden sm:flex gap-4 relative'>
            <button className={btnStyle}>
                <IoNotificationsOutline size={25} />
            </button>

            <button onClick={handleProfile} className={btnStyle}>
                <IoPerson size={25} />
            </button>
            

           {isProfileOpen && 
                <div className='absolute top-12 -left-8 flex flex-col gap-4 bg-zinc-800 rounded-xl p-4 shadow-xl z-20 min:w-30 [&>*]:text-start'>
                    <span className='absolute border-[14px] border-b-zinc-800 border-x-transparent border-t-transparent -top-[26px] right-2'></span>
                    <p><span className='text-primary font-medium text-[18px]'>Hello!</span> {isLoggedIn ? "h" : "Guest"}</p> 
                    {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                    {!isLoggedIn && <Link href="/login" onClick={handleProfile}>Login</Link>}
                </div>
           }

            <button className={btnStyle} onClick={handleCart}>
                {count > 0 && <span className='absolute -top-1 bg-red-600 !transition-none text-white px-1.5 rounded-full z-[-1]'>{count || 0}</span>}
                <IoBasketOutline size={25} />
            </button>

        </div>
    )
}
