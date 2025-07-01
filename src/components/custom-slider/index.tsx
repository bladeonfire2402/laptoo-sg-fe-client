"use client";

import { BlogSliderWrapper, SliderContentVer1Wrapper } from "./styled";
import CarouselCustom from "../carousel";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sliderBannersList: any[] = []; 

export const SliderContent = () => {
  return (
    <BlogSliderWrapper>
      <SliderContentVer1Wrapper className="w-full">
        <CarouselCustom>
          {sliderBannersList.map((banner, index) => (
            <div className="flex flex-col pt-20 gap-2 h-[300px] mobile-implement" key={index}>
              <img src={banner} alt={index}/>
            </div>
          ))}
        </CarouselCustom>
      </SliderContentVer1Wrapper>
    </BlogSliderWrapper>
  );
};

