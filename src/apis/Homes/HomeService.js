import axiosClient from '../axiosClient'
import { API_ROOT, API_VERSION } from '../../utils/constants'

const createHome = async (homeData) => {
    try {
        const response = await axiosClient.post('/home', homeData)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to create home')
        }
    } catch (error) {
        console.error('Error creating home:', error)
        throw error
    }
}

const getHome = async (homeId) => {
    try {
        const response = await axiosClient.get(`/home/${homeId}`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch home')
        }
    } catch (error) {
        console.error('Error fetching home:', error)
        throw error
    }
}

const getUserHomes = async () => {
    try {
        const response = await axiosClient.get('/home')
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch user homes')
        }
    } catch (error) {
        console.error('Error fetching user homes:', error)
        throw error
    }
}

const deleteHome = async (homeId) => {
    try {
        const response = await axiosClient.delete(`/home/${homeId}`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to delete home')
        }
    } catch (error) {
        console.error('Error deleting home:', error)
        throw error
    }
}

const getHomeOption = async (homeId) => {
    try {
        const response = await axiosClient.get(`/home/setting/${homeId}`)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to fetch home option')
        }
    } catch (error) {
        console.error('Error fetching home option:', error)
        throw error
    }
}

const updateHomeOption = async (homeId, homeOption) => {
    try {
        const response = await axiosClient.post(`/home/setting/${homeId}`, homeOption)
        if (response.data && response.data.success) {
            return response.data.data
        } else {
            throw new Error(response.data.message || 'Failed to update home option')
        }
    } catch (error) {
        console.error('Error updating home option:', error)
        throw error
    }
}

const connectEventSource = (homePodId) => {
    const eventSource = new EventSource(`http://localhost:8080/api/v1/home/sse?homePodId=${homePodId}`)

    eventSource.onopen = () => {
        console.log('Connection to EventSource established successfully.')
    }

    eventSource.addEventListener('DEVICE_UPDATE_EVENT', (event) => {
        const data = JSON.parse(event.data)
        console.log('EventSource message:', data)
    })

    eventSource.onerror = (error) => {
        console.error('EventSource error:', error)
        if (error.eventPhase === EventSource.CLOSED) {
            eventSource.close()
            setTimeout(connectEventSource, 1000) // Thiết lập lại kết nối sau 5 giây
        }
    }

    return eventSource
}

const getStreamAxios = (homePodId) => {
    const connect = () => {
        axiosClient
            .get('/home/sse', {
                headers: {
                    Accept: 'text/event-stream'
                },
                params: {
                    homePodId: homePodId
                },
                responseType: 'stream',
                adapter: 'fetch' // <- this option can also be set in axios.create()
            })
            .then(async (response) => {
                console.log('axios got a response')
                const stream = response.data

                // consume response
                const reader = stream.pipeThrough(new TextDecoderStream()).getReader()
                while (true) {
                    const { value, done } = await reader.read()
                    if (done) break
                    console.log(value)
                }
            })
            .catch((error) => {
                console.error('Error in getStreamAxios:', error)
                // Attempt to reconnect after a delay
                setTimeout(connect, 5000)
            })
        // catch/etc.
    }
    connect()
}

export {
    createHome,
    getHome,
    getUserHomes,
    deleteHome,
    getHomeOption,
    updateHomeOption,
    connectEventSource,
    getStreamAxios
}
