"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Command, Users, ArrowRight } from 'lucide-react'

const features = [
  {
    title: "Centralized Control",
    description: "Manage all your smart home devices from a single, intuitive dashboard.",
    icon: Command,
    color: "bg-blue-500",
  },
  {
    title: "Energy Management",
    description: "Monitor and optimize your energy usage to reduce waste and save on utility bills.",
    icon: Zap,
    color: "bg-green-500",
  },
  {
    title: "Multi-User Support",
    description: "Set up multiple user profiles with customized permissions and preferences.",
    icon: Users,
    color: "bg-purple-500",
  },
]

export function FeatureCards() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">Features</Badge>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Smart Living, Simplified
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how our innovative features can transform your home into a hub of comfort and efficiency.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                </CardContent>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="group">
                    Learn More 
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

