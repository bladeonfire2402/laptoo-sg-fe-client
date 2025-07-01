import styled from "styled-components";

export const BlogSliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  padding-left: 8.5%;
  padding-right: 10%;
  background-color: #000000;

  @media (max-width: 1200px) {
    h1 {
      font-size: 30px;
    }

    .subtitle {
      font-size: 20px;
    }
  }

  @media (max-width: 576px) {
    padding-left: 0px;
    padding-right: 10px;

    h1 {
      font-size: 32px;
      text-align: center;
    }

    .subtitle {
      font-size: 24px;
    }
  }
`;

export const SliderContentVer1Wrapper = styled.div`
  display: flex;

  @media (max-width: 576px) {
    width: 100%;

    .mobile-implement {
      width: 100%;
      justify-content: center;
      height: 300px !important;
    }
  }
`;

export const SliderContentVer2Wrapper = styled.div`
  @media (max-width: 576px) {
    justify-content: center;
  }
`;
