import {
    color
} from './utility'

export enum locFiles {
    config = './data/bot/config.json'
}

export interface configFormat {
    username: string,
    token: string,
    prefix: string[]|string
}

export const configure = [
    {
        type: "input",
        name: "username",
        message: "Masukan username"
    },
    {
        type: "password",
        name: "token",
        message: "Masukan token"
    },
    {
        type: "select",
        name: "prefix",
        message: "Masukan tipe prefix",
        choices: [
            "single",
            "multi"
        ]
    }
]

export const configureFix = {
    type: "select",
    name: "confirm",
    message: "Pilih yes / no",
    choices: [
        "yes",
        "no"
    ]
}