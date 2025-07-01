/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { ProfileMenuWrapper } from "./styled";
import NextLink from "next/link"; // Dùng Next.js Link cho href

interface ProfileMenuProps {
  user?: any;
  profileMenuList?: ProfileMenuItems[];
}

export interface ProfileMenuItems {
  title?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type: "0" | "1" | "2";
}

const ProfileMenu = ({ profileMenuList }: ProfileMenuProps) => {
  const profileItemsType0 = profileMenuList?.filter((am) => am.type === "0");
  const profileItemsType1 = profileMenuList?.filter((am) => am.type === "1");
  const profileItemsType2 = profileMenuList?.filter((am) => am.type === "2");

  return (
    <ProfileMenuWrapper>
      <DropdownMenu>
        {/* Trigger (type "0") */}
        {profileItemsType0?.map((am, i) => (
          <DropdownMenuTrigger asChild key={i}>
            <Button variant="default" className="flex items-center space-x-2 bg-yellow-400">
              <User className="h-5 w-5" />
              <span>{`Khách hàng`}</span>
            </Button>
          </DropdownMenuTrigger>
        ))}

        {/* Dropdown Content */}
        <DropdownMenuContent align="end" className="bg-yellow-400 flex flex-col w-[150px] mt-1 rounded-sm text-white capitalize">
          {/* Type "1" - links */}
          {profileItemsType1?.map((am, i) => (
            <DropdownMenuItem key={i} asChild>
              <NextLink href={am.href || "#"} className="w-full text-center">
                {am.title}
              </NextLink>
            </DropdownMenuItem>
          ))}

          {/* Type "2" - action buttons */}
          {profileItemsType2?.map((am, i) => (
            <DropdownMenuItem key={i} onClick={am.onClick} className="text-center text-white capitalize ">
              {am.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ProfileMenuWrapper>
  );
};

export default ProfileMenu;
