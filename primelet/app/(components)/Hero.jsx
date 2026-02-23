"use client";
import React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import { MoveRight, Smartphone } from 'lucide-react';
import { useAppContext } from '../(context)/AppContext';

const Hero = () => {
const {router} = useAppContext();

    const slides = [

        {
            headlin: "You All In One Gadgets Store",
            subheadline:"Everything In One Place",
            image:"/bg1.png",
        },
        {
            headlin: "Gearup for adventures.",
            subheadline:"Durable gadgets build to last",
            image:"/bg2.png",
        },
    ];
    return (
        <div className='max-padd-container pt-2'>
            <Carousel>
                <CarouselContent className={"gap-4 pl-5"}>
                    {slides.map((slide, index)=>(
                        <CarouselItem key={index} style={{
                            backgroundImage:`url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition:"center",
                        }} className={"h-screen sm:h-[599px] xl:h-[633px] relative bg-no-repeat rounded-2xl"}>
                        <div className='flex flex-col h-full justify-center sm:pl-16 '>
                            <h2 className='font-knewave font-light text-destructive'>{slide.headlin}</h2>
                            <h2 className='capitalize sm:traacking-[7px]'>{slide.subheadline}</h2>
                            <div className='relative flex items-center my-2'>
                                <h4 className='absolute top-10 sm:top-21 left-3 -translate-y-1/2 -rotate-90 origin-left select-none uppercase text-[12px] sm:text-2xl'>Up to</h4>
                            <h1 className='ml-6 sm:ml-10 uppercase tracking-[0.22rem] text-5xl sm:text-8xl font-extrabold'>40% Off</h1>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <h3>Starting at</h3>
                                <span className='text-5xl font-bold text-destructive'>
                                <span className='text-2xl relative bottom-3'>$</span>99.
                                <span className='text-2xl'>99</span>
                                </span>
                            </div>
                            <Button onClick={()=> router.push('/collection')} className={"py-6 sm:py-8 w-44 sm:w-56 font-semibold sm:text-lg rounded-none mt-8 flexCenter gap-2"}>
                                Shop Now
                                <MoveRight style={{width: "26px", height:"26px"}} strokeWidth={3}/>
                            </Button>
                        </div>
                        </CarouselItem>
                    ))}
                    
                    {/* <CarouselItem>...</CarouselItem>
                    <CarouselItem>...</CarouselItem> */}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Hero
