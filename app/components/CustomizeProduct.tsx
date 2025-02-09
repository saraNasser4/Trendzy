"use client"

import { useState } from "react"

export default function CustomizeProduct() {
  const [chosenColor, setChosenColor] = useState(0)
  const [chosenSize, setChosenSize] = useState(1)
  
  const chooseColorHandler = (color: {color: string, available: boolean}, ind: number)=> {
    if(color.available) setChosenColor(ind) 
  }
  const chooseSizeHandler = (size: {size: string, available: boolean}, ind: number)=> {
    if(size.available) setChosenSize(ind) 
  }

  const colorAvail = [
    { color: 'bg-red-500', available: true },
    { color: 'bg-green-500', available: false },
    { color: 'bg-yellow-500', available: true },
  ]
  const sizeAvail = [
    { size: 'Small', available: false },
    { size: 'Medium', available: true },
    { size: 'Large', available: true },
  ]

  return (
    <section className="my-4">
      <h4 className="font-medium text-[18px] md:text-xl mb-2">Choose a Color</h4>
      <ul className="flex items-center gap-4 my-4">
        {colorAvail.map((color, ind)=> {
          return (
            <li key={ind} onClick={() =>chooseColorHandler(color, ind)} className={`relative rounded-full w-8 h-8 ${color.available ? 'cursor-pointer' : 'cursor-not-allowed'} ${color.color}`}>
              {chosenColor === ind && <span className={`absolute w-10 h-10 ring-2 ring-zinc-500 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></span>}
              {!color.available && <span className={`absolute bg-red-100 w-[2px] h-10 rounded-full top-1/2 left-1/2 -rotate-45 -translate-x-1/2 -translate-y-1/2`}></span>}
            </li>
          )
        })}
      </ul>

      <h4 className="font-medium text-[18px] md:text-xl mb-2">Choose a Size</h4>
      <ul className="flex items-center gap-4 my-4">
        {sizeAvail.map((size, ind)=> {
          return (
            <li key={ind} onClick={() =>chooseSizeHandler(size, ind)} className={`relative rounded-xl ${size.available ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
              <span className={`text-[17px] py-2 px-4 rounded-xl border ${size.available && chosenSize === ind ? 'border-primary text-primary' : !size.available ? 'bg-[#A3C8FF]' : 'bg-primary border-primary'}`}>{size.size}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
