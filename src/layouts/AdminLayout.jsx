import AdminSidebar from "@/components/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 px-0 md:px-4 pt-0 md:pt-6">
      <div className="flex flex-col md:flex-row md:gap-6 h-full">
        <aside className="w-full md:w-64 md:flex-shrink-0 md:border md:rounded-xl p-0 bg-white shadow-sm md:h-fit">
          <AdminSidebar />
        </aside>
        <main className="flex-1 border md:rounded-xl shadow-md p-0 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout