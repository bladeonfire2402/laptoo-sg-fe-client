/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useContext, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import AppContext from "@/context";

const baseURL = `${process.env.NEXT_PUBLIC_API_PORT}`;

export interface RegisterDto {
  phone: string;
  password: string;
  fullName: string;
  gender: string;
  address: string;
}

export default function RegisterPage() {
  const [resInfo, setResInfo] = useState<RegisterDto>({
    phone: "",
    password: "",
    fullName: "",
    gender: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(AppContext) 

  const router = useRouter();

  const handleChange = (field: keyof RegisterDto, value: string) => {
    setResInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, resInfo);
      // Nếu backend trả JWT và user info, có thể lưu lại hoặc điều hướng
      setUser(response.data)
      router.push("/auth/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="max-w-md py-20">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Đăng ký tài khoản</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tạo tài khoản để mua sắm dễ dàng hơn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <Input
            type="text"
            placeholder="Số điện thoại"
            value={resInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            className="text-black"
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={resInfo.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            className="text-black"
          />
          <Input
            type="text"
            placeholder="Họ và tên"
            value={resInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
            className="text-black"
          />
          <Input
            type="text"
            placeholder="Địa chỉ"
            value={resInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="text-black"
          />
           <label className="text-sm font-medium block">Giới tính</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={resInfo.gender === "Male"}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
              />
              Nam
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={resInfo.gender === "Female"}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
              Nữ
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={resInfo.gender === "Other"}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
              Khác
            </label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Đã có tài khoản?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </Container>
  );
}
