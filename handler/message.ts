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
    const pluginCall = plugins.get(commandsName) || plugins.find(cmd => cmd.aliases && cmd.aliases.includes(commandsName))
    
    // Command Handler
    if (pluginCall) {
        pluginCall.execute(context, message)
    } else {
        switch(commandsName) {
            case "hello":
                context.reply("Hello Worlds", {
                    reply_to_message_id: message.message_id
                })
                console.log(isCmd(body, config.prefix))
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