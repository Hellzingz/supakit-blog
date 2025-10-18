import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

//Auth Routes
import AuthenticationRoute from "./routes/AuthenticationRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

//Pages
import HomePage from "./pages/public/HomePage";
import NotFoundPage from "./pages/public/NotFoundPage";
import MemberPage from "./pages/member/MemberPage";
import UserLayout from "./layouts/UserLayout";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ViewPostPage from "./pages/public/ViewPostPage";
import RegisterSuccess from "./pages/public/RegisterSuccess";

//Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import ArticleList from "./pages/admin/articles/ArticleList";
import CategoryList from "./pages/admin/categories/CategoryList";
import ArticleCreate from "./pages/admin/articles/ArticleCreate";
import ArticleEdit from "./pages/admin/articles/ArticleEdit";
import AdminNotifications from "./pages/admin/dashboard/AdminNotifications";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import AdminPasswordReset from "./pages/admin/profile/AdminPasswordReset";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<RegisterSuccess />} />
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
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
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="create" element={<ArticleCreate />} />
          <Route path="edit/:id" element={<ArticleEdit />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="category/edit/:id" element={<CategoryEdit />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="reset" element={<AdminPasswordReset />} />
          <Route path="notification" element={<AdminNotifications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
