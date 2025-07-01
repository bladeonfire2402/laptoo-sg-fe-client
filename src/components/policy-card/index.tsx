import { FaShippingFast, FaShieldAlt, FaExchangeAlt, FaWrench } from 'react-icons/fa';

const PolicyCard = ({ title, description, icon }) => (
  <div className="flex items-center gap-3 space-x-3 px-2 py-2 border-b">
    <div className="text-[20px]">{icon}</div>
    <div>
      <h3 className="font-semibold text-[14px]">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const Policies = () => {
  const size= 20;
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg py-4 px-4">
      <div className="text-lg font-semibold mb-4">Chính sách bán hàng</div>
      <PolicyCard
        title="Miễn phí giao hàng cho đơn hàng từ 5 triệu"
        description="Xem chi tiết"
        icon={<FaShippingFast size={size} />}
      />
      <PolicyCard
        title="Cam kết hàng chính hãng 100%"
        description="Xem chi tiết"
        icon={<FaShieldAlt size={size} />}
      />
      <PolicyCard
        title="Đổi trả trong vòng 10 ngày"
        description="Xem chi tiết"
        icon={<FaExchangeAlt size={size} />}
      />
    </div>
  );
};

export default Policies;
