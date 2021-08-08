import { 
    prompt
} from 'enquirer'
import * as constant from './lib/constant'
import * as bot from './bot'
import {
    checkFormatToken, 
    color
} from './lib/utility'
import fs from 'fs'

// Variable
const { locFiles, configure, configureFix } = constant

// StartUP
if (fs.existsSync(locFiles.config)) {
    bot.starts()
} else {
    // First configuration
    prompt(configure)
    .then(async (data: constant.configFormat) => {
        switch(data.prefix) {
            case "multi":
                console.log(color("[System]", "yellow"), color("Gunakan tanda [,] untuk memisahkan antar prefix", "white"))
                await prompt({
                    type: "input",
                    name: "prefix",
                    message: "Masukan prefix"
                }).then((res: any) => {
                    data.prefix = res.prefix.split(",")
                })
            break
            case "single":
                await prompt({
                    type: "input",
                    name: "prefix",
                    message: "Masukan prefix"
                }).then((res: any) => {
                    data.prefix = res.prefix
                })
            break
            default:
                return
        }
        if (!checkFormatToken(data.token)) {
            let retry = false
            console.log(color("[System]", "yellow"), color("Format token yang anda masukan salah!", "red"))
            prompt(configureFix)
            .then((result: any) => {
                switch(result.confirm) {
                    case 'yes':
                        retry = true
                    break
                    case "no":
                        retry = false
                    break
                    default:
                        retry = false
                }
                if (retry) {
                    prompt({
                        type: 'password',
                        name: 'token',
                        message: "Masukan token"
                    }).then((response: any) => {
                        data.token = response.token
                        fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
                        console.log(color("[System]", "yellow"), color("Silahkan jalankan ulang bot ini", "green"))
                    })
                } else {
                    fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
                    console.log(color("[System]", "yellow"), color("Silahkan jalankan ulang bot ini", "green"))
                }
            })
        } else {
            fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
            console.log(color("[System]", "yellow"), color("Silahkan jalankan ulang bot ini", "green"))
        }
    })
}