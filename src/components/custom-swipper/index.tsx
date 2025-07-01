/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CustomSwipperWrapper } from "./styled";

interface CustomSwipperPrpps {
  listItems?: any[];
  product?: any;
}

const CustomSwipper = ({ listItems, product }: CustomSwipperPrpps) => {
  // References for the custom navigation buttons
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      // If necessary, you can update or perform actions on the buttons here
    }
  }, []);

  return (
    <CustomSwipperWrapper className="relative">
      {/* Custom Previous Button */}
      <div className="absolute -bottom-[50px] right-[40px] z-30">
        <button ref={prevButtonRef} className="custom-prev  z-20 text-2xl   rounded-full shadow hover:bg-gray-700">
          {`<`}
        </button>

        {/* Custom Next Button */}
        <button ref={nextButtonRef} className="custom-next z-20 text-2xl   rounded-full shadow hover:bg-gray-700">
          {`>`}
        </button>
      </div>

      {/* Swiper Component */}
      <Swiper
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        slidesPerView={3}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
      >
        {[1,2,3,4].map((item: any, i: number) => (
          <SwiperSlide className="max-w-[200px]" key={i}>
            <div className="px-2 py-2">
              <img src={product.thumbnails}/>
              ddd
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </CustomSwipperWrapper>
  );
};

export default CustomSwipper;
