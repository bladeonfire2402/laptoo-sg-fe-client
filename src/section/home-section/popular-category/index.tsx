/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react'
import { PopularCategoryContent, PopularCategoryWrapper } from './styled'
import { categoryApi } from '@/utils/category-api';
import { Laptop } from 'lucide-react';

const PopularCategorySection = () => {
    const [categoryList,setCateogryList] = useState<any>([])

    const fetchCategoryList = async () => {
      try{
        const res = await categoryApi.getCategories({})
        setCateogryList(res.data)
      }
      catch(err: any) {
        console.log(err.message)
      }
    }

    useEffect(()=> {
      fetchCategoryList();
    },[])
  return (
    <PopularCategoryWrapper>
        <PopularCategoryContent className='bg-slate-50'>
          <h1 className='text-center text-[24px] font-semibold'>Danh mục nổi bật</h1>
          <p className='text-center text-[16px] text-gray-600 mt-2'>Khám phá những dòng thương hiệu nổi bật của chúng tôi</p>
          <div className='flex items-center  justify-between mt-7'>
            {categoryList?.map((cate: any, i: number)=>(
              <div className='px-6 py-4 rounded-md w-[100px] bg-slate-200 flex flex-col items-center gap-2' key={i} >
                <Laptop size={40}/>
                <p>{cate.name}</p>
              </div>
            ))}
          </div>
        </PopularCategoryContent>
    </PopularCategoryWrapper>
  )
}

export default PopularCategorySection