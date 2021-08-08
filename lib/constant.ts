export enum LocationFiles {
    config = './data/bot/config.json'
}

export interface configFormat {
    username: string,
    token: string
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