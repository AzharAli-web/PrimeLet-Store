// import React, { useState } from 'react'
// import { useAppContext } from '../(context)/AppContext'
// import Image from 'next/image'


// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Plus } from 'lucide-react'
// import ProductDetails from './ProductDetails'

// const Item = ({ product }) => {
//   const { currency } = useAppContext()
//   const [hovered, setHovered] = useState(false)

//   return (
//     <div className='overflow-hidden relative'>
//       {/* IMAGE */}
//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className='flexCenter p-2 bg-[#f5f5f5] overflow-hidden relative'  >
//         <Image src={product.images.length > 1 && hovered
//           ? process.env.NEXT_PUBLIC_BACKEND_URL + product.images[1].url
//           : process.env.NEXT_PUBLIC_BACKEND_URL + product.images[0].url
//         } alt='products' height={555} width={555} className="transition-all duration-300" unoptimized={true} />
//       </div>
//       {/* INFO */}
//       <div className="p-2">
//         <h5 className='line-clamp-1 pt-1'>{product.name}</h5>
//         <div className='flexBetween pt-1'>
//           <p className='font-bold'>{product.categories[0].name}</p>
//           <h5 className='pr-2'>
//             <span className={`${product.offerPrice && "line-through"} text-gray-500 pr-1`}>
//               {currency}{product.price}
//             </span>
//             {product.offerPrice && (
//               <>{currency}{product.offerPrice}</>
//             )}
//           </h5>
//         </div>
//         <p className='line-clamp-2 py-1 pr-3'>{product.description}</p>
//       </div>
//       <Dialog >
//         <DialogTrigger asChild><Button variant={"secondry"} className={"absolute bottom-9 right-[-2] py-1! px-0! ring-2 ring-slate-900/10 mr-1"}><Plus /></Button></DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className={"sr-only"}>Are you absolutely sure?</DialogTitle>
//             <DialogDescription asChild>
//               <ProductDetails product={product} />
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

// export default Item








import React, { useState } from 'react'
import { useAppContext } from '../(context)/AppContext'
import Image from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import ProductDetails from './ProductDetails'

const Item = ({ product }) => {
  const { currency } = useAppContext()
  const [hovered, setHovered] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* FULL CARD CLICKABLE */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="
            overflow-hidden
            relative
            cursor-pointer
            rounded-xl
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-2
          "
        >
          {/* IMAGE */}
          <div className='flexCenter p-3 bg-[#f5f5f5] overflow-hidden'>
            <Image
              src={
                product.images.length > 1 && hovered
                  ? process.env.NEXT_PUBLIC_BACKEND_URL + product.images[1].url
                  : process.env.NEXT_PUBLIC_BACKEND_URL + product.images[0].url
              }
              alt={product.name}
              height={555}
              width={555}
              className="transition-transform duration-300 hover:scale-105"
              unoptimized
            />
          </div>

          {/* INFO */}
          <div className="p-3">
            {/* PRODUCT NAME */}
            <h5 className='line-clamp-1 text-base font-bold tracking-wide text-gray-900'>
              {product.name}
            </h5>

            {/* CATEGORY + PRICE */}
            <div className='flexBetween pt-1'>
              <p className='text-sm font-semibold text-gray-600'>
                {product.categories[0].name}
              </p>

              <h5 className='font-semibold'>
                <span
                  className={`${product.offerPrice && "line-through"} text-gray-400 pr-1`}
                >
                  {currency}{product.price}
                </span>

                {product.offerPrice && (
                  <span className="text-black font-bold">
                    {currency}{product.offerPrice}
                  </span>
                )}
              </h5>
            </div>

            {/* DESCRIPTION - EXACT 2 LINES */}
            <p className='mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2 min-h-[40px]'>
              {product.description}
            </p>
          </div>
        </div>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Product Details
          </DialogTitle>
          <DialogDescription asChild>
            <ProductDetails product={product} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Item