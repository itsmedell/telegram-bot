import { Context } from 'telegraf'
import { ContextMessage } from '../lib/constant'

export = {
    name: "sticker",
    aliases: ["stc", "stiker"],
    description: "Convert image or video to sticker",
    category: "converter",
    permission: "free",
    execute(ctx: Context, message: ContextMessage, args: string[]) {
        ctx.reply("Coming Soon!", {
            reply_to_message_id: message.message_id
        })
    }
}