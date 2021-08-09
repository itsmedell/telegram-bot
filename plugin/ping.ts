import { Context } from "telegraf";
import { ContextMessage } from "../lib/constant";

export = {
    name: "ping",
    aliases: ["pong"],
    description: "Send ping message",
    execute(ctx: Context, message: ContextMessage) {
        ctx.reply("Pong!", {
            reply_to_message_id: message.message_id
        })
    }
}