import styled from "styled-components";

export const BlogBannerWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 400px;
  margin-top: 0px;
  position: relative;

  .absolute-black {
    background-color: black;
  }

  img {
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 576px) {
    .blog-content {
      width: 100% !important ;
    }

    .hide-mobile-blog {
      display: none;
    }
  }
`;
