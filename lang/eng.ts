import moment from "moment"
import { shortNumberFormat } from "../lib/formatter"

export function ytResult(title: string, author: string, duration: string, viewCount: string, uploadDate: string, tipe: string) {
    return `
╭──────
├> *Title*: ${title}
├> *Author*: ${author}
├> *Published*: ${uploadDate}
├> *Duration*: ${moment(parseInt(duration) * 1000).format("mm:ss")}
├> *Views*: ${shortNumberFormat(parseInt(viewCount))}
├> *Type*: ${tipe}
╰───────    
`
}