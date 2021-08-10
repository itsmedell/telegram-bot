import {
    Telegraf
} from 'telegraf'
import { prompt } from 'enquirer'
import fs from 'fs'
import * as constant from './lib/constant'
import * as handler from './handler/exports'
import { color, countAllDirFiles } from './lib/utility'
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
                console.log("Bot token is required!")
                prompt({
                    type: "password",
                    name: "token",
                    message: "Enter Token"
                }).then((data: any) => {
                    config.token = data.token
                    fs.writeFileSync(locFiles.config, JSON.stringify(config, null, 2))
                    console.log(color('[System]', 'yellow'), color("New token has been saved, please restart this program", "green"))
                })
                break
            case "not found":
                console.log("Bot token that you entered was not found")
                prompt({
                    type: "password",
                    name: "token",
                    message: "Enter Token"
                }).then((data: any) => {
                    config.token = data.token
                    fs.writeFileSync(locFiles.config, JSON.stringify(config, null, 2))
                    console.log(color('[System]', 'yellow'), color("New token has been saved, please restart this program", "green"))
                })
                break
            case "unauthorized":
                console.log("Bot token that you entered is invalid!")
                prompt({
                    type: "password",
                    name: "token",
                    message: "Enter Token"
                }).then((data: any) => {
                    config.token = data.token
                    fs.writeFileSync(locFiles.config, JSON.stringify(config, null, 2))
                    console.log(color('[System]', 'yellow'), color("New token has been saved, please restart this program", "green"))
                })
                break
            default:
                return
        }
    })

    // Log Info Script
    console.log(color('=> Successfully loaded!', 'yellow'), color('Plugin:', 'yellow'), color(countAllDirFiles(locFiles.plugin).toString(), 'green'),
    color('Library:', 'yellow'), color(countAllDirFiles(locFiles.lib).toString(), 'green'), color('Function:', 'yellow'), color(countAllDirFiles(locFiles.func).toString(), 'green'),
    color('Database:', 'yellow'), color(countAllDirFiles(locFiles.data).toString(), 'green'))
    console.log(color('=> Bot Version:', 'yellow'), color(pkg.version))
    console.log(color('=> Bug? Error? Saran?:', 'yellow'), color(pkg.bugs.url, 'green'))
    console.log(color('[TeleBot]', 'cyan'), color('Sekarang bot sudah menyala!', 'yellow'))
    console.log(color('[Author]', 'cyan'), color("Semoga kalian suka dengan script ini :)", 'yellow'))

    // Handler
    handler.EventsHandler(bot)
    bot.on('message', (context) => {
        handler.MessageHandler(context, context.message)
    })
}