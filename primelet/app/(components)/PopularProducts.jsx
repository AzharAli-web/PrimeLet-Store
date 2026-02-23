"use client";
import React, { useEffect, useState } from 'react'
import Title from './Title'
import { useAppContext } from '../(context)/AppContext'
import Item from './Item';

const PopularProducts = () => {
    const {products} = useAppContext();
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        const data = products.filter((item)=> item.popular === true).slice(0, 5)
        setPopularProducts(data)
    },[products])


    return (
        <section className='max-padd-container py-16 xl:py-28'>
            <Title
                title1={"Popular"}
                title2={"Products"}
                titleStyles={"pb-14"}
                paraStyles={"!block"}
            />

            {/* {CONTAINER} */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
                {popularProducts.map((product) => (
                        <Item key={product.id} product={product} />
                    
                ))}

            </div>
        </section>
    )
}

export default PopularProducts
