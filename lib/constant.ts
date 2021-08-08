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

interface videoMessage {
    duration: number,
    width: number,
    height: number,
    file_name: string,
    mime_type: string,
    thumb: {
        file_id: string,
        file_unique_id: string,
        file_size: string,
        width: string,
        height: string
    },
    file_id: string,
    file_unique_id: string,
    file_size: number
}

interface stickerMessage {
    width: number,
    height: number,
    emoji: string,
    set_name: string,
    is_animated: boolean,
    thumb: {
        file_id: string,
        file_unique_id: string,
        file_size: number,
        width: number,
        height: number
    },
    file_id: string,
    file_unique_id: string,
    file_size: string
}

interface voiceMessage {
    duration: number,
    mime_type: string,
    file_id: string,
    file_unique_id: string,
    file_size: string
}

interface audioMessage {
    duration: number,
    file_name: string,
    mime_type: string,
    title?: string,
    performer?: string,
    file_id: string,
    file_unique_id: string,
    file_size: number
}

interface animationMessage {
    file_name: string,
    mime_type: string,
    duration: number,
    width: number,
    height: number,
    file_id: string,
    file_unique_id: string,
    file_size: number
}

interface documentMessage {
    file_name: string,
    mime_type: string,
    file_id: string,
    file_unique_id: string,
    file_size: number
}

interface replyMessage {
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
    caption?: string,
    video?: videoMessage,
    photo?: Array<photoMessage>,
    sticker?: stickerMessage,
    voice?: voiceMessage,
    audio?: audioMessage,
    animation?: animationMessage,
    document?: documentMessage,
    poll?: pollMessage
}

interface optionsPollMessage {
    text: string,
    voter_count: number
}

interface pollMessage {
    id: string,
    question: string,
    total_voter_count: number,
    options: Array<optionsPollMessage>,
    is_closed: boolean,
    is_anonymous: boolean,
    type: string,
    allow_multiple_answer: boolean
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
    caption?: string,
    video?: videoMessage,
    photo?: Array<photoMessage>,
    sticker?: stickerMessage,
    voice?: voiceMessage,
    audio?: audioMessage,
    animation?: animationMessage,
    document?: documentMessage,
    reply_to_message?: replyMessage,
    poll?: pollMessage
}