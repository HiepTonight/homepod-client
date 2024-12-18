import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Layout from "./components/Layout"
import Home from "./pages/Home/Home.jsx"
import Members from "./pages/Members"
import Login from "./pages/Login/Login.jsx"
import Homes from "./pages/Home/Homes.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"

function App() {
  const location = useLocation();

  useEffect(() => {
    // Xử lý reload trang ở đây
    console.log("URL đã thay đổi:", location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" index element={<Homes/>}/>
        <Route path="home/:homeId" element={<Home/>}/>
        <Route path="members" element={<Members />}/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;