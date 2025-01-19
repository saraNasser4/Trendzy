"use client"

import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function SearchForm() {
  const router = useRouter();
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const inputSearch = formData.get("input-search") as string;
    
    if (inputSearch){
      router.push(`/list?name=${inputSearch}`) 
      e.target.children[0].value = ""
    }
  }

  return (
    <form onSubmit={(e)=> handleSubmit(e)} className='hidden xl:block relative text-black/90'>
      <input name="input-search" autoComplete="off" className="max-w-[250px] min-w-full py-1 px-2 rounded-xl outline-none" placeholder="Search" type="text"/>
      <button className="absolute top-[6px] right-2 hover:text-primary">
        <IoSearch size={20}/>
      </button>
    </form>
  )
}
