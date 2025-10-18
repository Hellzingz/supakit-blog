import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { toastSuccess, toastError } from "@/utils/toast";
import axios from "axios";
function AdminProfile() {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const { state } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfile({
      id: state?.user.id,
      name: state?.user.name,
      username: state?.user.username,
      email: state?.user.email,
      bio: state?.user.bio,
      image: state?.user.profilePic,
    });
  }, []);

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
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูลโพสต์
  const handleSave = async () => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }
    setIsLoading(true);

    // สร้าง FormData สำหรับการส่งข้อมูลแบบ multipart/form-data
    const formData = new FormData();

    // เพิ่มข้อมูลทั้งหมดลงใน FormData
    formData.append("id", profile.id);
    formData.append("name", profile.name);
    formData.append("username", profile.username);
    formData.append("bio", profile.bio);
    formData.append("imageFile", imageFile.file); // เพิ่มไฟล์รูปภาพ

    try {
      // ส่งข้อมูลไปยัง Backend
      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ถ้ามีการใช้ token สำหรับการยืนยันตัวตน
          },
        }
      );
      toastSuccess("Updated Successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      toastError("Update Failed");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(profile);

  return (
    <div className="flex w-full bg-gray-100">
      <main className="flex-1 p-10 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <Button
            onClick={handleSave}
            className="px-8 py-2 rounded-full cursor-pointer"
            disabled={isLoading}
          >
            Save
          </Button>
        </div>

        <div>
          <div className="flex items-center mb-6">
            <Avatar className="w-24 h-24 mr-4">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile.file)}
                  alt="Preview"
                  className="max-w-full max-h-48 object-contain"
                />
              ) : (
                <div>
                  <img
                    src={profile.image}
                    alt="prolfile-pic"
                    className="max-w-full max-h-48 object-contain"
                  />
                </div>
              )}
            </Avatar>
            <Button asChild>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
          </div>

          <form className="space-y-7 max-w-2xl">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                value={profile.name}
                id="name"
                name="name"
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                onChange={handleInputChange}
                value={profile.username}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                disabled
                type="email"
                value={profile.email}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <Textarea
                id="bio"
                name="bio"
                onChange={handleInputChange}
                value={profile.bio || "No bio available"}
                rows={10}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default AdminProfile;
