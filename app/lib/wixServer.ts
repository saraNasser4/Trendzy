import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import { cookies } from "next/headers";


export default async function wixServer() {
    let refreshToken;
    try {
        const cookieStore = await cookies()
        refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || '{"accessToken": {}, "refreshToken": {}}')
    } catch(err) {
        console.error('cookies error for server', err)
    }
    const myWixServer = createClient({
        modules: { products },
        auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
        tokens: refreshToken,
        })
    })

    return myWixServer;
}

