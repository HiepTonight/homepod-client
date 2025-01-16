'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wifi, Bluetooth, Smartphone, Lock, Lightbulb, Thermometer, Speaker, Camera, Zap, Shield } from 'lucide-react'

const devices = [
    {
        name: 'Smart Bulbs',
        icon: Lightbulb,
        description: 'Energy-efficient LED bulbs with color and brightness control',
        meshNodes: 64,
        range: '30m indoor'
    },
    {
        name: 'Door Locks',
        icon: Lock,
        description: 'Secure smart locks with keyless entry and remote access',
        meshNodes: 32,
        range: '20m indoor'
    },
    {
        name: 'Thermostats',
        icon: Thermometer,
        description: 'Precise temperature control with scheduling capabilities',
        meshNodes: 16,
        range: '25m indoor'
    },
    {
        name: 'Speakers',
        icon: Speaker,
        description: 'High-quality audio with multi-room synchronization',
        meshNodes: 48,
        range: '35m indoor'
    },
    {
        name: 'Cameras',
        icon: Camera,
        description: 'HD security cameras with motion detection',
        meshNodes: 24,
        range: '28m indoor'
    }
]

const benefits = [
    {
        icon: Wifi,
        title: 'Extended Range',
        description:
            'Devices act as network nodes, extending coverage throughout your home without additional hardware.'
    },
    {
        icon: Zap,
        title: 'Low Power Consumption',
        description: 'BLE technology ensures minimal battery drain while maintaining reliable connectivity.'
    },
    {
        icon: Smartphone,
        title: 'Seamless Integration',
        description: 'Direct connection with smartphones and tablets for easy setup and control.'
    },
    {
        icon: Shield,
        title: 'Enhanced Security',
        description: 'Advanced encryption and security measures protect your smart home network.'
    }
]

export function BleMeshSection() {
    const [activeDevice, setActiveDevice] = useState(devices[0])

    return (
        <section className='py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-16'>
                    <Badge className='mb-4' variant='outline'>
                        Technology
                    </Badge>
                    <h2 className='text-4xl font-bold mb-4'>BLE Mesh Network Technology</h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Experience the future of smart home connectivity with our advanced Bluetooth Low Energy Mesh
                        networking.
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-12 items-start mb-16'>
                    <div>
                        <Card className='bg-primary text-primary-foreground overflow-hidden mb-8'>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <Bluetooth className='h-5 w-5' />
                                    BLE Mesh Network
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='relative h-64 mb-6 w-full aspect-video'>
                                    <img
                                        src='/ble.jpeg'
                                        alt='BLE Mesh Network Diagram'
                                        layout='fill'
                                        objectFit='cover'
                                        className='rounded-lg w-full h-full object-cover object-center'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-4 text-sm'>
                                    <div>
                                        <div className='font-semibold mb-1'>Maximum Nodes</div>
                                        <div className='font-mono'>32,767</div>
                                    </div>
                                    <div>
                                        <div className='font-semibold mb-1'>Transmission Range</div>
                                        <div className='font-mono'>up to 100m</div>
                                    </div>
                                    <div>
                                        <div className='font-semibold mb-1'>Network Latency</div>
                                        <div className='font-mono'>&lt;6ms</div>
                                    </div>
                                    <div>
                                        <div className='font-semibold mb-1'>Security</div>
                                        <div className='font-mono'>AES-128</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className='grid sm:grid-cols-2 gap-4'>
                            {benefits.map((benefit, index) => (
                                <Card key={index} className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm'>
                                    <CardContent className='p-6'>
                                        <benefit.icon className='h-8 w-8 text-primary mb-4' />
                                        <h3 className='font-semibold mb-2'>{benefit.title}</h3>
                                        <p className='text-sm text-muted-foreground'>{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className='text-2xl font-semibold mb-6'>Compatible Devices</h3>
                        <div className='grid gap-6'>
                            {devices.map((device, index) => (
                                <motion.div
                                    key={device.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        className={`cursor-pointer transition-all duration-300 ${
                                            activeDevice.name === device.name ? 'ring-2 ring-primary' : ''
                                        }`}
                                        onClick={() => setActiveDevice(device)}
                                    >
                                        <CardContent className='p-6 flex items-start gap-4'>
                                            <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                                                <device.icon className='h-6 w-6 text-primary' />
                                            </div>
                                            <div>
                                                <h4 className='font-semibold mb-1'>{device.name}</h4>
                                                <p className='text-sm text-muted-foreground mb-2'>
                                                    {device.description}
                                                </p>
                                                <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                                                    <span>Mesh Nodes: {device.meshNodes}</span>
                                                    <span>Range: {device.range}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <Button size='lg' className='rounded-full px-8'>
                        Explore Our BLE Mesh Technology
                    </Button>
                </div>
            </div>
        </section>
    )
}
