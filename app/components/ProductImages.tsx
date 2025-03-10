'use client'

import Image from "next/image";
import { useState } from "react";

export default function ProductImages(productMedia: { productMedia: [image: { url: string }] }) {
  const [index, setIndex] = useState(0);
  console.log(productMedia.productMedia)

  const images = [
    { id: 0, url: "https://images.pexels.com/photos/8088687/pexels-photo-8088687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 1, url: "https://images.pexels.com/photos/9775887/pexels-photo-9775887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750dpr=1" },
    { id: 2, url: "https://images.pexels.com/photos/9775855/pexels-photo-9775855.jpeg?auto=compress&cs=tinysrgb&w=999" },
    { id: 3, url: "https://images.pexels.com/photos/15389450/pexels-photo-15389450/free-photo-of-photo-of-a-group-of-young-people-wearing-hoodies-in-different-colors.jpeg?auto=compress&cs=tinysrgb&w=999" }
  ];

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
