import { Context } from 'telegraf'
import { ContextMessage, pluginFormat, menuList } from '../lib/constant'
import {
    loadAllDirFiles
} from '../lib/utility'
import fs from 'fs'


export = {
    name: "menu",
    aliases: ["guide", "help"],
    description: "Send list features of bot",
    category: "bot",
    permission: "free",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        const totalFeatures: menuList[] = []
        const rawFiles = loadAllDirFiles("./plugin", ".ts")
        const rawMenu: pluginFormat[] = JSON.parse(fs.readFileSync('./data/bot/menu.json').toString())
        // Features Loader
        for (let menu of rawMenu) {
            const object: menuList = {
                name: menu.name,
                aliases: menu.aliases,
                description: menu.description,
                category: menu.category,
                permission: menu.permission
            }
            totalFeatures.push(object)
        }
        // Plugin
        for (let files of rawFiles) {
            const file: pluginFormat = require(`./${files}`)
            const object: menuList = {
                name: file.name,
                aliases: file.aliases,
                description: file.description,
                category: file.category,
                permission: file.permission
            }
            totalFeatures.push(object)
        }

        let headerMenu = '────< ᴀʙᴏᴜᴛ >────\n'
        let regularHeader = '───< ʀᴇɢᴜʟᴀʀ >───\n'
        let mediaHeader = '───< ᴍᴇᴅɪᴀ >───\n'
        let botHeader = '───< ʙᴏᴛ >───\n'
        let gameHeader = '───< ɢᴀᴍᴇ >───\n'
        let dlHeader = '───< ᴅᴏᴡɴʟᴏᴀᴅᴇʀ >───\n'
        let defaultHeader = '───< ᴏᴛʜᴇʀ >───\n'
        let converterHeader = '───< ᴄᴏɴᴠᴇʀᴛᴇʀ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            switch(features.category) {
                case 'bot':
                    botHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
                break
                case 'regular':
                    regularHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
                break
                case 'downloader':
                    dlHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
                break
                case 'game':
                    gameHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
                break
                case 'converter':
                    converterHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
                break
                case 'media':
                    mediaHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
                break
                default:
                    defaultHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        const formatList = `${headerMenu}\n${dlHeader}\n${converterHeader}\n${regularHeader}\n${mediaHeader}\n${gameHeader}\n${botHeader}\n${defaultHeader}`
        ctx.reply(formatList, {
            reply_to_message_id: message.message_id,
            parse_mode: 'Markdown'
        })
    }
}