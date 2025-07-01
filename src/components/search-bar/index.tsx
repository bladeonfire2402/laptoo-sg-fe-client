"use client";

import { useRouter } from "next/navigation";
import { SearchBarWrapper } from "./styled";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";


const SearchBar = () => {
    const router = useRouter(); // tối sửa
    const [keyword, setKeyWord] = useState<string>("");
    return(
        <SearchBarWrapper>
            <div className="w-full max-w-2xl">
                <div className="relative">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      router.push(`/search?keyword=${keyword}`);
                    }}
                  >
                    <Input
                      onChange={(e) => setKeyWord(e.target.value)}
                      type="search"
                      placeholder="Search for products..."
                      className="w-full rounded-full border-2 text-white border-[#ffd500] pl-4 pr-12 focus:border-[#ffd500]"
                    />
                    <Button
                      type="submit"
                      className="absolute right-0 top-0 h-full rounded-r-full bg-[#ffd500] px-6 hover:bg-[#ffd500]"
                    >
                      <Search className="h-5 w-5 text-white" />
                    </Button>
                  </form>
                </div>
              </div>
        </SearchBarWrapper>
    )
}

export default SearchBar;