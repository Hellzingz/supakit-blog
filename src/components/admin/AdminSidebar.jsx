import {
  Bell,
  FileText,
  FolderOpen,
  Key,
  LogOut,
  User,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
function AdminSidebar({setManage}) {
  const menu = [
    { name: "Article management", link: "article", icon: FileText },
    { name: "Category management", link: "category", icon: FolderOpen },
    { name: "Profile", link: "profile", icon: User },
    { name: "Notification", link: "notification", icon: Bell },
    { name: "Reset password", link: "reset", icon: Key },
  ];

  const handleClick = (link) => {
    setManage(link);
  }

  return (
    <aside className="w-85 h-screen flex flex-col justify-between bg-gray-50">
      <div className="text-center py-15">
        <h1 className="text-2xl font-bold">
          Thomson P<span className="text-green-400">.</span>
        </h1>
        <p className="text-sm text-orange-400">Admin panel</p>
      </div>
      <div className="h-[100vh] flex flex-col justify-between">
        <nav>
          {menu.map((Item, index) => (
            <div
              onClick={() => handleClick(Item.link)}
              key={index}
              className={`flex items-center p-4 hover:bg-gray-200 cursor-pointer`}
            >
              <Item.icon className="mr-3 h-5 w-5" />
              {Item.name}
            </div>
          ))}
        </nav>
        <div className="border-gray-200 py-2">
          <Link
            to="/"
            className="flex items-center p-4 text-gray-600 hover:bg-gray-200"
          >
            <Globe className="mr-3 h-5 w-5" />
            Go to the website
          </Link>
          <Link
            to="/"
            className="flex items-center p-4 text-gray-600 hover:bg-gray-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </Link>
        </div>
      </div>
    </aside>
  );
}
export default AdminSidebar;
