import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useState } from "react";
function MemberPage() {
  const [manage, setManage] = useState("profile");
  return (
    <div className="container flex justify-center items-center mt-20 mx-auto">
      <div className="flex">
        {/* Sidebar */}
        <aside className="h-auto w-64">
          <div className="flex gap-2">
            <UserRound />
            <p>Username</p>
          </div>
          <nav className="flex flex-col mt-10">
            <p
              onClick={() => setManage("profile")}
              className="hover:bg-gray-700 p-2 rounded"
            >
              Profile
            </p>
            <p
              onClick={() => setManage("reset")}
              className="hover:bg-gray-700 p-2 rounded"
            >
              Reset Password
            </p>
          </nav>
        </aside>

        {/* Content */}
        {manage === "profile" ? 
        // Profile
          <main className="flex-1">
            <h1 className="text-3xl font-bold">Profile</h1>
            <div className="border w-150 rounded-xl shadow-md mt-5">
              <form className="flex flex-col p-8 gap-3">
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
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="border p-2 rounded-md"
                />
                <label htmlFor="email">Email</label>
                <p className="px-5 text-gray-400">supakit_555@hotmail.com</p>
                <Button className="w-[30%] mt-7">Save</Button>
              </form>
            </div>
          </main>
         : 
        //  Reset Password
          <main className="flex-1">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <div className="border w-[40vw] rounded-xl shadow-md mt-5">
              <form className="flex flex-col p-8 gap-3">
                <label htmlFor="currentpass">Current Password</label>
                <input
                  type="text"
                  name="currentpass"
                  className="border p-2 rounded-md"
                />
                <label htmlFor="newPass">New Password</label>
                <input
                  type="text"
                  name="newPass"
                  className="border p-2 rounded-md"
                />
                <label htmlFor="newPass"> Confirm New Password</label>
                <input
                  type="text"
                  name="newPass"
                  className="border p-2 rounded-md"
                />
                <Button className="w-[30%] mt-7">Save</Button>
              </form>
            </div>
          </main>
        }
      </div>
    </div>
  );
}
export default MemberPage;
