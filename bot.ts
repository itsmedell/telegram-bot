import {
    Telegraf
} from 'telegraf'
import { prompt } from 'enquirer'
import fs from 'fs'
import * as constant from './lib/constant'
import * as handler from './handler/exports'
import { color } from './lib/utility'
import Table from 'cli-table'
import * as pkg from './package.json'

const { locFiles } = constant
const config: constant.configFormat = fs.existsSync(locFiles.config) && JSON.parse(fs.readFileSync(locFiles.config, { encoding: 'utf8' }))

// Starts Bot
export async function starts() {
    const bot = new Telegraf(config.token)

    // Send error if token is invalid
    bot.launch()
        .catch((errorData: any) => {
            switch (errorData.response.description.toLowerCase()) {
                case "bot token is required":
                    console.log("Token Bot diperlukan!")
                    prompt({
                        type: "password",
                        name: "token",
                        message: "Masukan token"
                    }).then((data: any) => {
                        config.token = data.token
                        fs.writeFileSync(locFiles.config, JSON.stringify(config, null, 2))
                        console.log("Silahkan jalankan ulang bot ini")
                    })
                    break
                case "not found":
                    console.log("Token bot yang anda masukan tidak ditemukan!")
                    prompt({
                        type: "password",
                        name: "token",
                        message: "Masukan token"
                    }).then((data: any) => {
                        config.token = data.token
                        fs.writeFileSync(locFiles.config, JSON.stringify(config, null, 2))
                        console.log("Silahkan jalankan ulang bot ini")
                    })
                    break
                case "unauthorized":
                    console.log("Token yang anda masukan invalid!")
                    prompt({
                        type: "password",
                        name: "token",
                        message: "Masukan token"
                    }).then((data: any) => {
                        config.token = data.token
                        fs.writeFileSync(locFiles.config, JSON.stringify(config, null, 2))
                        console.log("Silahkan jalankan ulang bot ini")
                    })
                    break
                default:
                    return
            }
        })

    // Log Info Script
    const totalPackage = []
    Object.keys(pkg.dependencies).forEach((i) => {
        totalPackage.push(i)
    })
    const table = new Table()
    table.push(
        ["Name", pkg.name],
        ["Author", pkg.author],
        ["Version", pkg.version],
        ["Visit Repo", color(pkg.repository, "yellow")],
        ["Report Bug", color(pkg.bugs.url, "cyan")],
        ["Total Package", totalPackage.length]
    )
    console.log(table.toString())

    // Handler
    handler.EventsHandler(bot)
    bot.on('message', (context) => {
        handler.MessageHandler(context)
    })
}