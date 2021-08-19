import fbdl from 'fbdl-core'
import * as msg from '../lang/export'
import { Context } from 'telegraf'
import { ContextMessage } from '../lib/constant'
import { getBuffer, getSize, shortLinks } from '../lib/utility'

export = {
    name: "fbmp4",
    aliases: ["fbvideo", "fbvid"],
    description: "Download facebook video",
    category: "downloader",
    permission: "free",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        const fbUrl = args.length !== 0 ? args[0] : ''
        if (!fbUrl) return ctx.reply("Video url are required!", { reply_to_message_id: message.message_id })
        if (fbdl.validateURL(fbUrl)) {
            await ctx.reply(msg.wait(), { reply_to_message_id: message.message_id })
            try {
                const { title, rawVideo, publisher, thumbnail, duration, uploadedAt, views, quality } = await fbdl.getInfo(fbUrl)
                const rawSize = await getBuffer(rawVideo)
                const size = getSize(rawSize.toJSON().data.length, "MB")
                const resultMessage = msg.fbResult({
                    title: title,
                    author: publisher.name,
                    linkdl: await shortLinks(rawVideo),
                    uploadDate: `${uploadedAt.getDate()}-${uploadedAt.getMonth()}-${uploadedAt.getFullYear()}`,
                    duration: duration,
                    quality: quality,
                    viewCount: parseInt(views),
                    size: size,
                    type: "Video"
                })
    
                ctx.replyWithPhoto(thumbnail, {
                    caption: resultMessage.trim(),
                    reply_to_message_id: message.message_id,
                    parse_mode: "Markdown"
                })
            } catch (error) {
                console.log(error)
                ctx.reply(msg.downloaderError("Video"), {
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