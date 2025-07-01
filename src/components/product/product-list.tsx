/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { Loader2 } from "lucide-react";
import { productApi } from "@/utils/productApi";

export function ProductList() {
  const [productList, setProductList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productApi.getProducts({ pageNumber: 1, pageSize: 10 });
      setProductList(response.data?.data || []);
    } catch (err: any) {
      console.error("Error loading products:", err);
      setError(err.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const setWatched  = (productId: any, e: any) => {
    e.preventDefault()
    //Khởi tạo watched
    const watchedStorage = localStorage.getItem("watched")
    if(!watchedStorage){localStorage.setItem('watched',JSON.stringify([]))}

    let isIn: boolean;
    //
    if(watchedStorage){
      const watched = JSON.parse(watchedStorage)
      isIn = watched.includes(productId)
      if(!isIn){
        watched.push(productId)
        const fix= JSON.stringify(watched)
        localStorage.setItem('watched',fix)
      }
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} onClick={(e)=>{setWatched(product.slug,e)}} />
        ))}
      </div>
    </div>
  );
}
