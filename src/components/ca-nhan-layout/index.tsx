"use client";

import React, { Fragment, useMemo, useState } from 'react'
import SideBar from '../side-bar';
import ProfileScreen from '@/screen/profile-screen';
import CartScreen from '@/screen/cart-screen';

interface CaNhanLayout {
    section?: string;
}

const CaNhanLayout = ( {section} : CaNhanLayout) => {
  const [sectionState, setSectionState] = useState<string>(section? section : 'profile')

  const CaNhanContentSec = useMemo(()=> {
    switch (sectionState) {
      case "profile":
        return ProfileScreen;
      case "cart":
        return CartScreen;
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