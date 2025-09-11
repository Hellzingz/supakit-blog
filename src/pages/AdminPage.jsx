import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminArticle from "@/components/admin/AdminArticle";
import AdminCategoty from "@/components/admin/AdminCategoty";
import AdminCreate from "@/components/admin/AdminCreate";
import AdminNotification from "@/components/admin/AdminNotification";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminEdit from "@/components/admin/AdminEdit";
import AdminReset from "@/components/admin/AdminReset";

function AdminPage() {
  const [ manage, setManage ] = useState("article")
  console.log(manage);
  
  return (
    <div>
      <div className="mx-auto w-[100vw] min-h-screen flex">
        <AdminSidebar  setManage={setManage}/>
        {manage === "article" && <AdminArticle setManage={setManage}/>}
        {manage === "category" && <AdminCategoty />}
        {manage === "create" && <AdminCreate />}
        {manage === "edit" && <AdminEdit />}
        {manage === "profile" && <AdminProfile />}
        {manage === "reset" && <AdminReset />}
        {manage === "notification" && <AdminNotification />}
        
      </div>
    </div>
  );
}
export default AdminPage;
