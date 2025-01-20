"use client"

import Link from "next/link"
import Image from "next/image"

export default function Slider() {
    const slides = [
        {
            id: 0,
            title: "Winter Sale Collections",
            description: "Sale! Up to 50% off!",
            img: "https://images.pexels.com/photos/7026789/pexels-photo-7026789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            url: "/",
            bg: "bg-gradient-to-r from-zinc-950 to-blue-950",
        },
        // {
        //     id: 1,
        //     title: "Summer Sale Collections",
        //     description: "Sale! Up to 50% off!",
        //     img: "https://images.pexels.com/photos/12678741/pexels-photo-12678741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     url: "/",
        //     bg: "bg-gradient-to-r from-blue-950 to-zinc-900",
        // },
        // {
        //     id: 2,
        //     title: "Spring Sale Collections",
        //     description: "Sale! Up to 50% off!",
        //     img: "https://images.pexels.com/photos/17244589/pexels-photo-17244589/free-photo-of-a-man-is-doing-a-trick-on-his-skateboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     url: "/",
        //     bg: "bg-gradient-to-r from-zinc-900 to-zinc-950",
        // },
    ]



    return (
        <section className="h-[calc(100vh-80px)]">
            <div className="w-full h-full flex transition-all duration-1000 ease-in-out">
                {slides.map(slide => {
                    return(
                        <div key={slide.id} className={`${slide.bg} flex flex-col gap-16 md:flex-row w-screen h-full`}>
                            <div className="h-1/2 md:h-full md:w-1/2 flex flex-col items-center justify-center gap-8 text-center">
                                <h2 className="font-medium text-xl md:text-2xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
                                <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl">{slide.title}</h1>
                                <Link href={slide.url} className="uppercase bg-primary hover:bg-primary/70 px-3 py-2 my-4 rounded-lg font-medium">Shop now</Link>
                            </div>
                            <div className="relative h-1/2 md:h-full md:w-1/2">
                                <Image src={slide.img} alt="" fill sizes="100%" className="object-cover" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
