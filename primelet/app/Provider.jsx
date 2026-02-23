"use client"
import React from 'react'
import AppContextProvider from './(context)/AppContext'
import Header from './(components)/Header'
import Footer from './(components)/Footer'
import { usePathname } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'

const Provider = ({children}) => {
    const isAuthPage = usePathname().includes("sign")


    return (
            <AppContextProvider>
                <Toaster  position={"bottom-center"}/>
               {!isAuthPage && <Header />}
                {children}
                { !isAuthPage && <Footer />}
            </AppContextProvider>
    )
}

export default Provider
