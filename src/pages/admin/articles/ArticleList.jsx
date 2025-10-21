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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import ConfirmModal from "@/components/ConfirmModal";
import { toastSuccess } from "@/utils/toast";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { EditIcon } from "@/components/icons/EditIcon";

const statusData = [
  { id: 2, name: "Publish" },
  { id: 1, name: "Draft" },
];

function ArticleList() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [articleId, setArticleId] = useState(null);

  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  params.set("category", category);
  params.set("keyword", search);
  params.set("status", status);
  const url = `${import.meta.env.VITE_API_URL}/posts?${params.toString()}`;
  
  const { data, isLoading, error, fetchData } = useFetch(url);

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
    setShowConfirmModal(false);
    setArticleId(null);
    fetchData();
    toastSuccess("Post deleted successfully");
  };

  const handleDeleteClick = (id) => {
    setShowConfirmModal(true);
    setArticleId(id);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading articles...</div>
        </div>
      </div>
    );
  }

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
      <div className="flex justify-between items-center p-4 md:p-10 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Article management</h2>
        <Button
          onClick={handleCreate}
          className="px-8 py-2 rounded-full cursor-pointer"
        >
          + Create article
        </Button>
      </div>

      {/* Search input and filter dropdowns */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-2 px-2 md:px-10 justify-between">
        <Input placeholder="Search" className="w-full md:max-w-75" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex gap-2">
          {/* Status filter dropdown */}
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-full md:max-w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(statusData) && statusData.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Category filter dropdown */}
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-full md:max-w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(categories) && categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* ===== ARTICLES TABLE ===== */}
      <div className="p-4 md:p-10">
        <Table>
          {/* Table header with column titles */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          {/* Table body with article data */}
          <TableBody>
            {Array.isArray(data?.posts) && data.posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <span className="inline-flex capitalize items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {post.status}
                  </span>
                </TableCell>
                
                {/* Action buttons column */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleEdit(post.id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(post.id)}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title="Delete Article"
          description="Are you sure you want to delete this article?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => handleDelete(articleId)}
        />
      )}
    </div>
  );
}
export default ArticleList;
