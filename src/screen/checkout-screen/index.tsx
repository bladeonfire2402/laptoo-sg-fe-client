/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import './styled.css'
import { AppContext } from '@/context';
import { orderApi } from '@/utils/order-api';
import { Box, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/format-value';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type ModifiedData<T> = {
  [key in keyof T]?: any;
};


const CheckOutScreen = () => {
  const { user, cart, setCart  } = useContext(AppContext);

  const [modifiedData, setModifiedData] = useState<ModifiedData<any>>({
    items: [],
    address: '',
    paymentType: '',
  });

  useEffect(()=>{
    if(user){
      setModifiedData(
        {
          items: cart,
          address: user.address ? user.address : '',
        }
      )
    }
  },[user,cart])

  const emptyCart = () => {
    setCart([])
    localStorage.setItem('cart',JSON.stringify  ([]))
  }

  const handleChange = useCallback(
    (name: keyof any, value: any) => {
      setModifiedData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleData = (data: any) => {
    const { items,address, paymentType, voucherId} = data;

    let isValid = false;

    if (!voucherId || !voucherId.trim()) {
      delete data.voucherId;
      isValid = true;
    }

    if(address.length < 10){
      toast.error('Địa chỉ tối tiếu 10 kí tự');
      isValid = false;
    }
    else if(address.length > 50){
      toast.error('Địa chỉ tối đa đa 50 kí tự');
      isValid = false;

    }
    else if(items.length === 0){
      toast.error('Chưa có sản phẩm nào')
      isValid = false;
    }
  
      // Xoá voucherId nếu là chuỗi rỗng hoặc toàn khoảng trắng
    return isValid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid: boolean = handleData(modifiedData);
    console.log("Dữ liệu thanh toán:", modifiedData);
    if(isValid == false){return ;}

    // Gửi dữ liệu đến API xử lý thanh toán...
    try{
      const res = await orderApi.createOrder(modifiedData)
      console.log(res)
      toast.success('Đặt hàng thành công');
      emptyCart();
    }
    catch(e: any){
      console.log(e.response.data)
    }
  };

  return (
    <div className='py-[100px] flex justify-center bg-slate-100 CheckoutScreenWrapper'>
      <div className='flex max-w-[1200px] gap-[20px] w-full'>
        <div className='w-full px-5 py-5 bg-white rounded shadow'>
          <h2 className='text-xl font-bold mb-6'>Thanh toán</h2>          
          <form onSubmit={handleSubmit} className='space-y-4'>
            <p>Người nhận hàng: {user?.fullName}</p>
            <p>SĐT: {user?.phone}</p>
            {/* Địa chỉ giao hàng */}
            <div>
              <label className='block font-medium mb-1'>Địa chỉ giao hàng</label>
              <input
                type='text'
                value={modifiedData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className='w-full border px-3 py-2 rounded'
                required
              />
            </div>

            <div className=''>
              <label className='block font-medium mb-1'>Mã voucher</label>
              <input
                type='text'
                value={modifiedData.voucherId || ''}
                onChange={(e) => handleChange('voucherId', e.target.value)}
                className='w-full border px-3 py-2 rounded'
              />
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <label className='block font-medium mb-1'>Phương thức thanh toán</label>
              <select
                value={modifiedData.paymentType}
                onChange={(e) => handleChange('paymentType', e.target.value)}
                className='w-full border px-3 py-2 rounded'
                required
              >
                <option value=''>-- Chọn phương thức --</option>
                <option value='cod'>Thanh toán khi nhận hàng</option>
              </select>
            </div>        
            {/* Nút thanh toán */}
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
            >
              Thanh toán
            </button>
          </form>
        </div>
         <div className='max-w-[450px] w-full px-5 py-5 bg-white rounded shadow'>
           <h2 className='text-xl font-bold mb-6'>Danh sách sản phẩm</h2> 
            <ul className='space-y-2'>
              {cart && cart.length > 0 ? (
                cart.map((item: any, index: number) => (
                  <li key={index} className='border px-3 py-3 bg-black text-white rounded-[12px] flex flex-col gap-2 text-[14px]'>
                    <p className='font-semibold text-yellow-300'>{item.name}</p>
                    <div className='flex items-center gap-2'>
                      <p>Số lượng: {item.quantity}</p>
                      <Box size={16} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <p>Giá: {formatCurrency(item.price * item.quantity)}</p>
                      <DollarSign size={16}/>
                    </div>
                  </li>
                ))
              ) : (
                <li>Giỏ hàng trống</li>
              )}
            </ul>
         </div>
      </div>
      
    </div>
  );
};

export default CheckOutScreen;
