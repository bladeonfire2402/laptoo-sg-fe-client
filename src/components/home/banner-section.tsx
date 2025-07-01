"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerImages = [
  {
    src: "/banners/banner7.jpg",
    alt: "Thiết Bị Điện Hạ Thế",
    href: "/promo/voltage",
  },
  {
    src: "/banners/banner3.png",
    alt: "Khuyến Mãi Đặc Biệt",
    href: "/promo/deals",
  },
  {
    src: "/banners/banner8.jpg",
    alt: "Hàng Mới Về",
    href: "/promo/new",
  },
];

export function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto pt-4">
        <div className="md:col-span-2 lg:col-span-3 relative rounded-lg overflow-hidden">
            <div className="relative h-[300px] w-full">
              {bannerImages.map((banner, index) => (
                <Link
                  key={banner.href}
                  href={banner.href}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </Link>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
