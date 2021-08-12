import axios from "axios"
import chalk, { stderr } from "chalk"
import { exec } from "child_process"
import fs from 'fs'
import moment from "moment"
import path from 'path'
import { Context } from "telegraf"
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

export function isCmd(message: string, prefix: string[] | string) {
    let match: boolean
    if (!Array.isArray(prefix)) {
        prefix = [prefix]
    }
    Object.keys(prefix).forEach((i) => {
        if (message.startsWith(prefix[i])) {
            match = true
        } else {
            match = false
        }
    })
    return match
}

export function hasNewMessage(message: ContextMessage) {
    let match: boolean
    if (moment(message.date * 1000).format('DD/MM/YY HH:mm:ss') === moment().format("DD/MM/YY HH:mm:ss")) {
        match = true
    } else {
        match = false
    }
    return match
}

export async function shortLinks(url: string) {
    const results = await axios.get(`http://tinyurl.com/api-create.php?url=${url}`)
    return results.data
}