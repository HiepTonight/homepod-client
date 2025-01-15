import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const totalDuration = 228 // 3:48 in seconds

    const togglePlay = () => setIsPlaying(!isPlaying)

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className='space-y-4'>
            <div
                className='p-4 bg-gradient-to-br from-gray-50 to-gray-100 
                          dark:from-gray-800 dark:to-gray-900
                          border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg'
            >
                <div className='mb-3 flex items-center gap-4'>
                    <img
                        src='https://i.ytimg.com/vi/nCkpzqqog4k/maxresdefault.jpg'
                        alt='Album cover'
                        className='h-10 w-10 rounded-lg object-cover'
                    />
                    <div>
                        <h3 className='font-medium'>I'm Not The Only One</h3>
                        <p className='text-sm text-muted-foreground'>Sam Smith</p>
                    </div>
                </div>
                <div className='mb-2 space-y-2'>
                    <div className='h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
                        <div
                            className='h-full rounded-full bg-purple-500'
                            style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                        />
                    </div>
                    <div className='flex justify-between text-sm text-muted-foreground'>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(totalDuration)}</span>
                    </div>
                </div>
                <div className='flex justify-center gap-4'>
                    <Button variant='ghost' size='icon'>
                        <SkipBack className='h-6 w-6' />
                    </Button>
                    <Button size='icon' className='h-12 w-12 rounded-full' onClick={togglePlay}>
                        {isPlaying ? <Pause className='h-6 w-6' /> : <Play className='h-6 w-6' />}
                    </Button>
                    <Button variant='ghost' size='icon'>
                        <SkipForward className='h-6 w-6' />
                    </Button>
                </div>
            </div>
        </div>
    )
}
