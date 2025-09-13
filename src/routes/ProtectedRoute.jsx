import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

function ProtectedRoute({ requiredRole, children }) {
  const { state } = useAuth();
  const isLoading = state.getUserLoading;
  const isAuthenticated = Boolean(state.user);
  const userRole = state.user?.role;

  if (isLoading === null || isLoading) {
    // สถานะกำลังโหลดข้อมูลหรือยังไม่มีข้อมูล
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <p>Loading....</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
    // คืนค่า null ขณะที่ Navigate ทำการเปลี่ยนเส้นทาง
    return <Navigate to="/login" replace />;
  }

  // ผู้ใช้มีการยืนยันตัวตนและมีบทบาทที่ถูกต้อง
  return children;
}

export default ProtectedRoute;
