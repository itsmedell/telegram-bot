import { Context } from 'telegraf'
import ytdl from 'ytdl-core'
import { ContextMessage } from '../lib/constant'
import { chooseQuality } from '../lib/formatter'
import * as msg from '../lang/export'
import { filterDuration } from '../lib/validator'
import { getBuffer, shortLinks } from '../lib/utility'
import fs from 'fs'

export = {
    name: "ytmp3",
    aliases: ["ytaudio", "yta"],
    description: "Download audio from youtube",
    category: "downloader",
    permission: "free",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        const wrongUrlList = ["that's is not a valid youtube url", "I'm sorry but that is not youtube url", "Can you send a valid youtube url?"]
        const randomWrongUrlMsg = wrongUrlList[Math.floor(Math.random() * wrongUrlList.length)]
        const errorMessageList = ["Sorry we can't download your video request", "I think that video is private or doesn't exist", "Sorry we failed to process that video"]
        const randomErrorMessage = errorMessageList[Math.floor(Math.random() * errorMessageList.length)]
        const yturl = args.length !== 0 ? args[0] : ''
        const dlurl = []
        if (!yturl) return ctx.reply("Youtube url is required!", {reply_to_message_id: message.message_id})
        if (ytdl.validateURL(yturl)) {
            await ctx.reply("Please wait your request is being processed", {
                reply_to_message_id: message.message_id
            })
            try {
                const resultValue = await ytdl.getInfo(yturl)
                const formats = ytdl.filterFormats(resultValue.formats, 'audioonly')
                const { url } = chooseQuality(formats, '140', '251')
                dlurl.push(url)
                const { lengthSeconds, viewCount, title, uploadDate, likes, author, thumbnails } = resultValue.videoDetails
                const thumbs = thumbnails[Math.floor(Math.random() * thumbnails.length)]
                const resultMessage = msg.ytResult({
                    title: title,
                    author: author.name,
                    duration: lengthSeconds,
                    viewCount: viewCount,
                    uploadDate: uploadDate,
                    type: "audio",
                    linkdl: await shortLinks(url),
                })
                
                await ctx.replyWithPhoto(thumbs, {
                    reply_to_message_id: message.message_id,
                    caption: resultMessage.trim(),
                    parse_mode: "Markdown"
                })

            } catch (error) {
                ctx.reply(randomErrorMessage, {
                    reply_to_message_id: message.message_id
                })
            }
        } else {
            ctx.reply(randomWrongUrlMsg, {
                reply_to_message_id: message.message_id
            })
        }
    }
}