/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productApi } from "@/utils/productApi";
import { HomeIcon, Loader2, ShoppingBagIcon, ShoppingCart, Star } from "lucide-react";
import { DetailSection, HeadlineProduct, OtherProductSection, ProductContent, ProductDetailContent, ProductDetailWrapper, ShopSection, VariantSelection, WarrantySection } from './styled';
import CustomButton from '@/components/custom-button';
import { formatCurrency } from '@/utils/format-value';
import Policies from '@/components/policy-card';
import { AppContext } from '@/context';
import { toast } from 'sonner';  // Import toast từ sonner

const ProductDetailScreen = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [pageloading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onFocusImg, setOnFocusImg] = useState<number>(0);
  const [onVariant, setOnVariant] = useState<number>(0);
  const [productImgs, setProductImg] = useState<string[]>([])
  const {loading, setLoading} = useContext(AppContext);
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getProductDetail(slug as string);
        setProduct(res.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setPageLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  useEffect(() => {
    if(product){
      setProductImg([{image: product.thumbnail},...product.images])
    }
  },[product])

  if (pageloading) {
    return (
      <div className="flex justify-center py-10 items-center mt-[100px]">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500 py-10">
        {error || "Product not found"}
      </div>
    );
  }

  const tableProductDetail = [
    {
      key: "screen",
      title: "Màn hình",
      isPrimary: true,
    },
    {
      key: "graphicCard",
      title: "Card Màn Hình",
      isPrimary: true,
    },
    {
      key: "connector",
      title: "Đầu nối",
      isPrimary: false,
    },
     {
      key: "os",
      title: "Hệ điều hành",
      isPrimary: true,
    },
    {
      key: "design",
      title: "thiết kế",
      isPrimary: false,
    },
     {
      key: "mass",
      title: "mass",
      isPrimary: false,
    },
     {
      key: "pin",
      title: "Dung lượng pin",
      isPrimary: false,
    },
  ]

const handleAddToCart = (variantId, price, name) => {
  // Lấy cart từ localStorage
  let cart = localStorage.getItem('cart');
  
  // Nếu cart tồn tại, parse nó, nếu không thì khởi tạo mảng rỗng
  cart = cart ? JSON.parse(cart) : [];

  // Kiểm tra xem có sản phẩm nào trong cart có variantId giống với variantId truyền vào không
  const isIn = cart.find((ci: any) => ci.variantId === variantId);

  if (isIn) {
    // Nếu sản phẩm đã có trong cart, update quantity lên 1
    isIn.quantity += 1;
  } else {
    // Nếu không có, thêm sản phẩm mới vào cart với quantity = 1
    cart.push({ variantId, quantity: 1, price , name });
  }

  // Cập nhật lại cart vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Thông báo thành công bằng sonner
  toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
  setLoading(!loading)
};



  const handleRatingStar = (point: number) => {
  const stars = [];
  const filled = Math.max(0, Math.min(5, Math.round(point)));

  for (let i = 0; i < 5; i++) {
    if (i < filled) {
      stars.push(<Star key={i} className="text-yellow-400" />);
    } else {
      stars.push(<Star key={i} className="text-gray-400" size={16} />);
    }
  }

  return stars;
};
  return (
    <ProductDetailWrapper>
        <HeadlineProduct>
            <span className="hover:underline cursor-pointer">{<HomeIcon size={16} onClick={()=>router.push('/')} />}</span> &gt;{" "}
            <span className="hover:underline cursor-pointer">{product.categoryName}</span> &gt;{" "}
            <span className="text-gray-800 font-medium">{product.name}</span>
        </HeadlineProduct>
        <ProductDetailContent>
          <div className='flex flex-col w-full gap-4'>
            <ProductContent>
                <div className='w-1/3'>
                  <img src={productImgs[onFocusImg]?.image} alt={product.name} className='rounded-[14px] object-fill w-[400px] h-[250px]'/>
                  <div className='flex items-center mt-[10px] gap-[10px]'>
                    {productImgs.map((_img: any,index: number)=>(
                      <div key={index} 
                        className={`rounded-md p-[2px] border-2 border-transparent ${onFocusImg == index ? 'border-yellow-400' : ''}`}
                        onClick={()=>setOnFocusImg(index)}
                      >
                        <img src={_img.image} className='h-[50px] w-[50px] object-fill rounded-md' />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='w-2/3 flex flex-col'>
                   <h1 className='text-[20px] font-semibold mb-2'>{product.name}</h1>
                   <p className='flex gap-2'>
                    <span>Thương hiệu:</span>
                    <span className='text-yellow-400 font-semibold'>{product.categoryName}</span>
                    <span> | </span>
                    <span>SKU: 0944939921001</span>
                   </p>
                   <div className='rating flex gap-2'>
                    <span>Đánh giá:</span>
                    <span> {product.rating}</span>
                    <span> |</span>
                    <span className='flex items-center gap-2'>{handleRatingStar(product.rating)}</span>
                   </div>
                   <h2 className='text-yellow-600 text-[28px] font-bold mt-[14px]'>{formatCurrency(product.variants[onVariant].price)}</h2>
                   <VariantSelection>
                    {product.variants.map((v: any, i: number)=>(
                      <div key={i} 
                      className={`px-2 py-2 items-center rounded-md max-w-[300px] flex gap-3 border-2 border-transparent ${i == onVariant && 'border-yellow-400'}`}>
                        <img src={product?.thumbnail} 
                        alt={product.name} className='rounded-[10px] object-fill w-[80px] h-[80px]'
                        onClick={()=>[setOnVariant(i)]}/>
                        <div className='flex flex-col text-[14px]'>
                          <p className='font-semibold'>Ram: <span className='font-normal'>{product.variants[i].ram}</span></p>
                          <p className='font-semibold'>CPU: <span className='font-normal'>{product.variants[i].cpu}</span></p>
                          <p className='font-semibold'>Ổ cứng: <span className='font-normal'>{product.variants[i].hardDrive}</span></p>
                        </div>
                      </div>
                    ))}
                   </VariantSelection>
                   <div className='flex items-center gap-2 mt-3 pr-10'>
                      <CustomButton text='Mua ngay'
                      onClick={()=>{}}
                      Icon={<ShoppingBagIcon size={14}/>}  
                      classname='rounded-md bg-yellow-500 py-5' version={0} textCn='text-[20px]'/>

                      <CustomButton text='Thêm vào giỏ hàng' 
                      onClick={()=>
                        handleAddToCart(product.variants[onVariant].id, product.variants[onVariant].price, product.name)}
                      Icon={<ShoppingCart size={14} color='#fff'/>}
                      classname='rounded-md bg-gray-800 px-3 py-5 text-black ' version={0} textCn='text-white text-lg'  />
                   </div>
                </div>
            </ProductContent>
            <OtherProductSection>
            </OtherProductSection>
          </div>
            <div className='w-1/3 flex flex-col gap-4'>
              <ShopSection>
                <div className='overflow-hidden h-[60px] w-[60px] flex justify-center items-center rounded-full border'>
                  <img src={`/images/logo_sg.png`} className=' object-contain' alt="LaptopSG"/>
                </div>
                <h1 className='flex-1'>Công ty cổ phần thương mại dịch vụ LaptopSG</h1>
              </ShopSection>
              <DetailSection>
                <h1 className='font-semibold text-[18px]'>Thông tin chi tiết</h1>
                {tableProductDetail.map((config:any, i:number)=>(
                  <div className={`grid gap-2 px-2 py-2 grid-cols-2 items-center rounded-md text-[14px] ${config.isPrimary && "bg-slate-300"}`} key={i}>
                    <p className='font-semibold capitalize'>{config.title}</p>
                    <p className='text-gray-600'>{product[config.key]}</p>
                  </div>
                ))}
              </DetailSection>
              <WarrantySection>
                <Policies/>
              </WarrantySection>
            </div>
        </ProductDetailContent>
    </ProductDetailWrapper>
  )
}

export default ProductDetailScreen