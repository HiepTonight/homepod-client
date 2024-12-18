// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Layout from "./components/Layout"
// import Home from "./pages/Home/Home.jsx"
// import Members from "./pages/Members"
// import Login from "./pages/Login/Login.jsx"
// import Homes from "./pages/Home/Homes.jsx"
// import NotFound from "./pages/NotFound/NotFound.jsx" // Import trang NotFound

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout/>}>
//           <Route path="/" index element={<Homes/>}/>
//           <Route path="home/:homeId" element={<Home/>}/>
//           <Route path="members" element={<Members />}/>
//         </Route>
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<NotFound />} /> {/* Thêm route cho trang 404 */}
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Members from "./pages/Members"
import Login from "./pages/Login/Login.jsx"
import Homes from "./pages/Home/Homes.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx" // Import trang NotFound

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Homes/>}/>
        <Route path="home/:homeId" element={<Home/>}/>
        <Route path="members" element={<Members />}/>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* Thêm route cho trang 404 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;