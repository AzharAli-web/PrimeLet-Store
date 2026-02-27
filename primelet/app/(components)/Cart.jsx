import React, { useEffect } from 'react'
import { useAppContext } from '../(context)/AppContext'
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Title from './Title'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'


const Cart = () => {
    const { cartItems, currency, subTotal, setSubTotal, router, removeFromCart, loadingItemId} = useAppContext()

    useEffect(()=>{
        let total = 0
        cartItems.forEach((item) => {
            total = total + item.amount
        });
        setSubTotal(total)
    }, [cartItems])


    return (

        <Sheet>
            <SheetTrigger>
                <div className='ring-1 ring-slate-900 px-3 text-lg font-bold rounded-full cursor-pointer relative'>
                    Cart
                    <span className='bg-primary text-white text-[12px] font-semibold absolute -top-3.5 -right-2 flexCenter w-4 h-4 rounded-full shadow-md'>
                        {cartItems ? cartItems.length : 0}
                    </span>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Title title1={"Cart"} title2={"overview"} titleStyles={"pb-4"} paraStyles={'hidden'} />
                    </SheetTitle>
                    <SheetDescription asChild>
                        <div className='flex flex-col justify-between'>
                            <ScrollArea className="xl:h-[64vh] h-[71vh] rounded-md border px-2">
                                {cartItems.map((item, index) => (
                                    <div key={index} className='flex gap-3 border-b border-slate-900/10 py-2'>
                                        <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + item.image} alt='itemImage' height={51} width={51} className='h-13 w-14 rounded' unoptimized={true} />
                                        <div className='flexBetween w-full'>
                                            <div>
                                                <h5 className='line-clamp-1'>{item.name}</h5>
                                                <div className='flex gap-3'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <h6 className='font-semibold text-sm'>Quantity:</h6>
                                                        <p className='font-semibold'>{item.quantity}</p>
                                                    </div>
                                                    <div className='flex items-center gap-x-2'>
                                                        <h6 className='font-semibold text-sm'>Amount:</h6>
                                                        <p className='font-semibold'>{currency}{item.amount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p onClick={()=>removeFromCart(item.id)} className='mr-1 cursor-pointer'>{loadingItemId === item.id  ? <Spinner /> : <Trash2 size={16}/>}</p>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                            <div className='flexBetween text-lg font-bold mt-6 mb-2'>
                                <h4>SubTotal:</h4>
                                <p className='text-lg font-bold'>{currency}{subTotal}</p>
                            </div> 
                            <SheetClose asChild>
                            <Button onClick={()=>router.push("/place-order")} className={"rounded-md"}>Proceed To Order</Button>
                            </SheetClose>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
export default Cart
