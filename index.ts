import { 
    prompt
} from 'enquirer';
import * as constant from './lib/constant'
import * as bot from './bot'
import {
    checkFormatToken
} from './lib/utility'
import fs from 'fs'

// Variable
const { LocationFiles, configure, configureFix } = constant

if (fs.existsSync(LocationFiles.config)) {
    bot.starts()
} else {
    prompt(configure)
    .then((data: constant.configFormat) => {
        if (!checkFormatToken(data.token)) {
            let retry = false
            console.log("Format token yang anda masukan salah!")
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
                        fs.writeFileSync(LocationFiles.config, JSON.stringify(data, null, 2))
                        console.log("Silahkan jalankan ulang bot ini")
                    })
                } else {
                    fs.writeFileSync(LocationFiles.config, JSON.stringify(data, null, 2))
                    console.log("Silahkan jalankan ulang bot ini")
                }
            })
        } else {
            fs.writeFileSync(LocationFiles.config, JSON.stringify(data, null, 2))
            console.log("Silahkan jalankan ulang bot ini")
        }
    })
}