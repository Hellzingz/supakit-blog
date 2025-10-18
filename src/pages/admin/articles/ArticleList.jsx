import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const status = [
  { id: 1, name: "Publish" },
  { id: 2, name: "Draft" },
];

function ArticleList() {

  const navigate = useNavigate();


  const { data, isLoading, error, fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts?page=1&limit=20`
  );

  const { data: categories } = useFetch(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleCreate = () => {
    navigate(`/admin/create`);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
    // getPosts()
    fetchData(); // ใช้ fetchData แทน getPosts
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading articles...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-10 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Article management</h2>
        <Button
          onClick={handleCreate}
          className="px-8 py-2 rounded-full cursor-pointer"
        >
          + Create article
        </Button>
      </div>
      <div className="flex px-10 justify-between">
        <Input placeholder="Search" className="w-75" />
        <div className="flex gap-5">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {status.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.posts?.map((post, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <span className="inline-flex capitalize items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {post.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleEdit(post.id);
                    }}
                  >
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
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
export default ArticleList;
