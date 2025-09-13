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
import { useEffect, useState } from "react";
function AdminCategoty() {

  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const {id} = useParams()

    const getData = async()=>{
      const {data} = await axios.get("http://localhost:4000/categories")
      setCategories(data)
    }

    const handleDelete = async()=>{
      await axios.delete(`http://localhost:4000/categories/${id}`)
    }

    useEffect(()=>{
      getData()
    },[])

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