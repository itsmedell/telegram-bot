import { Context } from "telegraf";
import { ContextMessage } from "../lib/constant";

export = {
    name: "is",
    aliases: ["8ball", "eightball"],
    description: "Some fun features",
    execute(ctx: Context, message: ContextMessage, args: string[]) {
        const q = args.join(" ")
        if (!q.endsWith('?')) return
        if (!q) return ctx.reply("Please enter your question", {
            reply_to_message_id: message.message_id
        })
        const listAnswer = ["no", "yes", "i don't know", "maybe", "maybe not", "never", "i don't think so"]
        const randomAnswer = listAnswer[Math.floor(Math.random() * listAnswer.length)]
        const formatMessage = `*🎱 Features*\n\n*Question*: ${q}\n*Answer*: ${randomAnswer}`
        ctx.reply(formatMessage, {
            reply_to_message_id: message.message_id,
            parse_mode: 'Markdown'
        })
    }
}