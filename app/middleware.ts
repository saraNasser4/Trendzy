import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (request:NextRequest) {
    const cookies = request.cookies
    const res = NextResponse.next()

    if(cookies.get("refreshToken") && cookies.get("accessToken")) return res

    const wixClient = createClient({
        auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! })
    })


    await wixClient.auth
        .generateVisitorTokens()
        .then((tokens)=> {
            res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { maxAge: 60 * 60 * 24 })
            res.cookies.set("accessToken", JSON.stringify(tokens.accessToken))
        })
        .catch((e)=> {
            res.cookies.set("accessToken", "{}")
            res.cookies.set("refreshToken", "{}")
            console.error(e)
        })
    return res
}