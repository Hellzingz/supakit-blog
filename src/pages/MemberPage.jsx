import UserProfile from "@/components/user/UserProfile";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import ResetPassword from "@/components/user/ResetPassword";

function MemberPage() {
  const { state } = useAuth();
  const [user, setUser] = useState(state.user);
  const [manage, setManage] = useState("profile");
  return (
    <div className="container mx-auto mt-20">
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 w-full items-stretch">
        {/* Sidebar */}
        <aside className="h-auto w-full md:w-64 md:flex-shrink-0 border rounded-xl p-4 min-h-[520px]">
          <div className="flex items-center gap-2">
            <UserRound />
            <p className="truncate">{user?.username || ""}</p>
          </div>
          <nav className="flex flex-col mt-6">
            <p
              onClick={() => setManage("profile")}
              className={`p-2 rounded cursor-pointer transition-colors ${
                manage === "profile" ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`}
              role="button"
              tabIndex={0}
            >
              Profile
            </p>
            <p
              onClick={() => setManage("reset")}
              className={`p-2 rounded cursor-pointer transition-colors mt-2 ${
                manage === "reset" ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`}
              role="button"
              tabIndex={0}
            >
              Reset Password
            </p>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1">
          <div className="w-full min-h-[520px] max-w-3xl border rounded-xl shadow-md p-8 md:mt-0 mx-auto md:mx-0">
            {manage === "profile" ? (
              <UserProfile state={state} user={user} setUser={setUser} />
            ) : (
              <ResetPassword />
            )}
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}
export default MemberPage;
