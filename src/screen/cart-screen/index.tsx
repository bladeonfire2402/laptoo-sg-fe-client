import { AppContext } from '@/context';
import { Laptop } from 'lucide-react';
import React, { useContext, useState } from 'react';

// Mẫu dữ liệu sản phẩm trong giỏ hàng
const cartItems = [
  {
    id: 1,
    name: 'Sản phẩm A',
    image: '/path/to/image.jpg',
    price: 200000,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Sản phẩm B',
    image: '/path/to/image2.jpg',
    price: 150000,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Sản phẩm C',
    image: '/path/to/image3.jpg',
    price: 300000,
    quantity: 3,
  },
];

const CartScreen = () => {
  const {cart} = useContext(AppContext);

  // Tính tổng giá trị của giỏ hàng
  const getTotalPrice = () => {
    return cart?.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Hàm thay đổi số lượng sản phẩm trong giỏ
  const handleQuantityChange = (id, newQuantity) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Hàm xóa sản phẩm khỏi giỏ
  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="cart-screen px-4 py-4 border rounded-md w-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Giỏ Hàng</h1>
      <div className="cart-items mt-4">
        {cart.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          cart.map((item) => (
            <div key={item.variantId} className="cart-item flex justify-between items-center p-4 border-b gap-2">
              <div className="flex items-center gap-3">
                <div className='flex justify-center items-center w-[100px] h-[100px] bg-gray-200 rounded-md'>
                    <Laptop size={50}/>
                </div>
                <div>
                  <p className="font-semibold text-[14px] max-w-[400px]">{item?.name}</p>
                  <p className="text-gray-500">Giá: {item?.price} VNĐ</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                  disabled={item?.quantity <= 1} 
                  className="px-2 py-1 bg-gray-200 rounded">-</button>
                <input 
                  type="number" 
                  value={item?.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} 
                  className="w-12 text-center border rounded" 
                />
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)} 
                  className="px-2 py-1 bg-gray-200 rounded">+</button>
                <button 
                  onClick={() => handleRemoveItem(item.id)} 
                  className="px-4 py-2 bg-red-500 text-white rounded">Xóa</button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="total mt-4 flex justify-between items-center">
          <p className="font-semibold">Tổng cộng:</p>
          <p className="text-xl">{getTotalPrice().toLocaleString()} VNĐ</p>
        </div>
      )}

      <div className="mt-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded">Thanh toán</button>
      </div>
    </div>
  );
};

export default CartScreen;
