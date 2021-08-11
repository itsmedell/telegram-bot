import { 
    prompt
} from 'enquirer'
import fs from 'fs'
import * as constant from './lib/constant'
import * as bot from './bot'
import {
    checkFormatToken, 
    color
} from './lib/utility'

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
                console.log(color("[System]", "yellow"), color("Please use [,] for separator between prefix", "white"))
                await prompt({
                    type: "input",
                    name: "prefix",
                    message: "Enter Prefix"
                }).then((res: any) => {
                    data.prefix = res.prefix.split(",")
                    data.prefix.push("/")
                })
            break
            case "single":
                await prompt({
                    type: "input",
                    name: "prefix",
                    message: "Enter Prefix"
                }).then((res: any) => {
                    data.prefix = [res.prefix]
                    data.prefix.push("/")
                })
            break
            default:
                return
        }
        if (!checkFormatToken(data.token)) {
            let retry = false
            console.log(color("[System]", "yellow"), color("Invalid token format!", "red"))
            prompt(configureFix)
            .then(async (result: any) => {
                switch(result.confirm) {
                    case 'yes':
                        retry = true
                    break
                    case "no":
                        retry = false
                    break
                    default:
                        return
                }
                if (retry) {
                    prompt({
                        type: 'password',
                        name: 'token',
                        message: "Enter Token"
                    }).then((response: any) => {
                        data.token = response.token
                        fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
                        console.log(color("[System]", "yellow"), color("Configuration has been saved, please start again", "green"))
                    })
                } else {
                    fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
                    console.log(color("[System]", "yellow"), color("Configuration has been saved, please start again", "green"))
                }
            })
        } else {
            fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
            console.log(color("[System]", "yellow"), color("Configuration has been saved, please start again", "green"))
        }
    })
}