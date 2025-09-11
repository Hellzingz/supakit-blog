import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import MemberPage from "./pages/MemberPage";
import UserLayout from "./layouts/UserLayout";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPostPage from "./pages/ViewPostPage";
function App() {
  return (
    <>
      <BrowserRouter>
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
            <Route path="/user" element={<MemberPage />} />
          </Route>

          {/* ADMIN Route */}

            <Route path="/admin" element={<AdminPage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
