import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layou from './components/Layout'
// import Home from "./pages/Home/Home.jsx";
import Members from './pages/Members'
import Homes from './pages/Home/Homes.jsx'
import NotFound from './pages/NotFound/NotFound.tsx' // Import trang NotFound
import Layout from './app/layout.tsx'
import Dashboard from './app/dashboard/page.tsx'
import Login from './app/login/page.tsx'
import Home from './app/dashboard/home/page.tsx'
import Setting from './app/setting/page.tsx'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from './context/AuthProvider'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='home' element={<Home />} />
                        <Route path='members' element={<Members />} />
                        <Route path='setting' element={<Setting />} />
                    </Route>
                    <Route path='login' element={<Login />} />
                    <Route path='*' element={<NotFound />} /> {/* Thêm route cho trang 404 */}
                </Routes>
                <Toaster />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
