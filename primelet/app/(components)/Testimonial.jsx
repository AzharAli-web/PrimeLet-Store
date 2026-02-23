import React from 'react'
import Title from './Title'
import { Star } from 'lucide-react'
import Image from 'next/image'

const Testimonial = () => {
    return (
        <section className='max-padd-container py-26 xl:py-32'>
            <Title
                title1={"People"}
                title2={"Says"}
                titleStyles={"pb-10"}
                paraStyles={"!block"}
            />
            {/* CONTAINER */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className="bg-secondary w-full space-y-4 p-3 rounded-md border text-gray-500 text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex ">
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                        </div>
                        <p>14 feb 2026</p>
                    </div>
                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna”</p>
                    <div className="flex items-center gap-2">
                        <Image src={'/user1.png'} alt="userImg" height={47} width={47} className="rounded-full" />
                        <p className="text-gray-500 font-medium">Donald Jackman</p>
                    </div>
                </div> 
                
                 <div className="bg-secondary w-full space-y-4 p-3 rounded-md border text-gray-500 text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex ">
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                        </div>
                        <p>19 jan 2026 </p>
                    </div>
                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna”</p>
                    <div className="flex items-center gap-2">
                        <Image src={'/user2.png'} alt="userImg" height={47} width={47} className="rounded-full" />
                        <p className="text-gray-500 font-medium">Daniel Donald</p>
                    </div>
                </div>

                <div className="bg-secondary w-full space-y-4 p-3 rounded-md border text-gray-500 text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex ">
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                            <Star fill='black' stroke='black' height={17} />
                        </div>
                        <p>24 oct 2026</p>
                    </div>
                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna”</p>
                    <div className="flex items-center gap-2">
                        <Image src={'/user3.png'} alt="userImg" height={47} width={47} className="rounded-full" />
                        <p className="text-gray-500 font-medium">Kings Liari</p>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Testimonial
