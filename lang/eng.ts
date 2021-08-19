import moment from "moment"
import { fbdlEntry, ytdlEntry } from "../lib/constant"
import { shortNumberFormat } from "../lib/formatter"

export function ytResult(entry: ytdlEntry) {
    const { title, author, uploadDate, duration, viewCount, type, linkdl } = entry
    return `
╭──────
├> ${title.length > 17 ? `*Title*:\n${title}` : title}
├> ${author.length > 17 ? `*Author*:\n${author}` : author}
├> *Published*: ${uploadDate}
├> *Duration*: ${moment(parseInt(duration) * 1000).format("mm:ss")}
├> *Views*: ${shortNumberFormat(parseInt(viewCount))}
├> *Type*: ${type}
├> *Link*: ${linkdl}
╰───────    
`
}

export function fbResult(entry: fbdlEntry) {
    const { title, author, uploadDate, duration, viewCount, type, size, quality, linkdl } = entry
    return `
╭──────
├> ${title.length > 17 ? `*Title*:\n${title}` : title}
├> ${author.length > 17 ? `*Author*:\n${author}` : author}
├> *Published*: ${uploadDate}
├> *Duration*: ${duration}
├> *Quality*: ${quality}
├> *Views*: ${shortNumberFormat(viewCount)}
├> *Type*: ${type}
├> *Size*: ${size}
├> *Link*: ${linkdl}
╰───────`
}

export function wait() {
    return "Please wait your request has been processed"
}

export function wrongUrl(platform: string) {
    const wrongUrlList = [`I'm sorry but that is not ${platform} url`, `that's is not a valid ${platform} url`, `Can you send a valid ${platform} url?`]
    const randomWrongUrlMsg = wrongUrlList[Math.floor(Math.random() * wrongUrlList.length)]
    return randomWrongUrlMsg
}

export function downloaderError(typeFile: string) {
    const errorMessageList = [`Sorry we can't download your ${typeFile} request`, `Sorry we cannot download your ${typeFile} request`, `Sorry the ${typeFile} content doesn't exist`]
    const randomErrorMessage = errorMessageList[Math.floor(Math.random() * errorMessageList.length)]
    return randomErrorMessage
}