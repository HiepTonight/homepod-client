"use client"

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"

const brands = [
  { name: "PHILIPS", logo: "/philips-logo.svg" },
  { name: "NEST", logo: "/nest-logo.svg" },
  { name: "XIAOMI", logo: "/xiaomi-logo.svg" },
  { name: "HUAWEI", logo: "/huawei-logo.svg" },
  { name: "SAMSUNG", logo: "/samsung-logo.svg" },
  { name: "APPLE", logo: "/apple-logo.svg" },
  { name: "GOOGLE", logo: "/google-logo.svg" },
  { name: "AMAZON", logo: "/amazon-logo.svg" },
  { name: "SONOS", logo: "/sonos-logo.svg" },
  { name: "LUTRON", logo: "/lutron-logo.svg" }
]

export function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    scroll()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className=" mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">Partners</Badge>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Trusted by Leading Brands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We collaborate with top smart device manufacturers to bring you the best in home automation.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10" />
          <motion.div 
            ref={scrollRef} 
            className="flex overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center space-x-16 animate-scroll">
              {[...brands, ...brands].map((brand, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center justify-center w-40 h-24"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="h-12 w-auto object-contain mb-2 opacity-50 hover:opacity-100 transition-opacity duration-300" 
                  />
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{brand.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

