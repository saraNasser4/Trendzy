"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import React from "react"

export default function Filter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    replace(`${pathname}?${params}`)
  }

  const selectElementsData = [
    { name: "type", options: ['Type', 'Physical', 'Digital'] },
    { name: "type", options: ['Category', 'New Arrival', 'Popular'] },
    { name: "type", options: ['All Filters'] },
  ]

  const selectStyle ="rounded-2xl bg-zinc-900 px-3 py-2 outline-none w-28"
  const inputStyle ="rounded-2xl px-3 py-2 outline-none w-28 font-semibold bg-zinc-400 placeholder:text-zinc-900 text-zinc-900`"
  return (
    <div className="flex justify-between items-center gap-10">
        <div className="flex flex-wrap gap-6">
          <select onChange={handleFilterChange} name="type" className={selectStyle}>
            {selectElementsData[0].options.map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
          </select>

          <input onChange={handleFilterChange} name="min" type="number" className={inputStyle} placeholder="min price" min="0" />
          <input onChange={handleFilterChange} name="max" type="number" className={inputStyle} placeholder="max price" min="0" />
          
          {selectElementsData.slice(1).map((opt, ind)=> {
            return(
              <select onChange={handleFilterChange} key={ind} name={opt.name} className={selectStyle}>
                {opt.options.map((ele, i)=> <option key={i}>{ele}</option>)}
              </select>
            )
          })}
        </div>
        
        <select onChange={handleFilterChange} name="sort" className={`${selectStyle} self-start `}>
          <option value="sort by">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (hight to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
    </div>
  )
}
