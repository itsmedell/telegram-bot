export function getRandomID(length?: number) {
    let result: string = ''
    const liststring = "ABCDEFHIJIKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    if (!length) {
        length = Math.floor(Math.random() * liststring.length)
    }
    for (let i = 0; i < length; i++) {
        result += liststring.charAt(Math.floor(Math.random() * liststring.length))
    }
    return result
}