import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { toastSuccess, toastError } from "@/utils/toast"

function AdminCategoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState({name: ''})
  const [isLoading, setIsLoading] = useState(false)


  // Get category data from server
  useEffect(() => {
    const getCategory = async () => {
      try {
        const {data} = await axios.get(`http://localhost:4000/categories/${id}`)
        setCategory(data)
      } catch (error) {
        console.error("Error fetching category:", error)
        toastError("Failed to load category")
      }
    }
    getCategory()
  }, [id])

  console.log(category);
  

  

  // Update category
  const handleSave = async () => {
    if (!category.name.trim()) {
      toastError("Category name is required")
      return
    }

    setIsLoading(true)
    try {
      await axios.put(`http://localhost:4000/categories/${id}`, {
        name: category.name
      })
      toastSuccess("Category updated successfully")
      navigate("/admin/category")
    } catch (error) {
      console.error("Error updating category:", error)
      toastError("Failed to update category")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-10 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Edit Category</h2>
        <Button 
          className="px-8 py-2 rounded-full cursor-pointer"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className="p-10">
        <div className="max-w-md">
          <label htmlFor="categoryName" className="block text-sm font-medium mb-2">
            Category Name
          </label>
          <Input
            id="categoryName"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            placeholder="Enter category name"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminCategoryEdit