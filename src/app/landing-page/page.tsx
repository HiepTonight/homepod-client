import { NavHeader } from '@/components/global/nav-header'
import { HeroSection } from '@/components/global/hero-section'
import { BrandsSection } from '@/components/global/brands-section'
import { DashboardPreview } from '@/components/global/dashboard-preview'
import { FeatureCards } from '@/components/global/feature-cards'
// import { HowItWorks } from '@/components/global/how-it-works'
import { ExploreMore } from '@/components/global/explore-more'
import { Footer } from '@/components/global/footer'
// import Link from "next/link"
import { Button } from '@/components/ui/button'
import { OurTopFeatures } from '@/components/global/our-top-features'
import { BleMeshSection } from '@/components/global/ble-mesh'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <NavHeader />
            <div className='fade-in'>
                <main className='bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
                    <HeroSection />
                    <OurTopFeatures />
                    <DashboardPreview />
                    <BleMeshSection />
                    <BrandsSection />
                    <FeatureCards />
                    {/* <HowItWorks /> */}
                    <ExploreMore />
                </main>
            </div>
            <Footer />
        </>
    )
}
