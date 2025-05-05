'use server'

import wixServer from "./wixServer"

export default async function getUser() {
    try {
        return ( (await wixServer()).members)
        
    } catch (e) {
        console.log("Can't find a member", e)
        return undefined
    }
}