import axios from "axios";
import fetch from "node-fetch";
import chalk from "chalk";
import fs from "fs";
import moment from "moment";
import FormData from "form-data";
import ffmpeg from "fluent-ffmpeg";
import { ContextMessage, resUploadFile, typeData } from "./constant";
import { getRandomID } from "./random";

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

export function getSize(bytes: number, target: typeData): string {
    switch (target) {
        case "MB": {
            const resultBytes = bytes / 1e+6
            return `${resultBytes.toFixed(2)} MB`
        }
            break
        case "KB": {
            const resultBytes = bytes / 1000
            return `${resultBytes.toFixed()} KB`
        }
            break
        default: {
            const resultBytes = bytes / 1e+6
            return `${resultBytes} MB`
        }
    }
}

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

export async function toAudio(pathFile: string, fileName?: string) {
    if (!pathFile) throw new Error("Where is the path file?")
    const input = pathFile
    const output = `./temp/${fileName ? fileName : getRandomID(5)}.mp3`
    await ffmpeg({
        source: input
    }).on("error", (error) => {
        console.log("Error:", error)
    }).on("start", () => {
        console.log("Starting convert from mp4 to mp3")
    }).on("end", () => {
        console.log("Success convert file from mp4 to mp3")
        // send result file path
        return output
    }).toFormat("mp3").saveToFile(output)
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