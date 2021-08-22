import { Context } from 'telegraf'
import { ContextMessage } from '../lib/constant'
import * as msg from '../lang/export'
import * as fbdl from '../function/fbdl'
import { downloadFile, toAudio, uploadFile } from '../lib/utility'

export = {
    name: "fbmp3",
    aliases: ["fbaudio", "fba"],
    description: "Download audio from facebook.",
    category: "downloader",
    permission: "free",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        const fburl = args.length !== 0 ? args[0] : ''
        if (!fburl) return ctx.reply(msg.missingUrl("facebook"), { reply_to_message_id: message.message_id })
        if (fbdl.getValidUrl(fburl)) {
            try {
                const { title, duration, author, size, uploadDate, linkdl, quality, viewCount, thumbnail } = await fbdl.getVideoInfo(fburl)
                const fileMP4 = await downloadFile(linkdl, "mp4")
                const fileMP3 = await toAudio(fileMP4)
                const { fileUrl } = await uploadFile(fileMP3)
                const resultMessage = msg.fbResult({
                    title: title,
                    duration: duration,
                    author: author,
                    size: size,
                    quality: quality,
                    viewCount: viewCount,
                    uploadDate: uploadDate,
                    linkdl: fileUrl,
                    type: "Audio"
                })
                ctx.replyWithPhoto(thumbnail, {
                    reply_to_message_id: message.message_id,
                    caption: resultMessage.trim(),
                    parse_mode: "Markdown"
                })
            } catch (error) {
                ctx.reply(msg.downloaderError("audio"), {
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