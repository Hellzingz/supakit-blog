import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

//Auth Routes
import AuthenticationRoute from "./routes/AuthenticationRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

//Pages
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import MemberPage from "./pages/MemberPage";
import UserLayout from "./layouts/UserLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPostPage from "./pages/ViewPostPage";
import AdminLayout from "./layouts/AdminLayout";

//Admin Pages
import AdminArticle from "./pages/admin/AdminArticle";
import AdminCategoty from "./pages/admin/AdminCategoty";
import AdminCreate from "./pages/admin/AdminCreate";
import AdminEdit from "./pages/admin/AdminEdit";
import AdminNotification from "./pages/admin/AdminNotification";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminReset from "./pages/admin/AdminReset";
import AdminCategoryEdit from "./pages/admin/AdminCategoryEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/post/:id" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Member Routes */}

        <Route element={<UserLayout />}>
          <Route
            path="/user"
            element={
              <AuthenticationRoute>
                <MemberPage />
              </AuthenticationRoute>
            }
          />
        </Route>

        {/* ADMIN Route */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminArticle />} />
          <Route path="articles" element={<AdminArticle />} />
          <Route path="create" element={<AdminCreate />} />
          <Route path="edit/:id" element={<AdminEdit />} />
          <Route path="category" element={<AdminCategoty />} />
          <Route path="category/edit/:id" element={<AdminCategoryEdit />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="reset" element={<AdminReset />} />
          <Route path="notification" element={<AdminNotification />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
