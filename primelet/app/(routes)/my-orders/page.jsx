// "use client"
// import Title from '@/app/(components)/Title'
// import { useAppContext } from '@/app/(context)/AppContext'
// import { Spinner } from '@/components/ui/spinner'
// import { useEffect, useState } from 'react'

// const MyOrder = () => {
//   const { getMyOrders, router, user, currency } = useAppContext()
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(false)

//   const loadOrderData = async () => {
//     setLoading(true)
//     try {
//       const data = await getMyOrders()
//       console.log(data)
//       setOrders(data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     const jwt = sessionStorage.getItem("jwt")
//     if (!jwt) {
//       router.replace("/sign-in")
//     } else {
//       loadOrderData()
//     }
//   }, [user])

//   return (
//     <div className='max-padd-container py-16 mt-4 bg-secondry'>
//       <Title title1={"My"} title2={"Orders"} title1Styles={"pb-10"} />
//       {loading ? (
//         <h3 className=' flexCenter gap-3 text-center text-gray-500'>Loading Orders <Spinner className={"size-8"} /></h3>) : (
//         orders?.map((order) => (
//           <div key={order.id} className='bg-white p-2 mt-3 rounded-2xl'>
//             {/* ORDER ITEMS  */}
//             {order.orderedItems?.map((item, idx) => (
//               <div
//                 key={idx}
//                 className='text-gray-700 flex flex-col lg:flex-row gap-4 mb-3'>
//                 <div className='flex gap-x-3'>
//                   <div className='flexCenter bg-primary rounded-xl'>
//                     <img src={process.env.NEXT_PUBLIC_BACKEND_URL + item.product?.images[0].url} alt={item.product?.name} className='max-h-20 max-w-20 object-contain rounded-md' />
//                   </div>
//                   <div className='block w-full'>
//                     <h5 className='h5 uppercase line-clamp-1'>
//                       {item.product?.name}
//                     </h5>
//                     <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
//                       <div className='flex items-center gap-x-2'>
//                         <h5 className='medium-14'>Quantity:</h5>
//                         <p>
//                           {item.quantity}
//                         </p>
//                       </div>

//                       <div className='flex items-center gap-x-2'>
//                         <h5 className='medium-14'>Subtotal:</h5>
//                         <p>
//                           {currency}
//                           {item.amount}
//                         </p>
//                       </div>

//                       <div className='flex items-center gap-x-2'>
//                         <h5 className='medium-14'>Price:</h5>
//                         <p>
//                           {currency}
//                           {item.product?.offerPrice || item.product?.price}
//                         </p>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}


//             {/* ORDER SUMMARY */}
//             <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-400'>
//               <div className='flex flex-col gap-2'>
//                 <div className='flex gap-4 flex-wrap'>
//                   <div className='flex items-center gap-x-2'>
//                     <h5 className='medium-14'>Order ID:</h5>
//                     <p className='text-gray-400 text-sm'>{order.id}</p>
//                   </div>

//                   <div className='flex items-center gap-2'>
//                     <h5 className='medium-14'>Amount:</h5>
//                     <p className='text-gray-400 text-sm'>{currency}{order.orderAmount}</p>
//                   </div>

//                   <div className='flex items-center gap-x-2'>
//                     <h5 className='medium-14'>Date:</h5>
//                     <p className='text-gray-400 text-sm'>
//                       {new Date(order.createdAt).toDateString()}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <span
//                       className={`h-2 w-2 rounded-full ${order.orderStatus === "Delivered"
//                           ? "bg-green-500"
//                           : order.orderStatus === "Pending"
//                             ? "bg-yellow-500"
//                             : order.orderStatus === "Packing"
//                               ? "bg-blue-500"
//                               : order.orderStatus === "OutForDelivery"
//                                 ? "bg-purple-500"
//                                 : "bg-red-500"
//                         }`}
//                     />
//                     <p className="font-medium">{order.orderStatus}</p>
//                   </div>

//                 </div>
//               </div>
//             </div>


//           </div>
//         ))
//       )
//       }
//     </div>
//   )
// }

// export default MyOrder





"use client"

import { useEffect, useState } from "react"
import Title from "@/app/(components)/Title"
import { useAppContext } from "@/app/(context)/AppContext"
import { Spinner } from "@/components/ui/spinner"

const MyOrder = () => {
  const { getMyOrders, router, user, currency } = useAppContext()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const loadOrderData = async () => {
    setLoading(true)
    try {
      const data = await getMyOrders()
      setOrders(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")
    if (!jwt) {
      router.replace("/sign-in")
    } else {
      loadOrderData()
    }
  }, [user])

  return (
    <div className="max-padd-container py-16 mt-4 bg-secondry">
      <Title title1="My" title2="Orders" title1Styles="pb-10" />

      {loading ? (
        <div className="flexCenter gap-3 text-gray-500 text-center">
          Loading Orders <Spinner className="size-8" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* ORDER ITEMS */}
              {order.orderedItems?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 mb-4 text-gray-700"
                >
                  <div className="flex gap-3 items-center">
                    {/* Clean image container */}
                    <div className="rounded-xl p-0 flexCenter">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_URL +
                          item.product?.images[0].url
                        }
                        alt={item.product?.name}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="h5 uppercase line-clamp-1">
                        {item.product?.name}
                      </h5>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="medium-14">Quantity:</span>
                          <p>{item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="medium-14">Subtotal:</span>
                          <p>
                            {currency}
                            {item.amount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="medium-14">Price:</span>
                          <p>
                            {currency}
                            {item.product?.offerPrice || item.product?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ORDER SUMMARY */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 border-t border-gray-200 pt-4 text-sm text-gray-500">
                {/* First line (Order ID + Date) */}
                <div className="flex justify-between sm:justify-start flex-wrap gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="medium-14">Order ID:</span>
                    <p>{order.id}</p>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="medium-14">Date:</span>
                    <p>{new Date(order.createdAt).toDateString()}</p>
                  </div>
                </div>

                {/* Second line (Amount + Status) */}
                <div className="flex justify-between sm:justify-start flex-wrap gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="medium-14">Amount:</span>
                    <p>
                      {currency}
                      {order.orderAmount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500"
                          : order.orderStatus === "Pending"
                          ? "bg-yellow-500"
                          : order.orderStatus === "Packing"
                          ? "bg-blue-500"
                          : order.orderStatus === "OutForDelivery"
                          ? "bg-purple-500"
                          : "bg-red-500"
                      }`}
                    />
                    <p className="font-medium">{order.orderStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrder