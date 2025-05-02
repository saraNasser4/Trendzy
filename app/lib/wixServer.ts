import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { cookies } from "next/headers";
import { members } from "@wix/members";


export default async function wixServer() {
    let refreshToken;
    let accessToken;

    try {
        const cookieStore = await cookies()
        refreshToken = cookieStore.get("refreshToken")?.value || '{}'
        accessToken = cookieStore.get("accessToken")?.value || '{}'

    } catch(err) {
        console.error('cookies error for server', err)
    }

    const myWixServer = createClient({
        modules: { products, collections, members },
        auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
        tokens: { refreshToken, accessToken },
        })
    })

    return myWixServer;
}

