import ytdl from "ytdl-core";
import { Context } from "telegraf";
import { ContextMessage } from "../lib/constant";
import { chooseQuality } from "../lib/formatter";
import * as msg from '../lang/export'
import { filterDuration } from "../lib/validator";
import { shortLinks } from "../lib/utility";

export = {
    name: "ytmp4",
    aliases: ["ytvideo", "ytvid", "ytv"],
    description: "Download Video from Youtube",
    category: "downloader",
    permission: "normal",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        const wrongUrlList = ["that's is not a valid youtube url", "I'm sorry but that is not youtube url", "Can you send a valid youtube url?"]
        const randomWrongUrlMsg = wrongUrlList[Math.floor(Math.random() * wrongUrlList.length)]
        const errorMessageList = ["Sorry we can't download your video request", "I think that video is private or doesn't exist", "Sorry we failed to process that video"]
        const randomErrorMessage = errorMessageList[Math.floor(Math.random() * errorMessageList.length)]
        const yturl = args.length !== 0 ? args[0] : ''
        if (!yturl) return ctx.reply("Youtube url is required!")
        if (ytdl.validateURL(yturl)) {
            await ctx.reply("Your request is being processed", {
                reply_to_message_id: message.message_id 
            })
            try {
                const resultValue = await ytdl.getInfo(yturl)
                const { url } = chooseQuality(resultValue.formats, '22')
                const { lengthSeconds, viewCount, title, uploadDate, likes, author, thumbnails } = resultValue.videoDetails
                const thumbs = thumbnails[Math.floor(Math.random() * thumbnails.length)]
                const resultMessage = msg.ytResult(title, author.name, lengthSeconds, viewCount, uploadDate, 'mp4')
                
                await ctx.replyWithPhoto(thumbs, {
                    caption: resultMessage.trim(),
                    parse_mode: "Markdown"
                })

                await ctx.reply("Video will be send very soon!", {
                    reply_to_message_id: message.message_id
                })

                // Check if duration is too long or not
                if (filterDuration(parseInt(lengthSeconds))) {
                    await ctx.reply(`Sorry video duration is too long\nYou can download it at this link: ${await shortLinks(url)}`, {
                        reply_to_message_id: message.message_id
                    })
                } else {
                    await ctx.replyWithVideo(url, {
                        reply_to_message_id: message.message_id,
                        caption: "Here's your videos"
                    })
                }
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