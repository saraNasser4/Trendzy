"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export default function Pagination({ currentPage, hasPrev, hasNext }: { currentPage: number, hasPrev: boolean, hasNext: boolean}) {
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    return(
        <section className="max-w-[650px] w-full mx-auto my-10">
            <div className="flex justify-between items-center">
                <button onClick={()=> createPageUrl(currentPage - 1)} disabled={!hasPrev} className="rounded-full border border-primary p-3 text-primary transition-all duration-300 hover:-translate-x-2 disabled:hover:translate-x-0 disabled:text-gray-600 disabled:border-gray-600"><FaArrowLeft size={20}/></button>
                
                <button onClick={()=> createPageUrl(currentPage + 1)} disabled={!hasNext} className="rounded-full border border-primary p-3 text-primary transition-all duration-300 hover:translate-x-2 disabled:hover:translate-x-0 disabled:text-gray-600 disabled:border-gray-600"><FaArrowRight size={20}/></button>
            </div>
        </section>
    )
}