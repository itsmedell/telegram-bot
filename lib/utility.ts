import chalk from "chalk"
import fs from 'fs'
import moment from "moment"
import { ContextMessage } from "./constant"

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

export function countAllDirFiles(locationDir: string) {
    if (fs.existsSync(locationDir)) {
        const files = fs.readdirSync(locationDir).filter(file => file.endsWith('.ts') || file.endsWith('.json'))
        return files.length
    } else {
        return 0
    }
}

export function isCmd(message: string, prefix: string[]|string) {
    let match = true
    if (!Array.isArray(prefix)) {
        prefix = [prefix]
    }
    Object.keys(prefix).forEach((i) => {
        if (message.startsWith(prefix[i])) {
            match = false
        }
    })
    return match
}

export function hasNewMessage(message: ContextMessage[]) {
    if (!Array.isArray(message)) {
        message = [message]
    }
    let match: boolean
    const listDate = []
    Object.keys(message).forEach((i) => {
        listDate.push(message[i].date)
    })
    Object.keys(listDate).forEach((i) => {
        if (moment(listDate[i] * 1000).format('DD/MM/YY HH:mm:ss') === moment().format("DD/MM/YY HH:mm:ss")) {
            match = true
        } else {
            match = false
        }
    })
    return match
}