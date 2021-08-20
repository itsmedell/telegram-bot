import axios from "axios"
import cheerio from 'cheerio'
import { fbdlResult } from "../lib/constant"
import { getBuffer, getSize, shortLinks } from "../lib/utility"

// Private function
function parseDuration(text: string) {
    const rawDuration = text.replace("T", "").replace("M", ":").replace("S", "")
    const rawFormatDuration = rawDuration.split(":")
    const minutesFormat = rawFormatDuration[0].length < 2 ? `0${rawFormatDuration[0]}` : rawFormatDuration[0]
    const secondsFormat = rawFormatDuration[1].length < 2 ? `0${rawFormatDuration[1]}` : rawFormatDuration[1]
    return `${minutesFormat}:${secondsFormat}`
}

// Public function
export function getValidUrl(url: string) {
    const REGEX = RegExp('https:/www|m.facebook|fb.watch/[aA0-zZ9]|com/watch/\\?v=[0-9]+|[aA0-zZ9]+/videos/[0-9]+')
    return REGEX.test(url)
}

export async function getVideoInfo(url: string) {
    if (!getValidUrl(url)) throw new Error("Invalid facebook url!")
    try {
        const raw = await axios.get(url)
        const html = raw.data
        const $ = cheerio.load(html)
        const rawData = $('script[type="application/ld+json"]').html()
        const jsonData = JSON.parse(rawData)
        const title = jsonData.name.replace("| Facebook", "").trim()
        const duration = parseDuration(jsonData.duration)
        const uploadDate = jsonData.uploadDate.slice(0, 10)
        const authorName = jsonData.author.name
        const buffdata = await getBuffer(jsonData.contentUrl)
        const size = getSize(buffdata.toJSON().data.length, 'MB')
        const contentUrl = await shortLinks(jsonData.contentUrl)
        const viewCount = parseInt(html.split(",video_view_count:")[1].split(",")[0])
        const resultData: fbdlResult = {
            title: title,
            author: authorName,
            uploadDate: uploadDate,
            duration: duration,
            quality: jsonData.videoQuality,
            size: size,
            thumbnail: jsonData.thumbnailUrl,
            linkdl: contentUrl,
            viewCount: viewCount
        }
        return resultData
    } catch (error) {
        return null
    }
}