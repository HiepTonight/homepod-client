import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home/Home.jsx"
import Members from "./pages/Members"
import Login from "./pages/Login/Login.jsx" // Import trang đăng nhập
import Homes from "./pages/Home/Homes.jsx" // Import trang homes

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Homes/>}/> {/* Thay đổi route mặc định thành trang homes */}
          <Route path="home/:homeId" element={<Home/>}/> {/* Thêm route cho trang home */}
          <Route path="members" element={<Members />}/>
        </Route>
        <Route path="/login" element={<Login />} /> {/* Thêm route cho trang đăng nhập */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;