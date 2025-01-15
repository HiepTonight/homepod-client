import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle({ className, dark }) {
    const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light')

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}

            className={`${className}`}
        >
            <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${dark}`} />
            <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white ${dark}`} />
            <span className='sr-only'>Toggle theme</span>
        </Button>
    )
}
