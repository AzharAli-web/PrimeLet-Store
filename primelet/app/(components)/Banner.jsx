import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
   <section className='max-padd-container'>
    <div className='flex flex-col sm:flex-row flex-wrap gap-4 xl:gap-14 gap-y-10'>
        <div className='flex-1'>
            <Image src={'/banner-1.png'} alt='bannerImg' height={1200} width={700} className='w-full rounded-lg'/>
        </div>
        <div className='flex-1'>
            <Image src={'/banner-2.png'} alt='bannerImg' height={1200} width={700} className='w-full rounded-lg'/>
        </div>
    </div>
   </section>
  )
}

export default Banner
