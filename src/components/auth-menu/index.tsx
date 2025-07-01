import React from 'react'
import { AuthMenuWrapper } from './styled'
import { useRouter } from 'next/navigation';
import CustomButton from '../custom-button';
import { User, UserCircle2 } from 'lucide-react';

const AuthMenu = () => {
  const router = useRouter();
  return (
    <AuthMenuWrapper>
      <CustomButton text='Login' version={0} onClick={()=>router.push('/auth/login')} Icon={<User size={14}/>}/>
      <CustomButton text='Register' version={0} onClick={()=>router.push('/auth/register')} Icon={<UserCircle2 size={14}/>} />
    </AuthMenuWrapper>
  )
}

export default AuthMenu