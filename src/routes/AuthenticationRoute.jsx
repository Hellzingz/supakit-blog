import { Navigate } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserSideBar from "@/components/UserSideBar";

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
  if (isLoading === null || isLoading) {
    // สถานะกำลังโหลดข้อมูลหรือยังไม่มีข้อมูล
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <LoadingSpinner message="Please wait ..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // ผู้ใช้ยังไม่ได้ล็อกอิน ให้ไปที่หน้า login
    return <Navigate to="/login" replace />;
  }

  // ผู้ใช้มีการยืนยันตัวตนแล้ว
  return children;
}

export default AuthenticationRoute;
