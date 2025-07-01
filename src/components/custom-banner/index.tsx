"use Client";

import { BlogBannerWrapper } from "./styled";
import { SliderContent } from "../custom-slider";

const BlogBanner = () => {
  return (
    <BlogBannerWrapper>
      <div className="w-full flex">
        <SliderContent/>
      </div>
    </BlogBannerWrapper>
  );
};

export default BlogBanner;
