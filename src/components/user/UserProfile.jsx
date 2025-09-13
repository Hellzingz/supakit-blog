import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function UserProfile({ state, setUser, user }) {
  const [formValues, setFormValues] = useState({ name: "", username: "" });
  useEffect(() => {
    setUser(state.user);
    setFormValues({
      name: state.user?.name || "",
      username: state.user?.username || "",
    });
  }, [state.user]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="mt-5">
        <form className="flex flex-col gap-3">
            <div>
              <Button asChild>
                <input className="hidden" type="file" />
              </Button>
            </div>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name="name"
              className="border p-2 rounded-md"
              value={formValues.name}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="border p-2 rounded-md"
              value={formValues.username}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <label htmlFor="email">Email</label>
            <p className="px-5 text-gray-400">{user?.email || ""}</p>
            <Button className="w-[30%] mt-7">Save</Button>
        </form>
      </div>
    </div>
  );
}
export default UserProfile;
