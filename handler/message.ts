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
 * @param context 
 */
export async function MessageHandler(context: Context, rawMessage: any) {
    const message: ContextMessage = rawMessage
    if (!context.message) return
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
        pluginCall.execute(context, message, args)
    } else {
        switch(commandsName) {
            // Basic Features
            case "hello":
                context.reply(`Hello ${message.from.username}`, {
                    reply_to_message_id: message.message_id
                })
            break

            // Check / Testing features
            case "ping":
                context.reply("Pong!", {
                    reply_to_message_id: message.message_id
                })
            break

            // Fun Menu
            case "say":
                if (!q) return context.reply("What should I say?", {
                    reply_to_message_id: message.message_id
                })
                context.reply(q)
            break
            case "is":
            case "eightball":
            case "8ball":
                if (!q) return context.reply("Please send your question", {
                    reply_to_message_id: message.message_id
                })
                const listAnswer = ["no", "yes", "i don't know", "maybe", "maybe not", "never", "i don't think so"]
                const randomAnswer = listAnswer[Math.floor(Math.random() * listAnswer.length)]
                const formatMessage = `*🎱 Features*\n\n*Question*: ${q}\n*Answer*: ${randomAnswer}`
                context.reply(formatMessage, {
                    reply_to_message_id: message.message_id,
                    parse_mode: 'Markdown'
                })
            break

            // Response if command / features are typo or doesn't exist
            default:
                if (isCommand) {
                    context.reply("Command not found!", {
                        reply_to_message_id: message.message_id
                    })
                }
        }
    }
}