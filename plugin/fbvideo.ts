import { Context } from 'telegraf'
import { ContextMessage } from '../lib/constant'
import * as msg from '../lang/export'
import * as fbdl from '../function/fbdl'

export = {
    name: "fbmp4",
    aliases: ["fbvid", "fbvideo"],
    description: "Download video from facebook.",
    category: "downloader",
    permission: "free",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        const fburl = args.length !== 0 ? args[0] : ''
        if (fbdl.getValidUrl(fburl)) {
            await ctx.reply(msg.wait(), { reply_to_message_id: message.message_id })
            try {
                const { title, duration, author, size, uploadDate, linkdl, quality, thumbnail } = await fbdl.getVideoInfo(fburl)
                const resultMessage = msg.fbResult({
                    title: title,
                    duration: duration,
                    author: author,
                    size: size,
                    uploadDate: uploadDate,
                    linkdl: linkdl,
                    quality: quality,
                    type: "Video",
                })
                ctx.replyWithPhoto(thumbnail, {
                    reply_to_message_id: message.message_id,
                    caption: resultMessage,
                    parse_mode: "Markdown"
                })
            } catch (error) {
                ctx.reply(msg.downloaderError("video"), {
                    reply_to_message_id: message.message_id
                })
            }
        } else {
            ctx.reply(msg.wrongUrl("facebook"), {
                reply_to_message_id: message.message_id
            })
        }
    }
}