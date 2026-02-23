import React, { useState } from 'react'
import { useAppContext } from '../(context)/AppContext'
import Image from 'next/image';
import { Minus, Plus, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const ProductDetails = ({ product }) => {
    const { currency, addToCart, user, router } = useAppContext();
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product.offerPrice ? product.offerPrice : product.price);
    const [loading, setLoading] = useState()

    const handleCart = async ()=> {
        setLoading(true)
        if(!user){
            toast.error("Please Login First")
            return router.push("/sign-in")
        }
        const data = {
            data: {
                quantity: quantity,
                amount: (price * quantity).toFixed(2),
                userid: user.id,
                products:product.id,
                users_permissions_user: user.id,
            },
        }
        try{
            const responce = await addToCart(data)
            if(responce && responce.status >= 200 && responce.status <300){
                toast.success("Added To Cart")
            } else {
                toast.error("Error while adding to cart")
            }
        } catch(error){
            toast.error("error while adding to cart")
        }
        finally{
            setLoading(false)
        }
    }



    return (
        <div className='flex flex-col gap-7 md:flex-row'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_URL + product.images[0].url} alt='itemImage' height={277} width={277} unoptimized={true} />
            {/* info */}
            <div className='p-3 max-w-sm md:my-auto'>
                <h4 className='text-xl'>{product.name}</h4>
                <p className='font-bold pt-1'>{product.categories[0].name}</p>
                <div className='flexBetween pt-2'>
                    <div className='flex items-center gap-x-2'>
                        <h5>Color:</h5>
                        <p className='font-bold'>{product.color}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h5>Price:</h5>
                        <p className='font-bold'>{currency}{product.price}</p>
                    </div>
                    {product.offerPrice && 
                    <div className='flex items-center gap-x-2'>
                        <h5>Offer Price:</h5>
                        <p className='font-bold'>{product.offerPrice}</p>
                    </div>
                    }
                </div>
                <p className='line-clamp-2 py-1 pr-3'>{product.description}</p>
                <div className='flexBetween mt-3'>
                    <div className='flex items-center ring-1 ring-slate-900/15 bg-secondary rounded-full overflow-hidden'>
                        <Button onClick={()=>setQuantity(quantity-1)} disabled={quantity === 1} className='p-1.5! h-7! w-7! m-0.5 bg-primary text-white rounded-full shadow-md corsor-pointer'>
                            <Minus size={17}/> 
                        </Button>
                        <p className='px-2'>{quantity}</p>
                        <Button onClick={()=>setQuantity(quantity+1)} className='p-1.5! h-7! w-7! m-0.5 bg-primary text-white rounded-full shadow-md corsor-pointer'>
                            <Plus size={17}/>
                        </Button>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h5>SubTotal:</h5>
                        <p className='font-bold'>{price * quantity}</p>
                    </div>
                </div>
                <Button onClick={handleCart} disabled={loading} className={"mt-5"}>
                   {loading ? <Spinner/> : <ShoppingBasket />}
                    Add to Cart
                </Button>
            </div>

        </div>
    )
}

export default ProductDetails
