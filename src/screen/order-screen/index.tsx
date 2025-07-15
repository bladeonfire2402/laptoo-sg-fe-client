/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from '@/components/modal'
import { formatCurrency } from '@/utils/format-value'
import { orderApi } from '@/utils/order-api'
import { BookX, BoxesIcon, CreditCard, HandCoins, LoaderIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const OrderScreen = () => {
  const [modal, setModal] = useState({
    isShow: false,
    fetchId: ``
  })
  const [orders, setOrders] = useState<any[]>([])

  const fetchOrders = async()=>{
    try{
        const res = await orderApi.getOrders({})
        setOrders(res.data.data)        
    }
    catch(e){
        console.log(e)
    }
  }

  const handleStatusComponent = (status: string) => {
    const size = 20
    const color = 'white'
    const statusColor = ['blue','yellow','red'];
    if(status == "pending"){
      return(
        <div  className={`px-3 py-1 rounded-md bg-${statusColor[0]}-500 flex items-center gap-2 w-fit`}>
          <LoaderIcon size={size} color={color}/>
          <p className={`capitalize text-${color}`}>{status}</p>
        </div>
      )
    }
  }

  const handlePaymentType = (paymentType: string) =>{
    const size = 20
    const color = 'white'
    const paymentColor = ['green','yellow']
    if(paymentType == 'cod'){
      return(
        <div  className={`px-3 py-1 rounded-md bg-${paymentColor[0]}-500 flex items-center gap-2 w-fit`}>
          <HandCoins size={size} color={color}/>
          <p className={`capitalize text-${color}`}>{paymentType}</p>
        </div>
      )
    }
    else if(paymentType == 'CreditCard'){
      return(
        <div  className={`px-3 py-1 rounded-md bg-${paymentColor[1]}-500 flex items-center gap-2 w-fit`}>
          <CreditCard size={size} color={color}/>
          <p className={`capitalize text-${color}`}>{paymentType}</p>
        </div>
      )
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <div className="cart-screen px-4 py-4  rounded-md w-full flex flex-col gap-2 bg-slate-50 min-h-[300px] relative">
        <h1 className="text-2xl font-bold">Đơn hàng</h1>
       {orders.length == 0 ? (
        <div className='flex justify-center items-center flex-col h-full gap-3'>
            <BookX size={50}/>
            <p>Chưa có đơn hàng</p>
        </div>
       ) : (
        <div className='flex flex-col gap-3 max-h-[400px] overflow-y-auto'>
           <div className='grid grid-cols-5 bg-white px-3 py-3 rounded-lg  '>
             <p className='font-semibold'>Đơn hàng</p>
             <p className='font-semibold'>Mã đơn hàng</p>
             <p className='font-semibold'>Số tiền</p>
             <p className='font-semibold'>Trạng thái</p>
             <p className='font-semibold'>Hình thức</p>
           </div>
           {orders?.map((order: any)=>(
                <div key={order.id} className='grid grid-cols-5 bg-white px-3 py-3 rounded-lg items-center text-[14px] hover:bg-slate-200'
                onClick={()=>setModal(
                  {
                    isShow: true,
                    fetchId: order.id
                  }
                )}
                >
                  <div className='px-3 py-3 rounded-md bg-yellow-500 w-fit max-w-[100px]'>
                    <BoxesIcon size={40} strokeWidth={1} color='white'/>
                  </div>
                  <p className='w-fit max-w-[120px] break-words '>{order.id}</p>
                  <p className='font-semibold'>{formatCurrency(order.totalPrice)}</p>
                  <div>{handleStatusComponent(order.status)}</div>
                  <div>{handlePaymentType(order.paymentType)}</div>
                </div>
            ))}
           <Modal isShow={modal.isShow} fetchId={modal.fetchId}   setIsShow={(value: any) => setModal(prev => ({ ...prev, isShow: value }))}/>
        </div>
       )}
     </div>
  )
}

export default OrderScreen