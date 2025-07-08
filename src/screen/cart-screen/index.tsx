/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContext } from '@/context';
import { formatCurrency } from '@/utils/format-value';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';


const CartScreen = () => {
  const {cart, setCart} = useContext(AppContext);
  const router = useRouter()

  const getCartInLocalStorage = () => {
    const localCart = localStorage.getItem('cart')
    return localCart ? JSON.parse(localCart) : [];
  }

  // Tính tổng giá trị của giỏ hàng
  const getTotalPrice = () => {
    return cart?.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const handleCartChange = (method: 'add' | 'subtract' | 'remove', varId: string) => {
    let localCart = getCartInLocalStorage();
    const item = localCart.find((item: any) => item.variantId === varId);

    if (item) {
      if (method === 'add') {
        item.quantity += 1;
      } else if (method === 'subtract') {
        item.quantity = Math.max(1, item.quantity - 1);
      } else if(method == 'remove'){
        localCart = localCart.filter((item: any)=>item.variantId !== varId)
      }

      // Cập nhật localStorage
      localStorage.setItem('cart', JSON.stringify(localCart));

      // Đồng bộ với context
      setCart(localCart);
    }
  };

  return (
    <div className="cart-screen px-4 py-4  rounded-md w-full flex flex-col gap-2 bg-slate-50">
      <h1 className="text-2xl font-bold">Giỏ Hàng</h1>
      <div className="cart-items mt-4">
        {cart?.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div className='flex flex-col gap-2 max-h-[500px] overflow-y-auto '>
            {
              cart?.map((item: any) => (
                <div key={item.variantId} className="cart-item flex justify-between items-center py-4 px-4 rounded-[14px] border bg-white  gap-2">
                  <div className="flex items-center gap-3">
                    <div className='flex justify-center items-center w-[100px] h-[100px] bg-gray-200 rounded-md'>
                      <img src={item.img} alt={item.variantId}/>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] max-w-[400px]">{item?.name}</p>
                      <p className="text-gray-500 mt-[5px]">{formatCurrency(item?.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleCartChange('subtract',item.variantId)} 
                      disabled={item?.quantity <= 1} 
                      className="size-[30px] text-center bg-gray-200 rounded">-</button>
                    <p className='px-2 py-2'>{item.quantity}</p>
                    <button 
                      onClick={() => handleCartChange('add',item.variantId)} 
                      className="size-[30px] text-center bg-gray-200 rounded text-[]">+</button>
                    <button 
                      onClick={() => handleCartChange('remove', item.variantId)} 
                      className="px-4 py-1 bg-red-500 text-white rounded ">Xóa</button>
                  </div>
                </div>
              ))
            }
          </div>
          
        )}
      </div>

      {cart.length > 0 && (
        <div className="total mt-4 flex justify-between items-center">
          <p className="font-semibold">Tổng cộng:</p>
          <p className="text-[18px] font-semibold">{formatCurrency(getTotalPrice())}</p>
        </div>
      )}

      <div className="mt-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded flex items-center gap-2" onClick={()=>router.push('/thanh-toan')}>
          <p>Thanh toán</p>
          <CheckCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
