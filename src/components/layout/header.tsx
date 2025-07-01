"use client";

import Link from "next/link";
import { ShoppingCart, } from "lucide-react";
import Image from "next/image";
import { Container } from "../ui/container";
import { useRouter } from "next/navigation";
import SearchBar from "../search-bar";
import { useContext, useMemo } from "react";
import ProfileMenu, { ProfileMenuItems } from "../profile-menu";
import AuthMenu from "../auth-menu";
import { AppContext } from "@/context";


const profileMenuList: ProfileMenuItems[] = [
  {
    type: "0",
  },
  {
    title: "profile",
    href: "/ca-nhan",
    type: "1",
  },
  {
    title:"order",
    href: "/profile/orders",
    type: "1",
  },
  {
    title:"log out",
    type: "2",
    onClick: () => {},
  }
]

export default function Header() {
  const router = useRouter();
  const {user, cart} = useContext(AppContext)
  const authMenuSection = useMemo(
    ()=> user ? <ProfileMenu profileMenuList={profileMenuList} />  : <AuthMenu/>,
  [user])

  const cartMenuSection = useMemo(()=>{
    return(
      <button
        onClick={() => router.push("/cart")}
        className="relative flex items-center  text-sm text-gray-100 hover:text-yellow-500"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-white">
          {cart?.length}
        </span>
      </button>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cart])

  return (
    <Container className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center bg-black ">
      <header className="sticky top-0 z-50 w-full border-b  max-w-[1200px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
             <Image src={`/images/logo_sg.png`} width={200} height={200} alt="LaptopSG"/>
            </Link>
            <SearchBar/>
            <div className="flex items-center space-x-6">
              {authMenuSection}
              {cartMenuSection}
            </div>
          </div>
        </div>
      </header>
    </Container>
  );
}
