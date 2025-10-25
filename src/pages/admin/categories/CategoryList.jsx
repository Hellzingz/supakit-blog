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
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";

function CategoryList() {
  const navigate = useNavigate();

  const {
    data: categories,
    fetchData,
    isLoading,
  } = useFetch(`${import.meta.env.VITE_API_URL}/categories`);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      fetchData();
      toastSuccess(
        "Delete category",
        "Category has been successfully deleted."
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      toastError("Delete category", "Category has been failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/category/edit/${id}`);
  };

  const handleCreate = () => {
    navigate(`/admin/category/create`);
  };

  const handleDeleteClick = (id) => {
    setShowConfirmModal(true);
    setCategoryId(id);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 md:p-10 mb-6 border-b">
        <h2 className="text-2xl font-semibold">Category management</h2>
        <Button
          onClick={handleCreate}
          className="px-4 md:px-8 py-2 rounded-full cursor-pointer"
        >
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <PropagateLoader color="#000000" size={30} />
              </div>
            ) : (
              Array.isArray(categories) &&
              categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-right flex">
                    <Button
                      onClick={() => handleEdit(category.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(category.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        isOpen={showConfirmModal}
        setIsOpen={setShowConfirmModal}
        title="Delete category"
        description="Do you want to delete this category?"
        onConfirm={() => handleDelete(categoryId)}
        onCancel={() => setShowConfirmModal(false)}
        confirmText="Delete"
      />
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="relative p-8 flex flex-col items-center gap-10">
            <PropagateLoader color="#000000" size={30} />
            <p className="text-gray-800 font-medium">
              Deleting category
              <span className="text-xl animate-pulse">...</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default CategoryList;
