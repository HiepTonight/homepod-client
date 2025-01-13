"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowRight, Zap, Thermometer, Lock, Activity } from 'lucide-react'

const energyData = [
  { month: 'Jan', usage: 320, savings: 40 },
  { month: 'Feb', usage: 300, savings: 60 },
  { month: 'Mar', usage: 340, savings: 50 },
  { month: 'Apr', usage: 280, savings: 80 },
  { month: 'May', usage: 290, savings: 70 },
  { month: 'Jun', usage: 300, savings: 60 }
]

const features = [
  {
    title: "Energy Management",
    description: "Monitor and optimize your energy consumption with real-time analytics and smart recommendations.",
    icon: Zap,
    color: "bg-blue-500",
  },
  {
    title: "Climate Control",
    description: "Maintain the perfect temperature in every room with our advanced climate control system.",
    icon: Thermometer,
    color: "bg-green-500",
  },
  {
    title: "Smart Security",
    description: "Keep your home safe with our integrated security system, featuring smart locks and cameras.",
    icon: Lock,
    color: "bg-red-500",
  },
  {
    title: "Health Monitoring",
    description: "Track indoor air quality and other health metrics to ensure a healthy living environment.",
    icon: Activity,
    color: "bg-purple-500",
  },
]

export function OurTopFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">Features</Badge>
          <h2 className="text-4xl font-bold mb-4">Our Top Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the cutting-edge capabilities that make our smart home system stand out from the rest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Energy Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="usage" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="savings">Savings</TabsTrigger>
                </TabsList>
                <TabsContent value="usage" className="mt-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(17, 24, 39, 0.8)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#F3F4F6'
                          }}
                        />
                        <Line type="monotone" dataKey="usage" stroke="#3B82F6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="savings" className="mt-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(17, 24, 39, 0.8)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#F3F4F6'
                          }}
                        />
                        <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${feature.color}`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="w-2/3">
                        <Progress value={66} className="h-2" />
                      </div>
                      <Button variant="ghost" size="sm">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

