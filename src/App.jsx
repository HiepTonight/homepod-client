import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layou from "./components/Layout";
// import Home from "./pages/Home/Home.jsx";
import Members from "./pages/Members";
import Homes from "./pages/Home/Homes.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx"; // Import trang NotFound
import Layout from "./app/layout.tsx";
import Dashboard from "./app/dashboard/page.tsx"
import Login from "./app/login/page.tsx"
import Home from "./app/dashboard/home/page.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="members" element={<Members />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* Thêm route cho trang 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;