"use client"
import React, { useEffect, useState } from 'react'
import Title from './Title'
// import { products } from '@/public/data'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useAppContext } from '../(context)/AppContext'
import Item from './Item'

const NewArrivals = () => {
    const {products} = useAppContext()
    const [newArrivals, setNewArrivals]= useState([])

    useEffect(()=>{
        const data = products.slice(0, 7)
        setNewArrivals(data)
    }, [products])



    return (
        <section className='max-padd-container pt-16'>
            <Title
                title1={"New"}
                title2={"Arrivals"}
                titleStyles={"pb-14"}
                paraStyles={"!block"}
            />

            {/* {CONTAINER} */}

            <Carousel className="w-full">
                <CarouselContent className="-ml-2.5">
                    {newArrivals.map((product)=>(
                        <CarouselItem key={product.id} className={"pl-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"}>
                        <Item product={product}/>
                        </CarouselItem>
                    ))}
                    
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </section>
    )
}

export default NewArrivals
