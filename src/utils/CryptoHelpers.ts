import CryptoJS from 'crypto-js'

export function generateCodeVerifier() {
    const array = new Uint8Array(32)
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function generateCodeChallenge(codeVerifier) {
    const hash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64)
    return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
