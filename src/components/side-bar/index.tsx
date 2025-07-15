"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  User,
  Package,
  // Ticket,
  Gift,
  // CreditCard,
  // Bell,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from 'next/navigation';

interface SideBarProps{
    setState?:any;
    state?: string;
}

const SideBar = ({setState, state}: SideBarProps) => {
    const router = useRouter()
    const menuItems = [
    {
        title: "Thông tin tài khoản",
        href: "profile",
        icon: User,
    },
    {
        title: "Giỏ hàng",
        href: "carts",
        icon: ShoppingBag,
    },
    {
        title: "Đơn hàng của tôi",
        href: "orders",
        icon: Package,
    },
    // {
    //   title: "Voucher",
    //   href: "/profile/vouchers",
    //   icon: Ticket,
    // },
    // {
    //     title: "Xu của tôi",
    //     href: "cashback",
    //     icon: Gift,
    // },
    // {
    //   title: "Thẻ thanh toán",
    //   href: "/profile/payment",
    //   icon: CreditCard,
    // },
    // {
    //   title: "Thông báo",
    //   href: "/profile/notifications",
    //   icon: Bell,
    // },
    ];
    
  return (
    <div className='w-1/4 px-[20px] py-[10px] rounded-[10px] bg-slate-50 cursor-pointer h-fit'>
        <div>
            {menuItems.map((item) => (
                <div
                key={item.href}
                onClick={(e)=>{
                    e.preventDefault();
                    setState(item.href);
                    router.replace(`/ca-nhan?section=${item.href}`)
                }}
                className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-white",
                    pathname === item.href
                    ? "bg-blue-50 text-yellow-600 font-medium"
                    : "text-gray-600"
                `}
                >
                <item.icon className="h-4 w-4" />
                {item.title}
                </div>
            ))}
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-all hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Đăng xuất
            </button>   
        </div>

    </div>
  )
}

export default SideBar