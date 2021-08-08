export enum locFiles {
    config = './data/bot/config.json',
    data = './data/',
    plugin = './plugin/',
    lib = './lib/',
    func = './function/'
}

export interface configFormat {
    username: string,
    token: string,
    prefix: string[]|string
}

interface photoMessage {
    file_id: string,
    file_unique_id: string,
    file_size: number,
    width: number,
    height: number
}

export interface ContextMessage {
    message_id: number,
    from: {
        id: number,
        is_bot: boolean,
        first_name: string,
        username: string,
        language_code: string
    },
    chat: {
        id: number,
        first_name: string,
        username: string,
        language_code: string,
        type: string
    },
    date: number,
    text?: string,
    photo?: Array<photoMessage>
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