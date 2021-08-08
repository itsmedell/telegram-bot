import chalk from "chalk"
import fs from 'fs'

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

export async function isCmd(message: string, prefix: string[]|string) {
    let match = false
    if (typeof prefix === 'string') {
        match = await message.startsWith(prefix)
    } else {
        Object.keys(prefix).forEach((i) => {
            if (message.startsWith(prefix[i])) {
                match = true
            }
        })
    }
}