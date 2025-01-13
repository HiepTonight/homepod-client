'use client'

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Fan, Snowflake, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'auto' | 'wind' | 'swing'

export function TemperatureControl() {
    const [temperature, setTemperature] = useState(22)
    const [mode, setMode] = useState<Mode>('auto')
    const [isOn, setIsOn] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className='space-y-4'>
                <div className='rounded-xl border bg-gradient-to-b from-white to-gray-50/50 p-6 dark:from-gray-800 dark:to-gray-700/50'>
                    <div className='flex items-center justify-between'>
                        <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
                        <div className='h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
                    </div>
                    <div className='relative mx-auto mb-8 h-52 w-52'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='text-center'>
                                <div className='h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
                                <div className='mt-1 h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded'></div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-6 flex items-center justify-between'>
                        <div>
                            <div className='h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
                            <div className='mt-1 h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
                        </div>
                        <div className='h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
                    </div>
                    <div>
                        <div className='mb-4 h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded'></div>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='h-20 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                            <div className='h-20 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                            <div className='h-20 bg-gray-200 dark:bg-gray-700 rounded-xl'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const increaseTemp = () => setTemperature((prev) => Math.min(30, prev + 1))
    const decreaseTemp = () => setTemperature((prev) => Math.max(16, prev - 1))

    return (
        <div className='space-y-4'>
            <div className='rounded-xl border bg-gradient-to-b from-white to-gray-50/50 p-6 dark:from-gray-800 dark:to-gray-700/50'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>Temperature Control</h2>
                    <Button variant='ghost' size='icon'>
                        <MoreHorizontal className='h-5 w-5' />
                    </Button>
                </div>
                <div className='relative mx-auto mb-8 h-52 w-52'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                            <div className='text-5xl font-bold tracking-tight text-white'>{temperature}°C</div>
                            <div className='mt-1 text-xs text-muted-foreground'>Target Temperature</div>
                        </div>
                    </div>
                    <div className='absolute inset-0 -rotate-90 transform'>
                        <svg className='h-full w-full'>
                            <circle
                                cx='104'
                                cy='104'
                                r='96'
                                className='fill-none stroke-gray-200 dark:stroke-gray-700'
                                strokeWidth='12'
                            />
                            <circle
                                cx='104'
                                cy='104'
                                r='96'
                                className='fill-none stroke-[#085d94]'
                                strokeWidth='12'
                                strokeLinecap='round'
                                strokeDasharray={2 * Math.PI * 96}
                                strokeDashoffset={2 * Math.PI * 96 * (1 - (temperature - 16) / (30 - 16))}
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgb(168 85 247 / 0.4))'
                                }}
                            />
                        </svg>
                    </div>
                    {/* Temperature control buttons */}
                    <button
                        onClick={increaseTemp}
                        className='absolute -right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-gray-700'
                    >
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='text-[#085d94]'>
                            <path d='M12 8L12 16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                            <path d='M16 12L8 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                        </svg>
                    </button>
                    <button
                        onClick={decreaseTemp}
                        className='absolute -left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-gray-700'
                    >
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='text-[#085d94]'>
                            <path d='M16 12L8 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                        </svg>
                    </button>
                </div>
                <div className='mb-6 flex items-center justify-between'>
                    <div>
                        <h3 className='font-medium'>Air Conditioner</h3>
                        <p className='text-sm text-muted-foreground'>LG Dualcool Inverter</p>
                    </div>
                    <Switch checked={isOn} onCheckedChange={setIsOn} />
                </div>
                <div>
                    <h4 className='mb-4 font-medium'>Modes</h4>
                    <div className='grid grid-cols-3 gap-3'>
                        {[
                            { id: 'auto', icon: Snowflake, label: 'Auto' },
                            { id: 'wind', icon: Wind, label: 'Wind' },
                            { id: 'swing', icon: Fan, label: 'Swing' }
                        ].map(({ id, icon: Icon, label }) => (
                            <Button
                                key={id}
                                variant={mode === id ? 'default' : 'outline'}
                                className={cn(
                                    'h-20 flex-col gap-2 rounded-xl transition-colors',
                                    mode === id && 'bg-[#085d94] text-white hover:bg-[#2d8bc9]'
                                )}
                                onClick={() => setMode(id as Mode)}
                            >
                                <Icon className='h-6 w-6' />
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
