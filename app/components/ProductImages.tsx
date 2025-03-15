'use client'

import Image from "next/image";
import { useState } from "react";

export default function ProductImages(productMedia: { productMedia: [image: { url: string }] }) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="h-[500px] relative">
        <Image src={productMedia.productMedia[index]?.image.url} alt="product image" fill sizes="250vw" className="object-cover rounded-md" />
      </div>
      <div className="flex [&>*]:h-32 [&>*]:relative gap-6 [&>*]:my-8">
        {productMedia.productMedia.map((imgObj, index) => {
          return(
            <div key={index} onClick={() => setIndex(index)} className="w-32 cursor-pointer">
              <Image src={imgObj.image.url} alt="product image" fill sizes="250vw" className="object-cover rounded-md" />
            </div>
          )
        })}
      </div>
    </>
  )
}
