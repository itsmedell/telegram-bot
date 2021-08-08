import {
    prompt
} from 'enquirer'
import fs from 'fs'
import {
    configFormat,
    configure,
    locFiles
} from './constant'
import { color } from './utility'


prompt(configure)
.then(async (data: configFormat) => {
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
    fs.writeFileSync(locFiles.config, JSON.stringify(data, null, 2))
    console.log(color('[System]', 'yellow'), color("Konfigurasi sudah disimpan", "green"))
})