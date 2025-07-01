"use client";

import React from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { CarouselWrapper } from "./styled";


interface CarouselProps {
  children: any;
  height?: number;
  className?: string;
}

const CarouselCustom = ({ children, height = 400, className = "" }: CarouselProps) => {

  return (
    <CarouselWrapper>
      <Carousel
        autoplayDelay={7000}
        loop
        autoplay
        className={`${className}`}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
            className="!absolute bottom-0 -translate-y-2/4 !size-6 bg-gray-700 rounded-full hover:bg-gray-700 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="!absolute bottom-0 left-8 -translate-y-2/4 !size-6 bg-gray-700 rounded-full hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </IconButton>
        )}
      >
        {children}
      </Carousel>
    </CarouselWrapper>
  );
};

export default CarouselCustom;
