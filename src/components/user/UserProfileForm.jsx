import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { toastSuccess, toastError } from "@/utils/toast";
import { userProfileSchema, validateData } from "@/utils/validate";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { PropagateLoader } from "react-spinners";

function UserProfileForm() {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    image: "",
  });
  const { state } = useAuth();
  const user = state?.user;
  useEffect(() => {
    setProfile({
      id: user?.id,
      name: user?.name,
      username: user?.username,
      email: user?.email,
      image: user?.profilePic || user?.image,
    });
  }, [user]);

  const getAvatarDisplay = (size = "w-24 h-24", marginRight = "mr-4") => {
    if (imageFile) {
      return (
        <Avatar
          className={`${size} ${marginRight} flex items-center justify-center rounded-full bg-gray-200`}
        >
          <img
            src={URL.createObjectURL(imageFile.file)}
            alt="Preview"
            className="object-cover rounded-full w-full h-full"
          />
        </Avatar>
      );
    }

    if (profile.image) {
      return (
        <Avatar
          className={`${size} ${marginRight} flex items-center justify-center rounded-full bg-gray-200`}
        >
          <img
            src={profile.image}
            alt="profile-pic"
            className="object-cover rounded-full w-full h-full"
          />
        </Avatar>
      );
    }

    return (
      <Avatar
        className={`${size} ${marginRight} flex items-center justify-center rounded-full bg-gray-200`}
      >
        <span className="text-gray-500 text-xl font-semibold">
          {user?.name?.charAt(0)}
        </span>
      </Avatar>
    );
  };

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
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = async () => {
    const validation = validateData(userProfileSchema, {
      name: profile.name,
      username: profile.username,
      email: profile.email,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    return true;
  };

  const handaleSave = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    try {
      setIsLoading(true);
      if (imageFile?.file) {
        const formData = new FormData();
        formData.append("id", profile.id);
        formData.append("name", profile.name);
        formData.append("username", profile.username);
        formData.append("imageFile", imageFile.file);

        await axios.put(
          `${import.meta.env.VITE_API_URL}/auth/update-user-profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/auth/update-user-profile`,
          {
            id: profile.id,
            name: profile.name,
            username: profile.username,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      toastSuccess("Updated Successfully");
      setImageFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toastError("Update Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="sm:hidden flex items-center gap-2 border-r-2 border-gray-200 pr-4">
          {getAvatarDisplay("w-10 h-10", "mr-0")}
          <span className="text-xl font-semibold text-gray-500">
            {user?.name}
          </span>
        </div>
        <span className="text-xl sm:text-2xl font-semibold">Profile</span>
      </div>
      <div className="bg-gray-100 rounded-xl p-4 sm:p-10 mt-5">
        <form onSubmit={handaleSave} className="flex flex-col gap-3">
          <div className="flex items-center mb-6">
            {getAvatarDisplay()}

            <Button asChild>
              <div className="relative">
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button className="w-full max-w-50 cursor-pointer">
                  Choose Profile Picture
                </Button>
              </div>
            </Button>
          </div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className={`border p-2 rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Enter your name (4-20 characters, English only)"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className={`border p-2 rounded-md ${
              errors.username ? "border-red-500" : ""
            }`}
            value={profile.username}
            onChange={handleInputChange}
            placeholder="Enter username (4-15 characters, letters and numbers only)"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            disabled
            type="email"
            name="email"
            className={`border p-2 rounded-md disabled:opacity-50 ${
              errors.email ? "border-red-500" : ""
            }`}
            value={profile.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <Button disabled={isLoading} className="w-[30%] mt-7">
            Save
          </Button>
        </form>
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="relative p-8 flex flex-col items-center gap-10">
            <PropagateLoader color="#000000" size={30} />
            <p className="text-gray-800 font-medium">
              Updating profile<span className="text-xl animate-pulse">...</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserProfileForm;
