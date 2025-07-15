/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import './styled.css'
import { categoryApi } from '@/utils/category-api';
import { productApi } from '@/utils/productApi';
import { ProductCard } from '@/components/product/product-card';


const BanHangScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [rawProduct, setRawProduct] = useState([]);
  const [productList,setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryList,setCateogryList] = useState<any>([])
  const [priceFilter, setPriceFilter] = useState<{minPrice?: number, maxPrice?: number}>({
    minPrice: 0,
    maxPrice: 100000000,
  })

  const [totalPage, setTotalPage] = useState<number>();
  const [prosPerPage, setProsPerPage] = useState<5|10>(5);
  const [onCategory, setOnCategory] = useState(
    searchParams.get("category") ? searchParams.get("category") : ''
  )
  const [currentPage, setCurrentPage]= useState<number>(1); //

  const fetchCategoryList = async () => {
    try{
        const res = await categoryApi.getCategories({})
        setCateogryList(res.data)
    }
    catch(err: any) {
        console.log(err.message)
    }
  }

  const fetchProductList = async (
    prosPerPage: number,
    onCategory: string | null,
    currentPage: number,
    ) => {
    try {
        const res = await productApi.getProducts({
        Page: currentPage,
        PageSize: prosPerPage,
        CategoryId: onCategory
        });
        setRawProduct(res.data.data);
        setTotalPage(res.data.totalPages)
    } catch (err: any) {
        console.log(err.message);
    }
  };

const FilterProduct = () => {
  const filtered = rawProduct.filter((product: any) => {
    const price = product.price || 0;
    return (
      price >= (priceFilter.minPrice || 0) &&
      price <= (priceFilter.maxPrice || 100000000)
    );
  });
  setProductList(filtered);
};


useEffect(()=>{
    if(rawProduct){
        FilterProduct();
    }
  },[rawProduct, priceFilter])
  
  useEffect(()=>{
    fetchProductList(prosPerPage,onCategory,currentPage)
  },[currentPage, onCategory, prosPerPage])

  useEffect(()=>{
    if(rawProduct){
        console.log(rawProduct)
    }
  },[rawProduct])

  useEffect(()=> {
    fetchCategoryList();
  },[])

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className='py-[100px] flex justify-center  h-full banhangscreen-wrapper'>
        <div className='flex max-w-[1200px] gap-[20px] w-full'>
            <div className='flex flex-col gap-[10px] w-1/3 '>
                <div className='px-4 py-3 border-2 rounded-lg bg-black text-white'>
                    <h1 className='font-semibold text-[20px] text-yellow-400'>Khoảng giá</h1>
                    <div className='flex justify-between mt-[20px] gap-[5px]'>
                        <div>
                            <p className='mb-[8px]'>Từ</p>
                            <input type='number'  placeholder='0' value={priceFilter.minPrice} className='border-2 rounded-md txtIpn' onChange={(e)=>{
                               setPriceFilter({
                                    ...priceFilter,
                                    minPrice: Number(e.target.value),
                                });
                            }}/>
                        </div>
                         <div>
                            <p className='mb-[8px]'>Đến</p>
                            <input type='number' placeholder='200000' value={priceFilter.maxPrice}  className='border-2 rounded-md txtIpn' 
                            onChange={(e)=>{
                                setPriceFilter({
                                    ...priceFilter,
                                    maxPrice: Number(e.target.value),
                                });
                            }}
                        />
                        </div>
                    </div>
                    <div className=''></div>
                </div>
                <div className='px-4 py-3 border-2 rounded-lg bg-black text-white'>
                    <h1 className='font-semibold text-[20px] text-yellow-400'>Chế độ xem</h1>
                    <div className='flex  mt-[20px] gap-[20px]'>
                      <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            type='radio'
                            name='viewMode'
                            value={5}
                            className='accent-yellow-400'
                            defaultChecked
                            onClick={()=>{setProsPerPage(5)}}
                        />
                        <span>5 Sản phẩm</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            type='radio'
                            name='viewMode'
                            value={10}
                            className='accent-yellow-400'
                            onClick={()=>{setProsPerPage(10)}}

                        />
                        <span>10 Sản phẩm</span>
                        </label>
                    </div>
                </div>
                <div className='px-4 py-3 border-2 rounded-lg bg-blue-500 text-white text-center cursor-pointer'
                onClick={()=>{
                    router.replace(`ban-hang/`),
                    setProsPerPage(5),
                    setCurrentPage(1),
                    setOnCategory('')
                    setPriceFilter(
                      {
                        minPrice: 0,
                        maxPrice:0
                      }
                    )
                }}>
                    Mặc định
                </div>
            </div>
            <div className='w-full flex flex-col gap-[20px]'>
                <div className='flex items-center  justify-between gap-[20px] max-w-[200px] cursor-pointer '>
                    {categoryList?.map((cate: any, i: number)=>(
                    <div className={`px-3 py-1 rounded-md w-[100px] bg-slate-200
                     flex flex-col items-center gap-2 ${onCategory==cate.id ? `!bg-black`: ``}`} key={i}
                     onClick={()=>{
                        setOnCategory(cate.id)
                        router.replace(`/ban-hang/?category=${cate.id}`)
                     }} >
                        <p className={`${onCategory==cate.id ? `!text-white`: ``}`}>{cate.name}</p>
                    </div>
                    ))}
                </div>
                <div className='grid grid-cols-4 gap-[10px]'>
                    {productList.map((product) => (
                        <ProductCard key={product.id} product={product} onClick={()=>{}} />
                    ))}
                </div>
                <div className='pagination'>
                    {rawProduct.length != 0 && totalPage ? <div>
                        {Array.from({ length: totalPage || 0 }, (_, index) => (
                            <button
                            key={index}
                            className={`px-4 py-2 rounded border mr-[8px] ${
                                currentPage === index + 1
                                ? 'bg-black text-white border-black'
                                : 'bg-slate-200 text-black border-gray-300 hover:bg-gray-100'
                            }`}
                            onClick={() => {
                                setCurrentPage(index + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: cuộn lên đầu trang
                            }}
                            >
                            {index + 1}
                            </button>
                        ))}
                    </div> : <div></div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default BanHangScreen