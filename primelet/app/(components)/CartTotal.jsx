"use client"
import React, { useEffect } from 'react'
import { useAppContext } from '../(context)/AppContext'

const CartTotal = () => {
    const { router,cartItems, currency, subTotal, totalAmount, setTotalAmount} = useAppContext()

    const delivery_charges = cartItems.length !== 0 ? 10 : 0

    const cartAmount = () => {
        const amount = subTotal + delivery_charges + (subTotal * 2)/ 100
        setTotalAmount(amount)
    }

    useEffect(()=>{
        cartAmount()
    }, [cartItems, subTotal])

  return (
    <div>
      <h4>
        Order Summary
        <span className='text-destructive'>({cartItems ? cartItems.length : 0})</span>
      </h4>
      <hr className='border-gray-300 my-5'></hr>

      <div className='mt-4 space-y-2'>
        <div className='flexBetween text-lg'>
            <h4>Subtotal:</h4>
            <p className='text-lg font-bold'>{currency}{subTotal}</p>
        </div>
        <div className='flexBetween text-lg'>
            <h4>Delivery Chares:</h4>
            <p className='text-lg font-bold'>{currency}{delivery_charges}</p>
        </div>
        <div className='flexBetween text-lg'>
            <h4>Tax (2%):</h4>
            <p className='text-lg font-bold'>{currency}{(subTotal * 2) / 100}</p>
        </div>
        <div className='flexBetween text-lg font-bold'>
            <h4>Total Amount:</h4>
            <p className='text-lg font-bold'>{currency}{subTotal === 0 ? 0 : totalAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
