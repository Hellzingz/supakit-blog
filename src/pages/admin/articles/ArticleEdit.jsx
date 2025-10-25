import { Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toastSuccess, toastError } from "@/utils/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import PropagateLoader from "react-spinners/PropagateLoader";

function ArticleEdit() {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [post, setPost] = useState({
    image: "",
    title: "",
    description: "",
    content: "",
    category_id: "",
    status_id: "",
    user_id: "",
  });

  const { data: categories } = useFetch(
    `${import.meta.env.VITE_API_URL}/categories`
  );

  const handleDeleteClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      toastSuccess("Deleted Successfully");
      navigate("/admin/articles");
    } catch (error) {
      console.error("Error deleting post:", error);
      toastError("Deleted Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const { data: postData } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts/${id}`
  );

  useEffect(() => {
    if (postData) {
      setPost({
        title: postData?.title || "",
        description: postData?.description || "",
        content: postData?.content || "",
        category_id: postData?.category?.id || "",
        status_id: postData?.status?.id || "",
        user_id: postData?.user?.id || "",
      });
    }
  }, [postData]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    setImageFile({ file });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (statusId) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("user_id", postData?.user?.id || post.user_id);
    formData.append("category_id", post.category_id);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", statusId);

    if (imageFile) {
      formData.append("imageFile", imageFile.file);
    } else if (postData?.image && postData.image.trim() !== "") {
      formData.append("image", postData.image);
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toastSuccess("Edited Successfully");
      navigate("/admin/articles");
    } catch (error) {
      console.error("Error edited post:", error);
      toastError("Edited Failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="relative p-8 flex flex-col items-center gap-10">
            <PropagateLoader color="#000000" size={30} />
            <p className="text-gray-800 font-medium">
              Saving article<span className="text-xl animate-pulse">...</span>
            </p>
          </div>
        </div>
      )}
      <main className="flex-1 py-5 px-4 md:px-10 bg-white overflow-auto">
        <div className="w-full flex justify-between items-center border-b py-4 md:py-10 mb-6">
          <h2 className="text-2xl font-semibold">
            Edit article {id ? `#${id}` : ""}
          </h2>
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              disabled={isLoading}
              onClick={() => handleSave(1)}
              className="px-4 md:px-8 py-2 rounded-full cursor-pointer"
              variant="outline"
            >
              Save as draft
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => handleSave(2)}
              className="px-4 md:px-8 py-2 rounded-full cursor-pointer"
            >
              Save
            </Button>
          </div>
        </div>

        <form className="space-y-7 max-w-4xl">
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-gray-700 font-medium mb-2"
            >
              Thumbnail image
            </label>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-2 space-x-4">
              <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                <div className="text-center space-y-2">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile.file)}
                      alt="Preview"
                      className="max-w-full max-h-48 object-contain"
                    />
                  ) : (
                    postData.image && (
                      <img
                        className="max-w-full max-h-48 object-contain"
                        src={postData.image}
                        alt="Article thumbnail"
                      />
                    )
                  )}
                </div>
              </div>
              <label
                htmlFor="file-upload"
                className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              >
                <span>Upload image</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  value=""
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <Select
              onValueChange={(value) =>
                setPost({ ...post, category_id: Number(value) })
              }
              value={
                (Array.isArray(categories) &&
                  categories?.find((cat) => cat.id === post.category_id)?.id) ||
                ""
              }
            >
              <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                <SelectValue placeholder="Select category"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="author">Author name</label>
            <Input
              id="author"
              defaultValue={postData?.user?.name}
              className="mt-1 max-w-lg"
              disabled
            />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="Article title"
              onChange={handleInputChange}
              value={post.title}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          <div>
            <label htmlFor="introduction">Introduction (max 120 letters)</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              onChange={handleInputChange}
              value={post.description}
              rows={3}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <Textarea
              id="content"
              name="content"
              placeholder="Content"
              value={post.content}
              onChange={handleInputChange}
              rows={20}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </form>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-4"
        >
          <Trash2 className="h-5 w-5" />
          Delete article
        </button>
      </main>
      {showConfirmModal && (
        <ConfirmDialog
          title="Delete Article"
          description="Are you sure you want to delete this article?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => handleDeleteClick(id)}
          isOpen={showConfirmModal}
          setIsOpen={setShowConfirmModal}
        />
      )}
    </div>
  );
}
export default ArticleEdit;
