import AdminSidebar from "@/components/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 px-0 pt-0">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:min-h-screen w-full sm:max-w-70 md:flex-shrink-0 p-0 bg-[#EFEEEB]">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-0 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout