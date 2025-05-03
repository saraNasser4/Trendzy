'use server'

import wixServer from "./wixServer"

export default async function getUser() {
    try {
        const member = (await (await wixServer()).members.getCurrentMember()).member
        return member?.profile
    } catch (e) {
        console.log("Can't find a member", e)
        return undefined
    }
}