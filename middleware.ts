import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (request:NextRequest) {
    const cookies = request.cookies

    const refreshToken = cookies.get("refreshToken")
    const accessToken = cookies.get("accessToken")

    const res = NextResponse.next()

    if(refreshToken && accessToken) return res

    const wixClient = createClient({
        auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! })
    })

    try {
        const tokens = await wixClient.auth.generateVisitorTokens()
        res.cookies.set("refreshToken", tokens.refreshToken.value, { maxAge: 60 * 60 * 24, httpOnly: true });
        res.cookies.set("accessToken", tokens.accessToken.value, { maxAge: 60 * 60, httpOnly: true });
        console.log(tokens)
        

    } catch(e) {
        console.error('Token generation failed', e)
        res.cookies.set("refreshToken", "", { maxAge: 0 })
        res.cookies.set("accessToken", "", { maxAge: 0 })
    }
    return res

}