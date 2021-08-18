import moment from "moment"
import { ytResultEntry } from "../lib/constant"
import { shortNumberFormat } from "../lib/formatter"

export function ytResult(entry: ytResultEntry) {
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

export function wait() {
    return "Please wait your request has been processed"
}