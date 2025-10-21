import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { toastSuccess } from "@/utils/toast";
import { toastError } from "@/utils/toast";

function CategoryList() {
  const navigate = useNavigate()

  const { data: categories, fetchData } = useFetch(`${import.meta.env.VITE_API_URL}/categories`)

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`)
      fetchData()
      toastSuccess("Delete category", "Category has been successfully deleted.")
    } catch (error) {
      console.error("Error deleting category:", error)
      toastError("Delete category", "Category has been failed to delete.")
    }
  }

    const handleEdit = (id) =>{
      navigate(`/admin/category/edit/${id}`);
    }

    const handleCreate = () =>{
      navigate(`/admin/category/create`);
    }

    return (
      <div className="w-full">
        <div className="flex justify-between items-center p-4 md:p-10 mb-6 border-b">
          <h2 className="text-2xl font-semibold">Category management</h2>
          <Button onClick={handleCreate} className="px-4 md:px-8 py-2 rounded-full cursor-pointer">
            + Create category
          </Button>
        </div>
        <div className="flex px-2 md:px-10 justify-between">
          <Input placeholder="Search" className="w-full md:w-75" />
        </div>
        <div className="p-4 md:p-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Category</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {Array.isArray(categories) && categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right flex">
                  <Button onClick={()=>handleEdit(category.id)} variant="ghost" size="sm">
                    <EditIcon />
                  </Button>
                  <Button onClick={()=>handleDelete(category.id)} variant="ghost" size="sm">
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
export default CategoryList