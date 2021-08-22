import { Telegraf } from 'telegraf'
import { pluginFormat, menuList, ContextMessage } from '../lib/constant'
import {
    loadAllDirFiles
} from '../lib/utility'
import fs from 'fs'

// Load init files
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
    const file: pluginFormat = require(`../plugin/${files}`)
    const object: menuList = {
        name: file.name,
        aliases: file.aliases,
        description: file.description,
        category: file.category,
        permission: file.permission
    }
    totalFeatures.push(object)
}

// Variable 
let message: ContextMessage
export function inputMessage(rawMessage: any) {
    message = rawMessage
}

/**
 * Event handler
 * @param client 
 */
export async function EventsHandler(bot: Telegraf) {
    // Button Handler
    bot.action("regular", (ctx) => {
        // let message = ctx.update.callback_query.message
        let regularHeader = '───< ʀᴇɢᴜʟᴀʀ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (features.category === 'regular') {
                regularHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(regularHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("downloader", (ctx) => {
        let dlHeader = '───< ᴅᴏᴡɴʟᴏᴀᴅᴇʀ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (features.category === 'downloader') {
                dlHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(dlHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("bot", (ctx) => {
        let botHeader = '───< ʙᴏᴛ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (features.category === 'bot') {
                botHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(botHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("game", (ctx) => {
        let gameHeader = '───< ɢᴀᴍᴇ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (features.category === 'game') {
                gameHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(gameHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("converter", (ctx) => {
        let converterHeader = '───< ᴄᴏɴᴠᴇʀᴛᴇʀ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (features.category === 'converter') {
                converterHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(converterHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("media", (ctx) => {
        let mediaHeader = '───< ᴍᴇᴅɪᴀ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (features.category === 'media') {
                mediaHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(mediaHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("other", (ctx) => {
        const regex = /bot|regular|downloader|game|converter|media/
        let otherHeader = '───< ᴏᴛʜᴇʀ >───\n'
        for (let features of totalFeatures) {
            const name = features.name
            const aliases = features.aliases.length < 1 ? '' : `\n*Aliases*: ${features.aliases}`
            const description = features.description.length <= 33 ? features.description : `\n${features.description}`
            if (!regex.test(features.category)) {
                otherHeader += `*Name*: ${name}${aliases}\n*Description*: ${description}\n*Permission*: ${features.permission}\n\n`
            }
        }
        ctx.reply(otherHeader, {
            reply_to_message_id: message.message_id,
            parse_mode: "Markdown"
        })
    })
    bot.action("all", (ctx) => {
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
            switch (features.category) {
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
        const formatList = `${dlHeader}\n${converterHeader}\n${regularHeader}\n${mediaHeader}\n${gameHeader}\n${botHeader}\n${defaultHeader}`
        ctx.reply(formatList, {
            reply_to_message_id: message.message_id,
            parse_mode: 'Markdown'
        })
    })
}