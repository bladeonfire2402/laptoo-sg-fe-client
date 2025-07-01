"use client";

import React, { useContext, useEffect, useState } from 'react'
import { ProfileScreenContent, ProfileScreenWrapper } from './styled'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from '@/context';

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được vượt quá 50 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  gender: z.enum(["male", "female", "other"]),
  birthday: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileScreen = () => {
    const [defaultValues, setDefaultValues] = useState<ProfileFormValues>({
        fullName: "Nguyễn Văn A",
        email: "",
        phone: "0123456789",  // Số điện thoại mặc định
        gender: "male",
        birthday: "1990-01-01",
    });

    const { user } = useContext(AppContext);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    });

    // Cập nhật giá trị form khi `user` thay đổi
    useEffect(() => {
        if (user) {
            setDefaultValues(prevValues => ({
                ...prevValues,
                fullName: user.fullName || prevValues.fullName,
                email: user.email || prevValues.email,
                phone: user.phone || prevValues.phone,
                gender: user.gender || prevValues.gender,
                birthday: user.birthday || prevValues.birthday,
            }));

            // Cập nhật giá trị của phone trong form
            form.setValue("phone", user.phone || "");
        }
    }, [user, form]);

    const onSubmit = (data: ProfileFormValues) => {
        console.log(data);
    };

    return (
        <ProfileScreenWrapper>
            <ProfileScreenContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Hồ Sơ Của Tôi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-3/4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Họ và tên</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nhập họ và tên" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="example@gmail.com"
                                                                {...field}
                                                                type="email"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Số điện thoại</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0123456789" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Giới tính</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Chọn giới tính" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="male">Nam</SelectItem>
                                                                <SelectItem value="female">Nữ</SelectItem>
                                                                <SelectItem value="other">Khác</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="birthday"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Ngày sinh</FormLabel>
                                                        <FormControl>
                                                            <Input type="date" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <Button type="submit">Lưu thay đổi</Button>
                                    </form>
                                </Form>
                            </div>

                            <div className="md:w-1/4 flex flex-col items-center space-y-4">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage src={user?.avatarUrl || "/placeholder-avatar.jpg"} alt="Avatar" />
                                    <AvatarFallback>NA</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm">
                                    Chọn ảnh
                                </Button>
                                <p className="text-sm text-gray-500 text-center">
                                    Dụng lượng file tối đa 1 MB
                                    <br />
                                    Định dạng: .JPEG, .PNG
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </ProfileScreenContent>
        </ProfileScreenWrapper>
    );
};

export default ProfileScreen;
