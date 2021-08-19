import { Context } from 'telegraf'
import { ContextMessage } from '../lib/constant'
import * as msg from '../lang/export'

export = {
    name: "fbmp4",
    aliases: ["fbvid", "fbvideo"],
    description: "Download video from facebook.",
    category: "downloader",
    permission: "free",
    async execute(ctx: Context, message: ContextMessage, args: string[]) {
        console.log("Coming Soon!")
    }
}