import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchDropdown = ({ data, selectedPost, setSelectedPost, searchKeyword, setSearchKeyword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filtered = data.filter((item) => item.title.toLowerCase().includes(searchKeyword.toLowerCase()));
  const handleSelectPost = (item) => {
    setSelectedPost(item);
    setIsOpen(false);
    setSearchKeyword("");
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setSelectedPost(null);
  };
console.log(selectedPost);
  return (
    <>
      <div className="relative">
        <Search className="absolute right-3 top-2 text-gray-400 cursor-pointer" />
        <Input
          placeholder="Search"
          className="bg-white"
          onClick={() => setIsOpen(!isOpen)}
          value={searchKeyword || selectedPost?.title || ""}
          onChange={handleSearch}
        />
        {isOpen && data?.length > 0 && (
          <div className="w-full absolute border rounded-md top-10 left-0 bg-white z-50">
            {filtered?.map((item) => (
              <div
                key={item.id}
                className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectPost(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default SearchDropdown;
