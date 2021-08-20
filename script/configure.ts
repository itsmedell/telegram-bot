import {
    prompt
} from 'enquirer'
import fs from 'fs'
import {
    configure,
    locFiles,
    configureFix
} from '../lib/constant'
import * as constant from '../lib/constant'
import { color, checkFormatToken } from '../lib/utility'

prompt(configure)
.then(async (data: constant.configFormat) => {
    switch (data.prefix) {
        case "multi":
            console.log(color("[System]", "yellow"), color("Please use [,] for separator between prefix", "white"))
            await prompt({
                type: "input",
                name: "prefix",
                message: "Masukan prefix"
            }).then((res: any) => {
                data.prefix = res.prefix.split(",")
                data.prefix.push("/")
            })
            break
        case "single":
            await prompt({
                type: "input",
                name: "prefix",
                message: "Masukan prefix"
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
        console.log(color("[System]", "yellow"), color("Format token you entered invalid!", "red"))
        prompt(configureFix)
            .then((result: any) => {
                switch (result.confirm) {
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
                        console.log(color("[System]", "yellow"), color("Configuration has been saved.", "green"))
                    })
                } else {
                    fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
                    console.log(color("[System]", "yellow"), color("Configuration has been saved.", "green"))
                }
            })
    } else {
        fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
        console.log(color("[System]", "yellow"), color("Configuration has been saved.", "green"))
    }
})