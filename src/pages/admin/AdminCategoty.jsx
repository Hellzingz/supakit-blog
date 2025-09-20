import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

function AdminCategoty() {
  const navigate = useNavigate()
  const {id} = useParams()

  // Get categories using useFetch
  const { data: categories, fetchData } = useFetch(`${import.meta.env.VITE_API_URL}/categories`)

  const handleDelete = async()=>{
    await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`)
    fetchData() // Refresh data after delete
  }

    const handleEdit = (id) =>{
      navigate(`/admin/category/edit/${id}`);
    }

    return (
      <div className="w-full">
        <div className="flex justify-between items-center p-10 mb-6 border-b">
          <h2 className="text-2xl font-semibold">Category management</h2>
          <Button className="px-8 py-2 rounded-full cursor-pointer">
            + Create category
          </Button>
        </div>
        <div className="flex px-10 justify-between">
          <Input placeholder="Search" className="w-75" />
        </div>
        <div className="p-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Category</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right flex">
                  <Button onClick={()=>handleEdit(category.id)} variant="ghost" size="sm">
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button onClick={()=>handleDelete(category.id)} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
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
export default AdminCategoty