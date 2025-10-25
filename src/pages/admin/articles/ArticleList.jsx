import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { toastSuccess } from "@/utils/toast";
import AdminArticleTable from "@/components/AdminArticleTable";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ImSpinner2 } from "react-icons/im";

const statusData = [
  { id: 2, name: "Publish" },
  { id: 1, name: "Draft" },
];

function ArticleList() {
  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const [articleId, setArticleId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const limit = 10;

  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  params.set("category", category);
  params.set("keyword", search);
  params.set("status", status);
  const url = `${import.meta.env.VITE_API_URL}/posts?${params.toString()}`;

  const { data, isLoading, fetchData } = useFetch(url);

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
    try {
      setIsDeleting(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      setIsDeleting(false);
      setArticleId(null);
      fetchData();
      toastSuccess("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setIsDeleting(true);
    setArticleId(id);
  };

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
        <Input
          placeholder="Search"
          className="w-full md:w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {/* Status filter dropdown */}
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-full md:w-40 cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-muted-foreground cursor-pointer">All status</SelectItem>
              {Array.isArray(statusData) &&
                statusData.map((status) => (
                  <SelectItem className="cursor-pointer" key={status.id} value={status.id.toString()}>
                    {status.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {/* Category filter dropdown */}
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-full md:w-40 cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-muted-foreground cursor-pointer">All categories</SelectItem>
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <SelectItem className="cursor-pointer" key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* ===== ARTICLES TABLE ===== */}
      <AdminArticleTable
        data={data}
        isLoading={isLoading}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
        setPage={setPage}
        page={page}
      />
      {isDeleting && (
        <ConfirmDialog
          title="Delete Article"
          description="Are you sure you want to delete this article?"
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => handleDelete(articleId)}
          isOpen={isDeleting}
          setIsOpen={setIsDeleting}
        />
      )}
    </div>
  );
}
export default ArticleList;
