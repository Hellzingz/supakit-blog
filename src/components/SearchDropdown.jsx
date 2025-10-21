import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const SearchDropdown = ({ data, selectedPost, setSelectedPost, searchKeyword, setSearchKeyword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filtered = data?.filter((item) => item.title.toLowerCase().includes(searchKeyword.toLowerCase())) || [];
  
  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false);
  }, isOpen);
  
  const handleSelectPost = (item) => {
    setSelectedPost(item);
    setIsOpen(false);
    setSearchKeyword("");
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setSelectedPost(null);
  };
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <Search className="absolute right-3 top-2 text-gray-400 cursor-pointer" />
        <Input
          placeholder="Search"
          className="bg-white"
          onClick={() => setIsOpen(!isOpen)}
          value={searchKeyword || selectedPost?.title || ""}
          onChange={handleSearch}
        />
        {isOpen && (
          <div className="w-full absolute border rounded-md top-10 left-0 bg-white z-50">
            {!data ? (
              <div className="w-full px-4 py-2 text-gray-500">Loading...</div>
            ) : filtered?.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectPost(item)}
                >
                  {item.title}
                </div>
              ))
            ) : (
              <div className="w-full px-4 py-2 text-gray-500">No posts found</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default SearchDropdown;
