import { Navigate } from "react-router-dom";

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
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

  if (!isAuthenticated) {
    // ผู้ใช้ยังไม่ได้ล็อกอิน ให้ไปที่หน้า login
    return <Navigate to="/login" replace />;
  }

  // ผู้ใช้มีการยืนยันตัวตนแล้ว
  return children;
}

export default AuthenticationRoute;