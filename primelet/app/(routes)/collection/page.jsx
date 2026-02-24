"use client";
import Item from '@/app/(components)/Item';
import { useAppContext } from '@/app/(context)/AppContext'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"



const Collection = () => {
    const { products, categories, searchQuery,
    setSearchQuery, selectedCategory, setSelectedCategory } = useAppContext();
    const [sort, setSort] = useState("relevant")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10;
    const searchParams = useSearchParams()

    //compute filtered and sorted products
    // let filteredProducts = products
    let filteredProducts = products || []

    //Search wiery filter
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase()
        filteredProducts = filteredProducts.filter((product) => product.name?.toLowerCase().includes(lowerQuery) || product.description?.toLowerCase().includes(lowerQuery))
    }

    //Category Filters.
    if (selectedCategory) {
        // filteredProducts = filteredProducts.filter((product) => product.categories[0]?.name === selectedCategory)
        filteredProducts = filteredProducts.filter(
  (product) => product.categories?.[0]?.name === selectedCategory
)
    }

    //Sort Products
    let sortedProducts = [...filteredProducts]
    if (sort === "low") {
        sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (sort === "high") {
        sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0))
    }

    //Pagination Logic
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem)

    //Handle Category checkbox changes 
    const handleCategoryChange = (categoryName, checked) => {
        const newCategory = checked ? categoryName : ""
        setSelectedCategory(newCategory)
        const url = newCategory ? `/collection?category=${newCategory}` : "/collection"
    }

    useEffect(() => {
        // const search = searchParams.length("search") || ""
        const search = searchParams.get("search") || ""
        const category = searchParams.get("category") || ""
        // const category = searchParams.length("category") || ""
        setSearchQuery(search)
        setSelectedCategory(category)
        setCurrentPage(1) //Reset to first page when filters change

    }, [searchParams, setSearchQuery, setSelectedCategory])

    return (
        <div className='max-padd-container px-0! mt-4'>
            <div className='flex flex-col sm:flex-row gap-6 mb-16'>
                {/* Filters Left Side */}
                <div className='min-w-64 bg-secondary p-4 pl-6 rounded-r-xl sm:h-screen rounded-xl'>
                    <div className='px-4 py-3 mt-2 bg-white rounded-xl '>
                        <h5 className='mb-4'>Sort By Price</h5>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className='border border-slate-900/10 outline-none text-sm text-gray-500 font-medium h-8 w-full px-2 rounded-md'>
                            <option value="relevant">Relevant</option>
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                        </select>
                    </div >
                    <div className='pl-5 py-3 mt-4 bg-white rounded-xl'>
                        <h5 className='mb-4'>Categories</h5>
                        <div className='flex flex-col gap-2 text-sm font-light'>
                            {categories?.map((cat, index) => (
                                <label key={index} className='flex gap-2 font-semibold text-gray-500'>
                                    <input checked={selectedCategory === cat.name} onChange={(e) => handleCategoryChange(cat.name, e.target.checked)} type='checkbox' />
                                    {cat.name}</label>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Filters Left Side */}
                <div className='max-sm:px-10 pr-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => <Item key={product.id} product={product} />)
                        ) : (
                            <p className='capitalize'>No Products Found.</p>
                        )
                        }
                    </div>


{/* Pagination */}
{totalPages > 1 && (
  <Pagination className="mt-12">
    <PaginationContent>

      {/* Previous Button */}
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        />
      </PaginationItem>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i + 1}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i + 1);
            }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      {/* Next Button */}
      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
      </PaginationItem>

    </PaginationContent>
  </Pagination>
)}
                </div>

            </div>
        </div>
    )
}

export default Collection;