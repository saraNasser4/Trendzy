"use client"

import { useEffect, useState } from "react"
import useWixClient from "../hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

enum MODE {
  LOGIN = "LOGIN",
  SIGN_IN = "SIGN_IN",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERFICATION = "EMAIL_VERFICATION",
}

export default function Login() {
  const wixClient = useWixClient()
  const pathName = window.location.href
  const router = useRouter()
  const isLoggedIn = wixClient.auth.loggedIn()

  console.log(isLoggedIn)

  const [mode, setMode] = useState(MODE.LOGIN)
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  
  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      let response;

      switch(mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({ email, password })
          break;
        case MODE.SIGN_IN:
          response = await wixClient.auth.register({ email, password, profile: { nickname: username } })
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(email, pathName)
          setMessage("Password reset email sent. Please check your email")
          break;
        case MODE.EMAIL_VERFICATION:
          response = await wixClient.auth.processVerification({ verificationCode: emailCode })
          break;
        default:
          break;
      }
      console.log(response)
      
      switch(response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.")
          
          const sessionToken = response?.data?.sessionToken
          if (sessionToken) {
            console.log("tokens")
            try {
              const tokens = await wixClient.auth.getMemberTokensForDirectLogin(sessionToken)
              console.log("tokens")

              if(tokens) {
                Cookies.set("refreshToken", JSON.stringify(tokens?.refreshToken))
                Cookies.set("accessToken", JSON.stringify(tokens?.accessToken))
                wixClient.auth.setTokens(tokens)
                router.push("/")
              } else {
                setError("Failed to retrieve tokens.")
              }

            } catch (err) {
              console.error(err)
              setError("Error retrieving tokens.")
            }
          } else {
            setError("Session token is invalid or missing.");
          }   
          
          break;

        case LoginState.FAILURE:
          setMessage(response?.errorCode?.split(/(?=[A-Z])/).join(" ") || "Somthing went wrong")

          break;
        default:
          break;
      }

    }catch(err) {
      console.log(err)
      setError("Somthing went wrong!")

    } finally {
      setIsLoading(false)
    }
  }
  
  const inputStyle ="rounded-md px-3 py-2 outline-none placeholder:text-zinc-500 text-zinc-900"

  
  useEffect(() => {
    if (wixClient?.auth?.loggedIn()) router.push("/")
  }, [isLoggedIn])


  return (
    <section className='relative w-[100vhw] min-h-[80vh]'>
      {isLoading && <div className="absolute bg-black/30 top-0 bottom-0 left-0 right-0 z-50"><span className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent absolute top-1/2 left-1/2 rounded-full"></span></div>}
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl my-4 text-center capitalize">{mode.replaceAll("_", " ").toLowerCase()}</h1>
        {mode !== MODE.EMAIL_VERFICATION ? 
            <>
              {mode === MODE.SIGN_IN && <input onChange={(e)=> setUsername(e.target.value)} className={inputStyle} placeholder='Username' name="username" type="text" required />}
              <input onChange={(e)=> setEmail(e.target.value)} className={inputStyle} placeholder='Email' name="email" type="email" required />
              {(mode === MODE.SIGN_IN || mode === MODE.LOGIN) && <input onChange={(e)=> setPassword(e.target.value)} className={inputStyle} placeholder='Password' name="password" type="password" required min="8" title="Password should be more than 8 characters"/>}
              {mode === MODE.LOGIN && <button onClick={()=> setMode(MODE.RESET_PASSWORD)} className="text-sm text-start underline -mt-1 hover:text-primary">Forget Password</button>}
            </>
          : 
            <>
              <input onChange={(e)=> setEmailCode(e.target.value)} className={inputStyle} placeholder='Verfication Code' name="verfication code" type="text" required />
              <input className={inputStyle} placeholder='New Password' name="new password" type="password" required />
              <input className={inputStyle} placeholder='New Password' name="new password" type="password" required />
            </>
        }
        
        
        <button className="text-md font-medium bg-primary py-2 px-3 my-2 rounded-md hover:bg-white hover:text-primary capitalize">{mode === MODE.EMAIL_VERFICATION ? "Verify" : mode === MODE.RESET_PASSWORD ? "Reset" : mode.replaceAll("_", " ").toLowerCase()}</button>
        
        <button onClick={()=> setMode(prev => prev === MODE.SIGN_IN ? MODE.LOGIN : MODE.SIGN_IN)} className="text-sm text-start underline hover:text-primary">{mode === "SIGN_IN" ? 'Have an Account Already' : `Don't Have an Account Yet`}</button>
        <span className="text-sm md:text-[16px] text-green-400 capitalize">{message}</span>
        <span className="text-sm md:text-[16px] text-red-400 capitalize">{error}</span>
      </form>
    </section>
  )
}
