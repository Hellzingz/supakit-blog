import { ImageIcon } from "lucide-react";
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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

function ArticleCreate() {
  const {state} = useAuth()

  
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
    category_id: "",
    status_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  // ฟังก์ชันสำหรับจัดการเมื่อมีการเลือกไฟล์
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // ตรวจสอบประเภทของไฟล์
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    // ตรวจสอบขนาดของไฟล์ (เช่น ขนาดไม่เกิน 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    // เก็บข้อมูลไฟล์
    setImageFile({ file });
  };

  // ฟังก์ชันสำหรับจัดการเมื่อมีการเปลี่ยนแปลงค่าใน input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูลโพสต์
  const handleSave = async (statusId) => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }
    setIsLoading(true);

    

    // สร้าง FormData สำหรับการส่งข้อมูลแบบ multipart/form-data
    const formData = new FormData();

    // เพิ่มข้อมูลทั้งหมดลงใน FormData
    formData.append("title", post.title);
    formData.append("category_id", post.category_id);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", statusId);
    // formData.append("user_id", state.user.id);
    formData.append("imageFile", imageFile.file); // เพิ่มไฟล์รูปภาพ

    try {
      // ส่งข้อมูลไปยัง Backend
      await axios.post(`${import.meta.env.VITE_API_URL}/posts/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ถ้ามีการใช้ token สำหรับการยืนยันตัวตน
        },
      });
      const notificationType = "Published";
      const message = `${notificationType} new article.`;
      await axios.post(`${import.meta.env.VITE_API_URL}/notifications`, {
        type: notificationType,
        target_type: "post",
        actor_id: state.user.id,
        message: message,
      });
      toastSuccess("Created Successfully");
      navigate('/admin')
    } catch (error) {
      console.error("Error creating post:", error);
      toastError("Create Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full mx-auto h-screen bg-gray-100">
      <main className="flex-1 px-4 sm:px-10 bg-white overflow-auto">
        <div className="flex justify-between items-center border-b py-4 sm:py-10 mb-6">
          <h2 className="text-2xl font-semibold">Create article</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="px-4 sm:px-8 py-2 rounded-full cursor-pointer"
              variant="outline"
              onClick={() => handleSave(1)}
              disabled={isLoading}
            >
              Save as draft
            </Button>
            <Button
              className="px-4 sm:px-8 py-2 rounded-full cursor-pointer"
              onClick={() => handleSave(2)}
              disabled={isLoading}
            >
              Save and publish
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
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                <div className="text-center space-y-2">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile.file)}
                      alt="Preview"
                      className="max-w-full max-h-48 object-contain"
                    />
                  ) : (
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  )}
                </div>
              </div>
              <label
                htmlFor="file-upload"
                className="px-8 text-center w-auto py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              >
                <span>Upload thumbnail image</span>
                <input
                  id="file-upload"
                  name="file-upload"
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
            >
              <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Cat</SelectItem>
                <SelectItem value="3">General</SelectItem>
                <SelectItem value="2">Inspiration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="author">Author name</label>
            <Input
              id="author"
              name="author"
              defaultValue={state.user.name}
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
              value={post.title}
              onChange={handleInputChange}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          <div>
            <label htmlFor="description">Description (max 120 letters)</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              value={post.description}
              onChange={handleInputChange}
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
              className="mt-1 mb-5 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
export default ArticleCreate;
