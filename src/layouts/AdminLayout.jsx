import AdminSidebar from "@/components/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 md:flex-shrink-0">
            <div className="border rounded-xl p-4 bg-white shadow-sm">
              <AdminSidebar />
            </div>
          </aside>
          <main className="flex-1">
            <div className="w-full border rounded-xl shadow-md p-8 bg-white">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout