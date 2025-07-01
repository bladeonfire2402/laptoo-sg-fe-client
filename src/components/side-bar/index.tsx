"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { SideBarContent, SideBarWrapper } from './styled'
import {
  User,
  MapPin,
  Package,
  // Ticket,
  Gift,
  // CreditCard,
  // Bell,
  LogOut,
} from "lucide-react";

interface SideBarProps{
    setState?:any;
    state?: string;
}

const SideBar = ({setState, state}: SideBarProps) => {
    const menuItems = [
    {
        title: "Thông tin tài khoản",
        href: "profile",
        icon: User,
    },
    {
        title: "Địa chỉ",
        href: "addresses",
        icon: MapPin,
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
    {
        title: "Xu của tôi",
        href: "cashback",
        icon: Gift,
    },
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
    <SideBarWrapper>
        <SideBarContent>
            {menuItems.map((item) => (
                <div
                key={item.href}
                onClick={setState(state)}
                className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100",
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
        </SideBarContent>

    </SideBarWrapper>
  )
}

export default SideBar