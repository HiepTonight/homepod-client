// export const API_ROOT = 'http://localhost:8080'

export const API_ROOT = 'https://smarthome-server-f5cl.onrender.com'
export const API_VERSION = '/api/v1'

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
}

// console.log('API_ROOT:', API_ROOT); // Add this line to debug and check the value of API_ROOT
