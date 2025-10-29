import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

//Auth Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

//Pages
import HomePage from "./pages/public/HomePage";
import NotFoundPage from "./pages/public/NotFoundPage";
import UserLayout from "./layouts/UserLayout";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ViewPostPage from "./pages/public/ViewPostPage";
import RegisterSuccess from "./pages/public/RegisterSuccess";
import UserProfile from "./pages/member/UserProfile";
import UserPasswordReset from "./pages/member/UserPasswordReset";

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
import CreateCategory from "./pages/admin/categories/CreateCategory";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="/success" element={<RegisterSuccess />} />
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Member Routes */}

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<UserProfile />} />
          <Route path="reset" element={<UserPasswordReset />} />
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
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="reset" element={<AdminPasswordReset />} />
          <Route path="notification" element={<AdminNotifications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
