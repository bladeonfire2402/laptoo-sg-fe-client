/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { WatchedContent, WatchedWrapper } from './styled';
import { productApi } from '@/utils/productApi';
import { ProductCard } from '@/components/product/product-card';

const WatchedSection = () => {
  const [watched, setWatched] = useState<any>([]);

  const getProductBySlug = async (slug: string) => {
    try {
      const res = await productApi.getProductBySlug(slug);
      // Assuming the response is the product data, we add it to the watched state
      setWatched((prevWatched: any) => {
        // Check if the product already exists in the watched state by slug
        if (!prevWatched.some((product: any) => product.slug === res.data.slug)) {
          return [...prevWatched, res.data];  // Add product if not found
        }
        return prevWatched;  // Return prevWatched if product already exists
      });

    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const storedWatched = localStorage.getItem('watched');
    if (storedWatched) {
      const parsedWatched = JSON.parse(storedWatched);
      // Fetch product data for each watched slug
      parsedWatched.map((slug: string) => getProductBySlug(slug));
    }
  }, []);

  return (
    <WatchedWrapper>
      {watched.length === 0 ? (
        ""
      ) : (
         <WatchedContent>
          <h1 className='text-center text-[24px] font-semibold'>Sản phẩm đã xem</h1>
          <p className='text-center text-[16px] text-gray-600 mt-3'>Các sản phẩm nổi bật đã xem</p>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-3'>
            {watched.map((product: any, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </WatchedContent>
      )}
    </WatchedWrapper>
  );
};

export default WatchedSection;
