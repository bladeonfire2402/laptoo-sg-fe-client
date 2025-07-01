/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";


export function ProductCard({ product, onClick }: any) {
  //giá tiền sản phẩm sau khi giảm giá
  const discountedPrice = product.minPrice * (1 - product.maxDiscount / 100);

  return (
    <Card className="group overflow-hidden transition-all hover:border-blue-600" onClick={()=> onClick}>
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjhAOEA4Qi4tMkYyLlFUUVRAR0BXUFNMUE1HUVf/2wBDARUXFyAeIB4aGh44ODhXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
          <div className="mt-2">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(discountedPrice)}
            </span>
            {product.maxDiscount > 0 && (
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {formatPrice(product.minPrice)}
                </span>
                <span className="ml-2 text-sm text-red-500">
                  -{product.maxDiscount}%
                </span>
              </>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            {product.soldCount > 0 && <span>Đã bán {product.soldCount}</span>}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
