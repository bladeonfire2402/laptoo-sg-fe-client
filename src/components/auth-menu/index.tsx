import React from 'react'
import { useRouter } from 'next/navigation';
import { UserCircle2 } from 'lucide-react';
import './styled.css'

const AuthMenu = () => {
  const router = useRouter();
  return (
    <div className='flex w-[100px]  gap-2 items-center cusor-pointer auth-menu-wrapper' 
    onClick={()=>{router.push('/auth/register')}}>
      <UserCircle2 size={30} color='white'/>
      <div className='text-white text-[12px]'>
        <p className='cusor-pointer'>Đăng kí</p>
        <p className='cusor-pointer'>Đăng nhập</p>
      </div>
    </div>
  )
}

export default AuthMenu