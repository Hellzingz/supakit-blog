import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import BlogCard from "./BlogCard";

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const catagories = ["Highlight", "Cat", "Inspiration", "General"];
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page state
  const [hasMore, setHasMore] = useState(true); // To track if there are more posts to load
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when starting to fetch
    const fetchPosts = async () => {
      const params = new URLSearchParams({
        page: page,
        limit: 6,
        category: selectedCategory,
        status: "publish",
      });
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts?${params.toString()}`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false); // No more posts to load
        }
      } catch (error) {
        console.log("Failed to fetch posts:", error);
        setIsLoading(false); // Set loading to false in case of error
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts(); // Call fetchPosts within useEffect
  }, [page, selectedCategory]);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1); // Increment page number to load more posts
  };

  // const filtered = posts.filter((post) => post.category === selectedCategory);

  function handleCategory(e) {
    e.preventDefault();
    if (e.target.value === "Highlight") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(e.target.value);
    }
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }

  return (
    <section className="container py-8 lg:py-16 mx-auto">
      <h2 className="text-4xl mb-5">Latest articles</h2>
      <div className="bg-[#EFEEEB] px-4 py-4 flex flex-col gap-4 md:flex-row-reverse md:items-center md:justify-between rounded-xl">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute right-3 top-2 text-gray-400 cursor-pointer" />
            <Input placeholder="Search" className="bg-white" />
          </div>
          <div className="md:hidden w-full">
            <h2 className="mt-2 text-[#75716B]">Category</h2>
            <Select
              onValueChange={(value) => {
                setSelectedCategory(value);
                setPosts([]); // Clear posts when category changes
                setPage(1); // Reset page to 1
                setHasMore(true); // Reset "has more" state
              }}
            >
              <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem>Highlight</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Inspiration">Inspiration</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden md:flex md:space-x-2">
          {catagories.map((catagory, index) => (
            <button
              key={index}
              value={catagory}
              disabled={catagory === selectedCategory}
              onClick={handleCategory}
              className={`px-4 py-3 text-[#75716B] rounded-sm hover:bg-[#DAD6D1] hover:text-[#43403B]
                            ${
                              catagory === selectedCategory
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "text-[#75716B] hover:bg-[#DAD6D1] hover:text-[#43403B]"
                            }`}
            >
              {catagory}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} isLoading={isLoading} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="hover:text-muted-foreground font-medium underline"
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}

export default ArticleSection;
