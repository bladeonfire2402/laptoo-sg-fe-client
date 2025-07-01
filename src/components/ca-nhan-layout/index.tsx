"use client";

import React, { Fragment, useMemo, useState } from 'react'
import { CaNhanContent, CaNhanLayoutWrapper } from './styled'
import SideBar from '../side-bar';
import ProfileScreen from '@/screen/profile-screen';

interface CaNhanLayout {
    section?: string;
}

const CaNhanLayout = ( {section} : CaNhanLayout) => {
  const [sectionState, setSectionState] = useState<string>(section? section : 'profile')

  const CaNhanContentSec = useMemo(()=> {
    switch (sectionState) {
      case "profile":
        return ProfileScreen;
      case "":
        return ProfileScreen;
      default:
        return Fragment;
    }
  },[sectionState])

  return (
    <CaNhanLayoutWrapper>
        <CaNhanContent>
          <SideBar state={sectionState} setState={setSectionState}/>
          <CaNhanContentSec/>
        </CaNhanContent>
    </CaNhanLayoutWrapper>
  )
}

export default CaNhanLayout