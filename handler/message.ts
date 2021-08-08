import {
    Context
} from "telegraf";
import { configFormat, ContextMessage, locFiles } from "../lib/constant";
import { isCmd } from "../lib/utility";
import fs from 'fs'

// Variable
const config: configFormat = fs.existsSync(locFiles.config) && JSON.parse(fs.readFileSync(locFiles.config, {encoding: 'utf-8'}))

/**
 * Message / Command handler
 * @param context 
 */
export async function MessageHandler(context: Context, rawMessage: any) {
    if (!context.message) return
    const message: ContextMessage = rawMessage
    const { text, video, sticker, audio, caption, animation, document, photo } = message
    const body = (text) ? text : (video && caption) ? caption : (photo && caption) ? caption : (audio && caption) ? caption : (document && caption) ? caption : ''
    const commandsName = body.slice(1).trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    switch(commandsName) {
        case "hello":
            context.reply("Hello Worlds", {
                reply_to_message_id: message.message_id
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