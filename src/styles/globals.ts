import { Inter } from "next/font/google";

import { createGlobalStyle, css } from "styled-components";
import { device} from './media'

const inter = Inter({ subsets: ["latin"], preload: true, fallback: ["Arial"] });

function renderSpace(type: "margin" | "padding", prefix = "") {
  return [0, 2, 4, 5, 6, 8, 10, 12, 14, 15, 16, 17, 20, 24, 28, 30, 32, 36, 40, 50, 60, 62, 100, 200]
    .map((size) =>
      ["", "-top", "-left", "-bottom", "-right"]
        .map(
          (dir) => `.${prefix}${type.slice(0, 1)}${dir.slice(1, 2)}-${size} { ${type}${dir}: ${size}px !important; }`
        )
        .join("\n")
    )
    .join("\n");
}

export const ScrollBarStyle = css`
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #e3e1e19e;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #666666;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
  }
`;

const style = css`
  :root {
    --font-inter: ${inter.style.fontFamily};
    --font-lora: ${inter.style.fontFamily};
  }

  html,
  body {
    font-family: var(--font-inter);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    width: 100%;
    padding: 0;
    margin: 0;

    scroll-behavior: smooth;

    /* cursor: none !important; */
  }

  body {
    /* overflow: hidden !important; */
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  input,
  textarea,
  select,
  button {
    font-weight: 700;
    line-height: 100%;

    border: 0 none;
    outline: 0 none;
    background: transparent;

    /* cursor: none; */

    :disabled {
      opacity: 1;
    }
  }
  a {
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px;
    letter-spacing: 0;
    font-family: var(--font-lora) !important;
  }

  span {
    font-family: var(--font-inter) !important;
  }

  p {
    font-family: var(--font-inter) !important;
  }

  .body-1 {
    font-size: 16px;
    font-weight: 500;
    line-height: auto;
  }

  .body-2 {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  .body-3 {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }

  p {
    margin: 0px;
    font-weight: 400;
    letter-spacing: 0;
  }

  .full-height {
    height: 100% !important;
  }

  .full-width {
    width: 100% !important;
  }

  .text-light {
    font-weight: 300 !important;
  }

  .text-regular {
    font-weight: 400 !important;
  }

  .text-medium {
    font-weight: 500 !important;
  }

  .text-semibold {
    font-weight: 600 !important;
  }

  .text-bold {
    font-weight: 700 !important;
  }

  .text-center {
    text-align: center;
  }

  .pointer {
    cursor: pointer;
  }

  .relative {
    position: relative;
  }

  .full-height {
    height: 100% !important;
  }

  .hide-mobile {
    @media ${device.mobile} {
      display: none !important;
    }
  }

  .hide-desktop {
    @media ${device.noMobile} {
      display: none !important;
    }
  }

  .primary-color {
    color: #febf00;
  }

  .primary-blue {
    color: #0070f4 !important;
  }

  .transition-ease {
    transition: 1s all ease-in-out;
  }

  .border-t {
    border-top: 2px solid #0070f4;
  }

  .border-transparent {
    border-top: 2px solid transparent;
  }
  .container {
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
  }

  .w-62 {
    width: 62%;

    @media ${device.mobile} {
      width: 100%;
    }
  }
  .text-primary {
    color: #febf00;
  }

  .shadow-pro {
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.2);
  }
  .absolute {
    position: absolute;
  }

  .fw-500 {
    font-weight: 500 !important;
  }

  .fw-700 {
    font-weight: 700 !important;
  }

  .fw-400 {
    font-weight: 400 !important;
  }

  .grey-color {
    color: #525d6a !important;
  }

  .input-container {
    position: relative !important;
  }

  .font-20px {
    font-size: 16px !important;
  }

  .font-16px {
    font-size: 16px !important;
  }

  .font-14px {
    font-size: 14px !important;
  }

  .font-12px {
    font-size: 12px !important;
  }

  .font-18px {
    font-size: 18px !important;
  }

  .no-wrap {
    display: block;
    white-space: nowrap;
  }

  .input2 {
    height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    border: unset !important;
    border-radius: unset !important;
    border-bottom: 1px solid ${({ theme }) => theme.color.status.gray2} !important;
  }

  .input2:focus {
    box-shadow: none !important;
    border-bottom: 2px solid ${({ theme }) => theme.color.status.primary} !important;
    box-shadow: 0 2px 0 #0070f4 !important;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #e3e1e19e;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #666666;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
  }

  ${renderSpace("margin")};
  ${renderSpace("padding")};

  @media ${device.mobile} {
    ${renderSpace("margin", "sm-")};
    ${renderSpace("padding", "sm-")};

    .sm-flex-col {
      flex-direction: column !important;
      align-items: flex-start;
    }
  }

  @media ${device.noDesktop} {
    .md-flex-col {
      flex-direction: column !important;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${style}
  ${ScrollBarStyle}
`;
