import axios from "axios";
import fetch from "node-fetch";
import chalk from "chalk";
import fs from "fs";
import moment from "moment";
import FormData from "form-data";
import ffmpeg from "fluent-ffmpeg";
import { ContextMessage, resUploadFile } from "./constant";
import { getRandomID } from "./random";
import { checkValidUrl } from "./validator";

/**
 * Check if token format is valid
 * @param token 
 * @returns true or false
 */
export function checkFormatToken(token: string) {
    const regexToken = /[0-9]{10}:[aA0-zZ9]{35}/
    return regexToken.test(token) ? true : false
}

/**
 * Change text color
 * @param text 
 * @param color
 * @returns Text with color 
 */
export function color(text: string, color?: string) {
    return color ? chalk.keyword(color)(text) : chalk.green(text)
}

/**
 * Change text background color
 * @param text 
 * @param color 
 * @returns Text with background color
 */
export function bgcolor(text: string, color?: string) {
    return color ? chalk.bgKeyword(color)(text) : chalk.bgGreen(text)
}

/**
 * Count all files in directory
 * @param locationDir 
 * @returns Total Files
 */
export function countAllDirFiles(locationDir: string) {
    if (fs.existsSync(locationDir)) {
        const files = fs.readdirSync(locationDir).filter(file => file.endsWith('.ts') || file.endsWith('.json'))
        return files.length
    } else {
        return 0
    }
}

/**
 * isCmd
 * @param message 
 * @param prefix 
 * @returns true or false 
 */
export function isCmd(message: string, prefix: string[]) {
    let rawRegex = '^['
    Object.keys(prefix).forEach((i) => {
        rawRegex += `${prefix[i]}|`
    })
    const regex = new RegExp(`${rawRegex}]`)
    return regex.test(message)
}

/**
 * check if message is newest or latest
 * @param message 
 * @returns true or false
 */
export function hasNewMessage(message: ContextMessage) {
    let match: boolean
    if (moment(message.date * 1000).format('DD/MM/YY HH:mm:ss') === moment().format("DD/MM/YY HH:mm:ss")) {
        match = true
    } else {
        match = false
    }
    return match
}

/**
 * Shortlinks function
 * @param url 
 * @returns short url
 */
export async function shortLinks(url: string) {
    const results = await axios.get(`http://tinyurl.com/api-create.php?url=${url}`)
    return results.data
}

/**
 * Get all files from directory
 * @param directory 
 * @param filter 
 * @returns List files
 */
export function loadAllDirFiles(directory: string, filter: string) {
    const data = fs.readdirSync(directory).filter(file => file.endsWith(filter))
    return data
}

export async function getBuffer(url: string): Promise<Buffer> {
    const { data } = await axios.get(url, {
        responseType: 'arraybuffer'
    })
    return data
}

/**
 * Get size from bytes
 * @param bytes 
 * @param target 
 * @returns 
 */
export function getSize(bytes: number): string {
    if (bytes >= 1000 && bytes <= 1e+6) {
        const resultBytes = bytes / 1000
        return `${resultBytes.toFixed(2)} KB`
    } else if (bytes >= 1e+6 && bytes <= 1e+9) {
        const resultBytes = bytes / 1e+6
        return `${resultBytes.toFixed(2)} MB`
    } else if (bytes >= 1e+9 && bytes <= 1e+12) {
        const resultBytes = bytes / 1e+9
        return `${resultBytes.toFixed(2)} GB`
    } else if (bytes >= 1e+12) {
        const resultBytes = bytes / 1e+12
        return `${resultBytes.toFixed(2)} TB`
    } else {
        return `${bytes} B`
    }
}

/**
 * Upload file to anonfiles
 * @param pathFile 
 * @returns Data result
 */
export async function uploadFile(pathFile: string) {
    const fd = new FormData()
    const path = fs.createReadStream(pathFile)
    fd.append("file", path)
    const rawData = await fetch("https://api.anonfile.com/upload", { method: "POST", body: fd })
    const jsonData = await rawData.json()
    const resData: resUploadFile = {
        fileName: jsonData.data.file.metadata.name,
        fileSize: jsonData.data.file.metadata.size.readable,
        fileUrl: jsonData.data.file.url.full
    }
    return resData
}

/**
 * Convert video to audio
 * @param input 
 * @param fileName 
 * @returns output path
 */
export function toAudio(input: string, fileName?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!input) throw new Error("Where is the path file?")
        const output = `./temp/${fileName ? fileName : getRandomID(5)}.mp3`
        ffmpeg({
            source: input
        }).on("error", (error) => {
            console.log("Error:", error)
        }).on("start", () => {
            console.log("Starting convert from mp4 to mp3")
        }).toFormat("mp3").saveToFile(output)
            .on("end", () => {
                console.log("Success convert file from mp4 to mp3")
                resolve(output)
            })
    })
}

/**
 * Download file from url
 * @param url 
 * @param typeFile 
 * @param filename 
 * @returns output file
 */
export async function downloadFile(url: string, typeFile: string, filename?: string) {
    if (!checkValidUrl(url)) throw new Error("Invalid url type!")
    const output = `./temp/${filename ? filename : getRandomID(5)}.${typeFile}`
    const { data } = await axios.get(url, { responseType: "arraybuffer" })
    await fs.writeFileSync(output, data)
    return output 
}

// export function filterSize(currentSize: string, target: number, typeData?: typeData) {
//     switch(typeData) {
//         case "MB": {
//             let size = parseFloat(currentSize.replace("MB", ""))
//             return size >= target ? true : false
//         }
//         break
//         case "KB": {
//             let size = parseFloat(currentSize.replace("KB", ""))
//             console.log(size)
//             return size >= target ? true : false
//         }
//         break
//         default: {
//             let size = parseFloat(currentSize.replace("MB", ""))
//             return size >= target ? true : false
//         }
//     }
// }