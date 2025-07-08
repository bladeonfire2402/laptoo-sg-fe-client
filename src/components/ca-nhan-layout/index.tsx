"use client";

import React, { Fragment, useEffect, useMemo, useState } from 'react'
import SideBar from '../side-bar';
import ProfileScreen from '@/screen/profile-screen';
import CartScreen from '@/screen/cart-screen';
import { useSearchParams } from 'next/navigation';
import OrderScreen from '@/screen/order-screen';


const CaNhanLayout = () => {
  const searchParams = useSearchParams();
  const sectionQuery = searchParams.get('section');

  const [sectionState, setSectionState] = useState<string>('profile')

  useEffect(() => {
    if (sectionQuery) {
      setSectionState(sectionQuery);
    }
  }, [sectionQuery]);

  const CaNhanContentSec = useMemo(()=> {
    switch (sectionState) {
      case "profile":
        return ProfileScreen;
      case "carts":
        return CartScreen;
      case "orders":
        return OrderScreen;
      default:
        return Fragment;
    }
  },[sectionState])

  return (
    <div className='flex justify-center py-[100px] '>
        <div className='flex w-full max-w-[1200px] gap-[20px]'>
          <SideBar state={sectionState} setState={setSectionState}/>
          <CaNhanContentSec/>
        </div>
    </div>
  )
}

export default CaNhanLayout