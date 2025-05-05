"use client"

import React, { useEffect, useState } from 'react'
import { IoBasketOutline, IoNotificationsOutline, IoPerson } from 'react-icons/io5'
import Link from 'next/link'
import Cookies from 'js-cookie'

import { useAppSelector } from '../store/hookType'
import { wixClient } from '../lib/wixClient'
import { Profile } from '../type/user'

type NavIconsProps = {
    logoutFun: ()=> void;
    isCartOpen: boolean, 
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    // userProfile: Profile | undefined 
}

const btnStyle = 'relative cursor-pointer p-2 rounded-full transition-colors duration-200 hover:text-primary'


export default function NavIcons({ logoutFun, isCartOpen, setIsCartOpen }: NavIconsProps) {
    
   
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(false)
    // console.log(userProfile)
    //    
    
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
        setIsLoggedIn(false)
    }
    
    const count = useAppSelector(state => state.value)
    
    // useEffect(()=> {
    //     const init = async ()=> {
    //         try {
    //            console.log(userProfile, user)
                
    //             // setIsLoggedIn(isLoggedInInit || !!userInit)
                
    //         } catch (e) {
    //             console.error('Error fetching user', e)
    //         }
    //     }
    //     init()
    // }, [userProfile, user])
    // console.log(user)
    
  useEffect(()=> {
    if ((Cookies.get("refreshToken") && Cookies.get("accessToken") !== null) || wixClient.auth.loggedIn()) {
        setIsLoggedIn(true)
    }
   
    const getMember = async ()=> {
      const { member } = isLoggedIn ? (await wixClient.members.getCurrentMember()) : {}
      const userData = member
      console.log(userData)
      
    }
    getMember()
  }, [isLoggedIn])
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
