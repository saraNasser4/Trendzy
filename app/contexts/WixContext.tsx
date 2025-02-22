'use client'
import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { useEffect, createContext, ReactNode } from "react";
import Cookies from "js-cookie";


const myWixClient = createClient({
  modules: { members },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
  }),
});

export type WixClient = typeof myWixClient;
export const WixClientContext = createContext(myWixClient)


export const WixContextProvider = ({children}: { children: ReactNode })=> {
  useEffect(()=> {
    const session = Cookies.get("session")
    if(session) myWixClient.auth.setTokens(JSON.parse(session))
  }, [])

  return (
    <WixClientContext.Provider value={myWixClient}>
      {children}
    </WixClientContext.Provider>
  )
}

