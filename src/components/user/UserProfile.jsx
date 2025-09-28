import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "@/utils/toast";
import axios from "axios";

function UserProfile({ user }) {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    image: ""
  });

  useEffect(() => {
    setProfile({
      id: user?.id,
      name: user?.name,
      username: user?.username,
      email: user?.email,
      image: user?.image,
    });
  }, [user]);
  console.log(profile);



  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // ตรวจสอบประเภทของไฟล์
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handaleSave = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("id", profile.id);
    formData.append("name", profile.name);
    formData.append("username", profile.username);
    formData.append("imageFile", imageFile.file);

    try {
      // ส่งข้อมูลไปยัง Backend
      setIsLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ถ้ามีการใช้ token สำหรับการยืนยันตัวตน
          },
        }
      );
      console.log(res);     
      toastSuccess("Updated Successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      toastError("Update Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="mt-5">
        <form onSubmit={handaleSave} className="flex flex-col gap-3">
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
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="name"
            className="border p-2 rounded-md"
            value={profile.name}
            onChange={handleInputChange}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="border p-2 rounded-md"
            value={profile.username}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <p className="px-5 text-gray-400">{profile?.email || ""}</p>
          <Button disabled={isLoading} className="w-[30%] mt-7">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
export default UserProfile;
