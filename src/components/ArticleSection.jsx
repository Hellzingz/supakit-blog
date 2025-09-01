import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';
import { blogPosts } from '../data/blogPosts';

function ArticleSection() {

    const [selectedCategory,setSelectedCategory] = useState("Highlight")
    const catagories = ["Highlight", "Cat", "Inspiration", "General"]


    const filtered = blogPosts.filter(post=>post.category === selectedCategory)

    function handleCatagory(e){
        e.preventDefault()
        setSelectedCategory(e.target.value)
    }

  return (
    <section className='container px-13 py-8 lg:py-16 mx-auto'>
        <h2 className='text-4xl mb-5'>Latest articles</h2>
            <div className='bg-[#EFEEEB] px-4 py-4 flex flex-col gap-4 md:flex-row-reverse md:items-center md:justify-between rounded-xl'>
                <div className='w-full md:w-1/3'>
                    <div className='relative'>
                        <Search className='absolute right-3 top-2 text-gray-400 cursor-pointer'/>
                        <Input placeholder="Search" className="bg-white"/>
                    </div>
                    <div className='md:hidden w-full'>
                        <h2 className='mt-2 text-[#75716B]'>Category</h2>
                        <Select onValueChange={(value) => {setSelectedCategory(value)}}>
                            <SelectTrigger className="w-full py-3 rounded-sm text-muted-foregroun bg-white">
                            <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Highlight">Highlight</SelectItem>
                            <SelectItem value="Cat">Cat</SelectItem>
                            <SelectItem value="Inspiration">Inspiration</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='hidden md:flex md:space-x-2'>
                    {catagories.map((catagory,index)=>(
                        <button key={index} value={catagory} disabled={catagory === selectedCategory} onClick={handleCatagory} 
                        className={`px-4 py-3 text-[#75716B] rounded-sm hover:bg-[#DAD6D1] hover:text-[#43403B]
                            ${catagory === selectedCategory 
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                                : "text-[#75716B] hover:bg-[#DAD6D1] hover:text-[#43403B]"}`}>{catagory}</button>
                    ))}
                        
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
                { selectedCategory === "Highlight" ?
                blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
                )) :
                filtered.map((post, index) => (
                <BlogCard key={index} post={post} />
                ))
            }

            </div>
    </section>
  )
}

export default ArticleSection