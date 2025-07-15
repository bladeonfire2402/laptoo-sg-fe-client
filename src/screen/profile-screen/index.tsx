"use client";

import React, { useContext, useEffect, useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from '@/context';
import './styled.css'

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được vượt quá 50 ký tự"),
  address: z.string(),
  phone: z
    .string()
    .regex(/^(\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  gender: z.enum(["male", "female", "other"]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileScreen = () => {
  const { user } = useContext(AppContext);
  
  // Step 1: Initialize state for default form values (using empty placeholders initially)
  const [defaultValues, setDefaultValues] = useState<ProfileFormValues>({
    fullName: '',
    phone: '',
    gender: 'male',
    address: ''
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  // Step 2: Update state only after the component has mounted (on client-side)
  useEffect(() => {
    if (user) {
      setDefaultValues({
        fullName: user.fullName || '',
        phone: user.phone || '',
        gender: user.gender || 'male',
        address: user.address 
      });
      
      form.setValue("phone", user.phone || "");
      form.setValue("fullName", user.fullName || "");
      form.setValue("address", user.address || "");
      form.setValue("gender", user.gender || "male");// Ensure form is updated
    }
  }, [user, form]);

  const onSubmit = async(data: ProfileFormValues) => {
    console.log(data);
    try{
      // hàm update
    }
    catch(e){
      console.log(e)
    }
  };

  // Step 3: Render the component after client-side mount
  if (!user) {
    return null; // Optionally, render a loading spinner or message while data is loading
  }

  return (
    <div className='profile-screen-wrapper'>
      <Card className='px-5 py-5'>
        <CardHeader>
          <CardTitle>Hồ Sơ Của Tôi</CardTitle>
        </CardHeader>
        <CardContent className='flex'>
          <div className="flex flex-col md:flex-row gap-8 w-7/12">
            <div className="">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ và tên" {...field} className='text-black'/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ</FormLabel>
                          <FormControl>
                            <Input placeholder="66/1 Nguyễn Tuyển, Tp Hồ Chí Minh" {...field} type="text" className='text-black'/>
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
                            <Input placeholder="0123456789" {...field} className='text-black' />
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
                  </div>

                  <Button type="submit" className='hover:bg-yellow-500 hover:text-white'>Lưu thay đổi</Button>
                </form>
              </Form>
            </div>

            
          </div>
          <div className='flex items-center w-6/12 justify-center'>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS671hX9LXk6ykl_P5vZzeGBUhKASSFzuD_1w&s'}/>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default ProfileScreen;
