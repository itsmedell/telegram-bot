import {
    Context
} from "telegraf";
import { configFormat, ContextMessage, locFiles, pluginFormat } from "../lib/constant";
import { hasNewMessage, isCmd } from "../lib/utility";
import fs from 'fs'
import Collection from "@discordjs/collection";

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
    if (!context.message) return
    if (!hasNewMessage(rawMessage)) return
    const message: ContextMessage = rawMessage
    const { text, video, sticker, audio, caption, animation, document, photo } = message
    const body = (text) ? text : (video && caption) ? caption : (photo && caption) ? caption : (audio && caption) ? caption : (document && caption) ? caption : ''
    const commandsName = body.slice(1).trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(" ")
    const pluginCall = plugins.get(commandsName) || plugins.find(cmd => cmd.aliases && cmd.aliases.includes(commandsName))
    
    // Command Handler
    if (pluginCall) {
        pluginCall.execute(context, message, args)
    } else {
        switch(commandsName) {
            // Greetings Features
            case "hello":
                context.reply("Hello Worlds", {
                    reply_to_message_id: message.message_id
                })
            break

            // Utility Features
            case "ping":
                context.reply("Pong!", {
                    reply_to_message_id: message.message_id
                })
            break

            // Games Features
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

            default:
                if (isCmd(body, config.prefix)) {
                    context.reply("Command not found!", {
                        reply_to_message_id: message.message_id
                    })
                }
        }
    }
}