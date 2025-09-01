import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Homepage from "./pages/Homepage";
import ViewPost from "./pages/ViewPost";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
          <Route path="/" element={<Homepage />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="*" element={<NotFoundPage />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
