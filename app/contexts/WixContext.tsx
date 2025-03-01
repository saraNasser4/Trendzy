'use client'
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import { useEffect, createContext, ReactNode } from "react";
import Cookies from "js-cookie";


const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || ""

const myWixClient = createClient({
  modules: { products },
  auth: OAuthStrategy({
    clientId: clientId,
    tokens: JSON.parse(
      Cookies.get("session") || '{"accessToken": {}, "refreshToken": {}}',
    ),
  }),
});

export type wixClient = typeof myWixClient;  
export const WixClientContext = createContext(myWixClient)

export const WixContextProvider = ({ children }: { children: ReactNode })=> {
  
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
