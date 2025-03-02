'use client'

import { useContext } from "react"
import { WixClientContext } from "../contexts/WixContext"

export default function useWixClient() {
    return useContext(WixClientContext)
}
  