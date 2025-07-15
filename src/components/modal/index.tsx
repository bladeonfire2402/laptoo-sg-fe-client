/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderApi } from '@/utils/order-api';
import React, { useEffect, useState } from 'react'
import './styled.css'
import CustomInput from '../custom-input';
import { BoxIcon, LogOut, Upload, UserSquare2 } from 'lucide-react';
import { formatCurrency } from '@/utils/format-value';
import CustomButton from '../custom-button';

interface ModalProps {
    isShow: boolean;
    fetchId: string;
    setIsShow?: any;
}

const ipnConfig = {
    padding: "px-2 py-2",
    border: '',
    radius: 'rounded-[10px]',
    other: '',
    with: 'w-full'
}

const spanConfig ={
    bgColor: "bg-slate-50",
}

const Modal = ({isShow,fetchId, setIsShow}: ModalProps) => {
  const [item,setItem] = useState<any>({})

  const fetchOrderById = async(id: string)=>{
    try{
        const res = await orderApi.getOrderById(id)
        setItem(res.data)
        console.log(res.data)
    }
    catch(e){
        console.log(e)
    }
  }


  const handleInputChange = (key: string, value: string) => {
    setItem((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(()=>{
    fetchOrderById(fetchId)
  },[fetchId])
  
  return (
    <div className={`absolute ${isShow ? '' : 'hidden' } text-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-100 shadow-md 
    px-3 py-3 rounded-md modal-wrapper w-full max-w-[900px] `}>
        <h1 className='text-xl mb-[20px] font-bold'>Đơn hàng : {fetchId}</h1>
        <div className='flex gap-3 h-fit'>
            <div className='px-3 py-3 rounded-md border-2 w-1/2 h-fit '>
                <div className='flex items-center gap-3 mb-[25px]'>
                    <h2 className='font-semibold'>Thông tin người nhận</h2>
                    <UserSquare2 color='black'/>
                </div>
                {
                item ? <div className='flex flex-col gap-4'>
                    <CustomInput label='Người nhận' ipnConfig={ipnConfig} value={item.userName || ''} spanConfig={spanConfig}
                    onChangefn={(val: string) => handleInputChange('userName', val)}
                    />
                    <CustomInput label='Địa chỉ nhận' ipnConfig={ipnConfig}  value={item.address || ''}
                    onChangefn={(val: string) => handleInputChange('address', val)}
                    placeHolder='Địa chỉ nhận hàng' spanConfig={spanConfig} />

                    <CustomInput label='Mã giảm gía' ipnConfig={ipnConfig}  value={item.voucherId || ''}
                    isDisable={true} placeHolder='Không có' spanConfig={spanConfig}/>
                </div> : 
                <div></div>
                }
            </div>
            <div className='px-3 py-3 rounded-md border-2 w-full'>
                  <div className='flex items-center gap-3 mb-[25px]'>
                    <h2 className='font-semibold'>Thông tin đơn hàng</h2>
                    <BoxIcon color='black'/>
                </div>
                <div className='flex flex-col max-h-[300px] overflow-y-auto gap-3'>
                    {item?.items?.map((orderItem: any)=>(
                        <div className='px-2 py-2 bg-white rounded-md flex gap-3 items-center border-b' key={orderItem.productId}>
                            <img src={orderItem.productThumbnail} className='h-[100px]'/>
                            <div className='text-[12px]'>
                                <p className='font-semibold mb-2'>{orderItem.productName}</p>
                                <p className='mb-2 font-semibold'>Số lượng: {orderItem.quantity} sản phẩm</p>
                                <p className='text-yellow-500 text-[14px]'>{formatCurrency(orderItem.quantity * orderItem.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className='flex  gap-3 items-center mt-[20px]'>
            <CustomButton text='Cập nhật' textCn='uppercase text-white' classname='rounded-md bg-blue-400 py-5' Icon={<Upload size={14} color='white'/>} version={0}/>
            <CustomButton text='Thoát ngay'  textCn='uppercase text-white' 
            classname='rounded-md bg-yellow-600 py-5' Icon={<LogOut size={14} color='white'/>} version={0}
            onClick={() => setIsShow?.(false)}/>
        </div>
    </div>
  )
}

export default Modal