"use client"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { useAppContext } from "@/app/(context)/AppContext"
import { toast } from "sonner"

export default function SignIn() {
  const {loginUser, user, setUser} = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const router = useRouter()

  const handleloginUser = async ()=>{
    setLoading(true)
    try{
      const data = await loginUser(email, password)
      if(data?.jwt && data?.user){
        sessionStorage.setItem("user", JSON.stringify(data.user))
        sessionStorage.setItem("jwt", data.jwt)
        setUser(data.user)
        toast.success("Login successfull")
        router.push("/")
      } else {
        toast.error("Login Failed")
      }
    } catch (error) {
      console.error("Login Failed", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user){
      router.push("/")
    }
  }, [user])



  return (
    <div className="absolute top-0 left-0 h-full w-full z-50">
        {/* CONTAINER */}
        <div className="flex h-full w-full">
        {/* LEFT SIDE - IMAGE SIDE */}
        <div className="w-1/2 hidden sm:block">
          <Image src={"/login.png"} alt="login-page-img" height={1000} width={1000} className="object-cover aspect-square h-full w-full" />
        </div>

        {/* RIGHT SIDE- FORM SIDE */}
        <div className="flexCenter w-full sm:w-1/2 px-4">
     
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className={"text-xl font-bold"}>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your PrimeLet account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href={"/sign-up"}>Sign Up</Link>
              </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              onChange={(e)=> setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
              onChange={(e)=> setPassword(e.target.value)}
              id="password" type="password" required />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={handleloginUser} disabled={!(email && password)} type="submit" className="w-full">
           {loading && <Spinner/>}
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
</div>
</div>
  )
}


// className="min-h-screen flex justify-center items-center bg-gray-50"