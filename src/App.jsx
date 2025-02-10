import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from "./pages/Home/Home.jsx";
import LandingPage from './app/landing-page/page.tsx'
import AboutPage from './app/landing-page/about/page.tsx'
import HowItWorksPage from './app/landing-page/how-it-works/page.tsx'
import PricingPage from './app/landing-page/pricing/page.tsx'

import Members from './pages/Members'
import Homes from './pages/Home/Homes.jsx'
import NotFound from './pages/NotFound/NotFound.tsx' // Import trang NotFound
import Layout from './app/dashboard/layout.tsx'
import Dashboard from './app/dashboard/page.tsx'
import Login from './app/login/page.tsx'
import Home from './app/dashboard/home/page.tsx'
import Setting from './app/dashboard/setting/page.tsx'
import ProtectedRoutes from './utils/ProtectedRoutes'
import OauthCallback from './app/login/oauth-callback/page.tsx'

import { ThemeProvider } from './context/ThemeProvider.tsx'
import LandingPageLayout from './app/landing-page/layout.tsx'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from './context/AuthProvider'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                    <Routes>
                        <Route element={<ProtectedRoutes />}>
                            <Route path='/dashboard' element={<Layout />}>
                                <Route index element={<Dashboard />} />
                                <Route path='home' element={<Home />} />
                                <Route path='members' element={<Members />} />
                                <Route path='setting' element={<Setting />} />
                            </Route>
                        </Route>

                        <Route path='/' element={<LandingPage />} />
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='/how-it-works' element={<HowItWorksPage />} />
                        <Route path='/pricing' element={<PricingPage />} />
                        <Route path='auth/google/callback' element={<OauthCallback />} />
                        {/* <Route path='/blog' element={<BlogPage />} />
                        <Route path='/blog/:id' element={<BlogPostPage />} /> */}

                        <Route path='login' element={<Login />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                    <Toaster />
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
