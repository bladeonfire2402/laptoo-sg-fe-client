"use client";

import React from 'react'
import { HomeScreenWrapper } from './styled'
import { ProductList } from "@/components/product/product-list";
import { BannerSection } from "@/components/home/banner-section";
import PopularCategorySection from "@/section/home-section/popular-category";
import WatchedSection from "@/section/home-section/watched-section";
import { Container } from '@/components/ui/container';

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <BannerSection />
      <Container className='mt-[30px]'>
        <div className="space-y-10 pb-10">
          <PopularCategorySection/>
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-2xl font-bold mt-14">Sản phẩm mới nhất</h1>
            <p className="text-muted-foreground">
              Khám phá những sản phẩm mới nhất của chúng tôi
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[1200px]">
              <ProductList />
            </div>
          </div>
        </div>
        {/* <WatchedSection /> */}
      </Container>
    </HomeScreenWrapper>
  )
}

export default HomeScreen