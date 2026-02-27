"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, CircleUser, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppContext } from '../(context)/AppContext'
import { useRouter } from "next/navigation"
import Cart from './Cart'



function Header() {
    const { categories, setSearchQuery, selectedCategory, setSelectedCategory, user, logout } = useAppContext()
    const [searchInput, setSearchInput] = useState("")
    const router = useRouter()


    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName)
        const url = categoryName ? `/collection?category=${categoryName}` : "/collection"
        router.push(url)
    }

    //Update search query and redirect on input change
    useEffect(() => {
        setSearchQuery(searchInput)
        const url = searchInput ? `/collection?search=${searchInput}` : "/collection"
        searchInput !== "" && router.push(url)
    }, [searchInput, setSearchQuery, router])


    return (
        <header className='max-padd-container'>
            <div className='bg-secondary px-5 py-2 mt-2 w-full z-50 rounded-full'>
                <div className='flexBetween gap-4 '>
                    {/* {LOGO} */}
                    <div className='flex flex-1 gap-3'>
                        <Link href={'/'}>
                            <span className='text-3xl font-bold relative bottom-1 tracking-wide'>
                                Prime<span className='text-destructive'>Let.</span>
                            </span>
                        </Link>
                    </div>
                    {/* {SEARCH BAR} */}
                    <div className='lg:flex-1 flex-2 relative hidden md:flex items-center'>
                        <div className='flex bg-white w-full max-w-[566px] pl-6 ring-1 ring-slate-900/5 rounded-full overflow-hidden'>
                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type='text' placeholder='type here....' className='w-full text-sm outline-none pr-10 placeholder:text-gray-400' />
                            <DropdownMenu>
                                <DropdownMenuTrigger className='flexCenter gap-1 px-2 border-x-2 border-slate-900/10 cursor-pointer font-semibold text-sm text-gray-500 outline-none'>

                                    {selectedCategory || "Category"}
                                    <ChevronDownIcon strokeWidth={2.25} size={19} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Browse-Categories.</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {categories.map((cat, index) => (
                                        <DropdownMenuItem onClick={() => handleCategorySelect(cat.name)} key={index}><p>{cat.name}</p></DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className='p-3 cursor-pointer'>
                                <Search strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    {/* {Cart & USER} */}
                    <div className='sm:flex-1 flex items-center sm:justify-end gap-x-4 sm:gap-x-8'>
                        {/* {CART} */}
                        <Cart />

                        {/* {USER} */}
                        <div className="group">
                            {!user ? (
                                <Button onClick={() => router.push("/sign-in")} size={"lg"}>
                                    <User />
                                    Login
                                </Button>) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <CircleUser size={33} className='relative top-1' />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push("/my-orders")}>My Orders</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header


