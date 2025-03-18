"use client"

import { useState } from "react"

type Choice = {
  value: string;
  description: string;
  inStock: boolean;
  visible: boolean;
};

type ProductOption = {
  name: string;
  choices: Choice[];
};

type CustomizeProductProps = {
  productOptions: ProductOption[];
};


export default function CustomizeProduct({ productOptions }: CustomizeProductProps) {
  const [chosenColor, setChosenColor] = useState(0)
  const [chosenSize, setChosenSize] = useState(1)
  
  const chooseColorHandler = (choice: Choice, ind: number)=> {
    if(choice.inStock) setChosenColor(ind) 
  }
  const chooseSizeHandler = (choice: Choice, ind: number)=> {
    if(choice.inStock) setChosenSize(ind) 
  }

  return (
    <section className="my-4">
      {productOptions.map((options)=> {
        return (
          <div key={options.name.toLowerCase()}>
            <h4 className="font-medium text-[18px] md:text-xl mb-2">Choose a {options.name}</h4>
            <ul className="flex items-center gap-4 my-4">
              {options?.choices.map((choice, i)=> {          
                return(
                  <div key={choice.description}>
                    {options.name === "Color" && 
                      <li  onClick={() => chooseColorHandler(choice, i)} className={`relative rounded-full w-8 h-8 ${choice.inStock ? 'cursor-pointer' : 'cursor-not-allowed'}`} style={{ backgroundColor: choice.value }}>
                        {chosenColor === i && <span className={`absolute w-10 h-10 ring-2 ring-zinc-500 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></span>}
                        {!choice.inStock && <span className={`absolute w-[2px] h-10 ring-2 bg-red-50 rounded-full top-1/2 left-1/2 -rotate-45 -translate-x-1/2 -translate-y-1/2`}></span>}
                      </li>
                    }
                    {options.name === "Size" && 
                      <li onClick={() => chooseSizeHandler(choice, i)} className={`relative rounded-xl ${choice.inStock ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                        <span className={`text-[17px] py-2 px-4 rounded-xl border ${choice.inStock && chosenSize === i ? 'border-primary text-primary' : !choice.inStock ? 'bg-light-blue' : 'bg-primary border-primary'}`}>{choice.value}</span>
                      </li>
                    }
                  </div>
                )
              }
              )}
            </ul>
          </div>
        )
      })}   
    </section>
  )
}
