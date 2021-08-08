import {
    Telegraf
} from 'telegraf'
import { prompt } from 'enquirer'
import fs from 'fs'
import * as constant from './lib/constant'

const { LocationFiles } = constant
const config: constant.configFormat = fs.existsSync(LocationFiles.config) && JSON.parse(fs.readFileSync(LocationFiles.config, {encoding: 'utf8'}))

export async function starts() {
    const bot = new Telegraf(config.token)
    bot.launch()
    .catch((errorData: any) => {
        switch(errorData.response.description.toLowerCase()) {
            case "bot token is required":
                console.log("Token Bot diperlukan!")
                prompt({
                    type: "password",
                    name: "token",
                    message: "Masukan token"
                }).then((data: any) => {
                    config.token = data.token
                    fs.writeFileSync(LocationFiles.config, JSON.stringify(config, null, 2))
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
                    fs.writeFileSync(LocationFiles.config, JSON.stringify(config, null, 2))
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
                    fs.writeFileSync(LocationFiles.config, JSON.stringify(config, null, 2))
                    console.log("Silahkan jalankan ulang bot ini")
                })
            break
            default:
                return 
        }
    })
}