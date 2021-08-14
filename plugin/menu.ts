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
    permission: "normal",
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
            totalFeatures.push(menu)
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

        let headerMenu = '╭───< ᴍᴇɴᴜ >───\n'
        let regularHeader = '├──< ʀᴇɢᴜʟᴀʀ >──\n'
        let mediaHeader = '├──< ᴍᴇᴅɪᴀ >──\n'
        let botHeader = '├──< ʙᴏᴛ >──\n'
        let gameHeader = '├──< ɢᴀᴍᴇ >──\n'
        let dlHeader = '├──< ᴅᴏᴡɴʟᴏᴀᴅᴇʀ >───\n'
        let defaultHeader = '├─< ᴏᴛʜᴇʀ >──\n'
        for (let features of totalFeatures) {
            const name = features.permission == 'premium' ? `${features.name}(Premium)` : features.name
            switch(features.category) {
                case 'bot':
                    botHeader += `├> ${name}\n`
                break
                case 'regular':
                    regularHeader += `├> ${name}\n`
                break
                case 'downloader':
                    dlHeader += `├> ${name}\n`
                break
                case 'game':
                    gameHeader += `├> ${name}\n`
                break
                case 'media':
                    mediaHeader += `├> ${name}\n`
                break
                default:
                    defaultHeader += `├> ${name}\n`
            }
        }
        const formatList = `${headerMenu}${dlHeader}${regularHeader}${mediaHeader}${gameHeader}${botHeader}${defaultHeader}`
        ctx.reply(formatList, {
            reply_to_message_id: message.message_id
        })
    }
}