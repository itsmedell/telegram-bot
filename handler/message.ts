import {
    Context
} from "telegraf";
import { configFormat, ContextMessage, locFiles, pluginFormat } from "../lib/constant";
import { color, hasNewMessage, isCmd } from "../lib/utility";
import fs from 'fs'
import Collection from "@discordjs/collection";
import moment from "moment";

// Plugin Loader
const plugins: any = new Collection();
const pluginFiles = fs.readdirSync(locFiles.plugin).filter(file => file.endsWith('.ts'))
for (let files of pluginFiles) {
    const plugin: pluginFormat = require(`../plugin/${files}`)
    plugins.set(plugin.name, plugin)
}

// Variable
const config: configFormat = fs.existsSync(locFiles.config) && JSON.parse(fs.readFileSync(locFiles.config, {encoding: 'utf-8'}))

/**
 * Message / Command handler
 * @param ctx 
 */
export async function MessageHandler(ctx: Context, rawMessage?: any) {
    const message: ContextMessage = rawMessage
    if (!ctx.message) return
    if (!hasNewMessage(rawMessage)) return
    if (message.from.is_bot) return
    const { text, video, sticker, audio, caption, animation, document, photo } = message
    const body = (text) ? text : (video && caption) ? caption : (photo && caption) ? caption : (audio && caption) ? caption : (document && caption) ? caption : ''
    const commandsName = body.slice(1).trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(" ")
    const isCommand = isCmd(body, config.prefix)
    const pluginCall: pluginFormat = plugins.get(commandsName) || plugins.find(cmd => cmd.aliases && cmd.aliases.includes(commandsName))
    
    // Log Commands
    if (isCommand) {
        const chatColor = `${color('[', 'cyan')}${color(`${message.chat.type}`.toUpperCase(), 'orange')}${color(']', 'cyan')}`
        const clockColor = `${color('[', 'cyan')}${color(moment().format('HH:mm:ss'), 'yellow')}${color(']', 'cyan')}`
        const userColor = `${color('[', 'cyan')}${color(`${message.from.username}`, 'magenta')}${color(']', 'cyan')}`
        console.log(`${color('╭─', 'cyan')}${chatColor}${color('──', 'cyan')}${clockColor}${color('──', 'cyan')}${userColor}`)
        console.log(`${color('╰──[', 'cyan')}${commandsName}${color(']', 'cyan')}${color('[', 'cyan')}${color(`${args.length}`, 'yellow')}${color(']', 'cyan')}`)
    }

    // Command Handler
    if (pluginCall) {
        pluginCall.execute(ctx, message, args)
    } else {
        switch(commandsName) {
            // Regular Category
            case "hello":
                ctx.reply(`Hello ${message.from.username}`, {
                    reply_to_message_id: message.message_id
                })
            break
            case "ping":
                ctx.reply("Pong!", {
                    reply_to_message_id: message.message_id
                })
            break
            case "say":
                if (!q) return ctx.reply("What should I say?", {
                    reply_to_message_id: message.message_id
                })
                ctx.reply(q)
            break

            // Bot Category
            case "menu": {
                ctx.reply("Please choose category menu below", {
                    reply_markup: {
                        inline_keyboard: [[
                            { text: "ᴅᴏᴡɴʟᴏᴀᴅᴇʀ", callback_data: "downloader" },
                            { text: "ᴄᴏɴᴠᴇʀᴛᴇʀ", callback_data: "converter" },
                            { text: "ᴍᴇᴅɪᴀ", callback_data: "media" },
                            { text: "ɢᴀᴍᴇ", callback_data: "game" },
                            { text: "ʙᴏᴛ", callback_data: "bot" },
                            { text: "ᴏᴛʜᴇʀ", callback_data: "other" }
                        ]]
                    },
                    reply_to_message_id: message.message_id,
                    parse_mode: "Markdown"
                })
            }
            break
            // Game Category
            case "is":
            case "eightball":
            case "8ball":
                if (!q) return ctx.reply("Please send your question", {
                    reply_to_message_id: message.message_id
                })
                const listAnswer = ["no", "yes", "i don't know", "maybe", "maybe not", "never", "i don't think so"]
                const randomAnswer = listAnswer[Math.floor(Math.random() * listAnswer.length)]
                const formatMessage = `*🎱 Features*\n\n*Question*: ${q}\n*Answer*: ${randomAnswer}`
                ctx.reply(formatMessage, {
                    reply_to_message_id: message.message_id,
                    parse_mode: 'Markdown'
                })
            break

            // Response if command / features are typo or doesn't exist
            default:
                if (isCommand) {
                    ctx.reply("Command not found!", {
                        reply_to_message_id: message.message_id
                    })
                }
        }
    }
}