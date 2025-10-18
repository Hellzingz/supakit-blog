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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import ConfirmModal from "@/components/ConfirmModal";
import { toastSuccess } from "@/utils/toast";

const statusData = [
  { id: 2, name: "Publish" },
  { id: 1, name: "Draft" },
];

function ArticleList() {
  // ===== STATE MANAGEMENT =====
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  
  // Filter states
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [articleId, setArticleId] = useState(null);

  // ===== API DATA FETCHING =====
  // Build query parameters for posts API
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  params.set("category", category);
  params.set("keyword", search);
  params.set("status", status);
  const url = `${import.meta.env.VITE_API_URL}/posts?${params.toString()}`;
  
  // Fetch posts data with filters
  const { data, isLoading, error, fetchData } = useFetch(url);

  // Fetch categories for filter dropdown
  const { data: categories } = useFetch(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  // ===== EVENT HANDLERS =====
  // Navigate to edit article page
  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  // Navigate to create article page
  const handleCreate = () => {
    navigate(`/admin/create`);
  };

  // Delete article and refresh data
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
    setShowConfirmModal(false);
    setArticleId(null);
    fetchData(); // Refresh the posts list
    toastSuccess("Post deleted successfully");
  };

  const handleDeleteClick = (id) => {
    setShowConfirmModal(true);
    setArticleId(id);
  };

  // ===== LOADING & ERROR STATES =====
  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading articles...</div>
        </div>
      </div>
    );
  }

  // Show error message if API call fails
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
              {statusData?.map((status) => (
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
              {categories?.map((category) => (
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
            {data?.posts?.map((post, index) => (
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
                  {/* Edit button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleEdit(post.id);
                    }}
                  >
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  
                  {/* Delete button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(post.id)}
                  >
                    <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
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
