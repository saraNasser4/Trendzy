"use client"

import { useState } from "react"

enum MODE {
  LOGIN = "LOGIN",
  SIGN_IN = "SIGN_IN",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERFICATION = "EMAIL_VERFICATION",
}

export default function Login() {
  const [mode, setMode] = useState(MODE.EMAIL_VERFICATION)

  

  const inputStyle ="rounded-md px-3 py-2 outline-none placeholder:text-zinc-500 text-zinc-900"

  return (
    <section className='relative w-[100vhw] min-h-[80vh]'>
      <form className='flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl my-4 text-center capitalize">{mode.replaceAll("_", " ").toLowerCase()}</h1>
        {mode !== MODE.EMAIL_VERFICATION ? 
            <>
              {mode === MODE.SIGN_IN && <input className={inputStyle} placeholder='Username' name="username" type="text" required />}
              <input className={inputStyle} placeholder='Email' name="email" type="email" required />
              {(mode === MODE.SIGN_IN || mode === MODE.LOGIN) && <input className={inputStyle} placeholder='Password' name="password" type="password" required min="8" title="Password should be more than 8 characters"/>}
              {mode === MODE.LOGIN && <button onClick={()=> setMode(MODE.RESET_PASSWORD)} className="text-sm text-start underline -mt-1 hover:text-primary">Forget Password</button>}
            </>
          : 
            <>
              <input className={inputStyle} placeholder='Verfication Code' name="verfication code" type="text" required />
              <input className={inputStyle} placeholder='New Password' name="new password" type="password" required />
              <input className={inputStyle} placeholder='New Password' name="new password" type="password" required />
            </>
        }
        
        
        <button className="text-md font-medium bg-primary py-2 px-3 my-2 rounded-md hover:bg-white hover:text-primary capitalize">{mode === MODE.EMAIL_VERFICATION ? "Verify" : mode === MODE.RESET_PASSWORD ? "Reset" : mode.replaceAll("_", " ").toLowerCase()}</button>
        
        <button onClick={()=> setMode(prev => prev === MODE.SIGN_IN ? MODE.LOGIN : MODE.SIGN_IN)} className="text-sm text-start underline hover:text-primary">{mode === "SIGN_IN" ? 'Have an Account Already' : `Don't Have an Account Yet`}</button>
      </form>
    </section>
  )
}
