import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "@/utils/toast";
import { toastError } from "@/utils/toast";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreate = async () => {
    try{
        setIsLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/categories`, {
            name: categoryName
        });
        toastSuccess("Create category", "Category has been successfully created.");
        navigate("/admin/category");
        setIsLoading(false);
    }catch(error){
        console.error("Error creating category:", error);
        toastError("Create category", "Category has been failed to create.");
        setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 md:p-10 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Create Category</h2>
        <Button
          onClick={handleCreate}
          className="px-4 md:px-8 py-2 rounded-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className="p-4 md:p-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="categoryName" className="text-md font-medium">
            Category Name
          </label>
          <Input 
          placeholder="Category Name" 
          className="max-w-[480px]" 
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default CreateCategory;
