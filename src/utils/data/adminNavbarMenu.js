import { MdArticle } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { MdLockReset } from "react-icons/md";

export const adminNavbarMenu = [
    { name: "Article management", link: "/admin/articles", icon: MdArticle },
    { name: "Category management", link: "/admin/category", icon: MdCategory },
    { name: "Profile", link: "/admin/profile", icon: ImProfile },
    {
      name: "Notification",
      link: "/admin/notification",
      icon: IoIosNotifications,
    },
    { name: "Reset password", link: "/admin/reset", icon: MdLockReset },
  ];
