/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useContext, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import AppContext from "@/context";

const baseURL = `${process.env.NEXT_PUBLIC_API_PORT}`;

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        phone,
        password,
      });

      // ✅ Lưu token vào localStorage
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user",JSON.stringify(response.data.user))
      setUser(response.data?.user)

      // ✅ Điều hướng đến trang chủ
      router.push("/");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="max-w-md py-20">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Đăng nhập</h1>
          <p className="text-sm text-gray-500 mt-1">
            Đăng nhập để tiếp tục mua sắm
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="phone">
              Số điện thoại
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại của bạn"
              required
              className="text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Mật khẩu
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              className="text-black"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Chưa có tài khoản?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </Container>
  );
}
