"use client"
import CartTotal from '@/app/(components)/CartTotal';
import Title from '@/app/(components)/Title'
import { useAppContext } from '@/app/(context)/AppContext';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import React, { useState } from 'react'

const PlaceOrder = () => {
  const {createOrder, totalAmount, cartItems, user} = useAppContext()
  const [FormData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    zipcode: "",
    address: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }))
  };

  const onApprove = async (data)=>{
    const payload = {
      data: {
        username: FormData.username,
        email: FormData.email,
        phone: FormData.phone,
        zipcode: FormData.zipcode,
        address: FormData.address,
        paymentId: String(data.paymentID),
        userid: user?.id,
        orderAmount: totalAmount,
        orderedItems: cartItems.map((item)=>({
          product: item.product,
          quantity: item.quantity,
          amount: item.amount,
        }))
      }
    }

    console.log("Order Payload:", payload)
    await createOrder(payload)
  }


  return (
    <div className='max-padd-container py-16 mt-4 bg-secondry min-h-screen'>
      {/* \CONTAINER */}
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-20'>
        {/* LEFT SIDE - FORM */}
        <div className='flex flex-2 flex-col gap-3 text-[95%]'>
          <Title
            title1={"Delivery"}
            title2={"Information"}
            titleStyles={"pb-5"}
          />
          <input
            onChange={onChangeHandler}
            value={FormData.username}
            type='text'
            name='username'
            placeholder='username'
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
            required
          />
          <input
            onChange={onChangeHandler}
            value={FormData.email}
            type='text'
            name='email'
            placeholder='Email'
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
            required
          />
          <input
            onChange={onChangeHandler}
            value={FormData.phone}
            type='text'
            name='phone'
            placeholder='Phone Number'
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
            required
          />
          <input
            onChange={onChangeHandler}
            value={FormData.zipcode}
            type='text'
            name='zipcode'
            placeholder='Zip Code'
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
            required
          />
          <input
            onChange={onChangeHandler}
            value={FormData.address}
            type='text'
            name='address'
            placeholder='Address'
            className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'
            required
          />
        </div>
        
        {/* RIGHTSIDE - CART TOTAL */}
        <div className='flex flex-1 flex-col'>
          <div className='max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-16'>
            <CartTotal />
            <Button onClick={()=>onApprove({paymentId:123} )} disabled={!FormData.username || !FormData.email || !FormData.phone || !FormData.zipcode || !FormData.address} className={"mt-5 w-full rounded-md"}>Place Order</Button>
           
          
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
