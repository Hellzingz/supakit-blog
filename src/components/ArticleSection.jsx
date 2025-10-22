import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import BlogCard from "./BlogCard";
import SearchDropdown from "./SearchDropdown";
import useFetch from "@/hooks/useFetch";
import { ImSpinner2 } from "react-icons/im";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  
  // Scroll container ref
  const scrollContainerRef = useRef(null);

  const { data: postTitles } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts/titles?status=2`
  );

  const { data: categories } = useFetch(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const params = new URLSearchParams({
        searchId: selectedPost?.id,
        keyword: searchKeyword,
        page: page,
        limit: 6,
        category: selectedCategory,
        status: 2,
      });
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts?${params.toString()}`
        );
        const posts = Array.isArray(response.data.posts)
          ? response.data.posts
          : [];

        if (searchKeyword !== "") {
          setPosts(posts);
        }
        if (selectedPost) {
          setPosts(posts);
        }
        setPosts((prevPosts) => [...prevPosts, ...posts]);
        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Failed to fetch posts:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [page, selectedCategory, selectedPost, searchKeyword]);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  function handleCategory(e) {
    e.preventDefault();
    const value = e.target.value === "all" ? "" : e.target.value;
    setSelectedCategory(value);
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }

  // Arrow navigation functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };
  return (
    <section className="py-8 lg:py-16">
      <h2 className="text-4xl mb-5">Latest articles</h2>
      <div className="bg-[#EFEEEB] px-4 py-4 flex flex-col gap-4 sm:flex-row-reverse sm:items-center sm:justify-between rounded-xl">
        <div className="w-full sm:min-w-[200px] sm:max-w-[250px]">
          <SearchDropdown
            data={postTitles}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <div className="sm:hidden w-full">
            <h2 className="mt-2 text-[#75716B]">Category</h2>
            <Select
              value={selectedCategory === "" ? "all" : selectedCategory}
              onValueChange={(value) => {
                const categoryValue = value === "all" ? "" : value;
                setSelectedCategory(categoryValue);
                setPosts([]);
                setPage(1);
                setHasMore(true);
              }}
            >
              <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden sm:flex sm:gap-2 sm:items-center sm:min-w-0 sm:flex-1">
          <button 
            onClick={scrollLeft}
            className="text-[#75716B] hover:text-[#43403B] cursor-pointer hover:bg-[#DAD6D1] rounded-sm p-2 flex-shrink-0"
          >
            <FaArrowLeft />
          </button>
          <div className="relative w-fullflex justify-between items-center min-w-0 overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <button
                value="all"
                disabled={selectedCategory === ""}
                onClick={handleCategory}
                className={`min-w-[100px] px-4 py-3 text-[#75716B] rounded-sm hover:bg-[#DAD6D1] hover:text-[#43403B] whitespace-nowrap flex-shrink-0
                            ${
                              selectedCategory === ""
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "text-[#75716B] hover:bg-[#DAD6D1] hover:text-[#43403B] cursor-pointer"
                            }`}
              >
                All
              </button>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <button
                    key={category.id}
                    value={category.id.toString()}
                    disabled={category.id.toString() === selectedCategory}
                    onClick={handleCategory}
                    className={`min-w-[100px] px-4 py-3 text-[#75716B] rounded-sm hover:bg-[#DAD6D1] hover:text-[#43403B] whitespace-nowrap flex-shrink-0
                              ${
                                category.id.toString() === selectedCategory
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "text-[#75716B] hover:bg-[#DAD6D1] hover:text-[#43403B] cursor-pointer"
                              }`}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>
          <button 
            onClick={scrollRight}
            className="text-[#75716B] hover:text-[#43403B] cursor-pointer hover:bg-[#DAD6D1] rounded-sm p-2 flex-shrink-0"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-10 min-h-[150px]">
        {posts.length > 0 &&
          posts.map((post, index) => (
            <BlogCard key={index} post={post} isLoading={isLoading} />
          ))}
      </div>
      {posts.length === 0 && !isLoading && (
        <div className="text-center text-gray-500">No posts found</div>
      )}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="hover:text-muted-foreground font-medium underline cursor-pointer"
          >
            {isLoading ? (
              <ImSpinner2
                className="flex justify-center items-center animate-spin"
                color="#75716B"
                size={40}
              />
            ) : (
              "View more"
            )}
          </button>
        </div>
      )}
    </section>
  );
}

export default ArticleSection;
