import { Context } from "telegraf"

// Variable Lines
export const configure = [
    {
        type: "input",
        name: "username",
        message: "Username"
    },
    {
        type: "password",
        name: "token",
        message: "Token"
    },
    {
        type: "select",
        name: "prefix",
        message: "Type Prefix",
        choices: [
            "single",
            "multi"
        ]
    }
]

export const configureFix = {
    type: "select",
    name: "confirm",
    message: "Choose yes / no",
    choices: [
        "yes",
        "no"
    ]
}

// Enum Lines
export enum locFiles {
    config = './data/bot/config.json',
    data = './data/',
    plugin = './plugin/',
    lib = './lib/',
    func = './function/'
}

// Type lines
type typeChat = "channel" | "supergroup" | "private" | "group" 

// Interface Lines
export interface configFormat {
    username: string,
    token: string,
    prefix: string[]|string|any
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
        type: typeChat
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
        type: typeChat
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

type permission = "free" | "owner" | "premium"
type category = "downloader" | "bot" | "game" | "regular" | "media" | "converter"

export interface menuList {
    name: string,
    aliases?: string[],
    description?: string,
    category: category,
    permission: permission
}

export interface pluginFormat {
    name: string,
    aliases?: string[],
    description?: string,
    category: category,
    permission: permission
    execute(context: Context, message: ContextMessage, args: string[]): void
}

export interface ytdlEntry {
    title: string,
    author: string,
    duration: string,
    viewCount: string,
    uploadDate: string,
    type: "audio"|"video",
    linkdl: string
}

export interface fbdlEntry {
    title: string,
    author: string,
    duration: string,
    uploadDate: string,
    viewCount: number,
    quality: string,
    type: "Audio"|"Video",
    size: string,
    linkdl: string
}

export interface fbdlResult {
    title: string,
    author: string,
    quality: string,
    uploadDate: string,
    duration: string,
    thumbnail: string,
    linkdl: string,
    size: string,
    viewCount: number,
}

export interface resUploadFile {
    fileName: string,
    fileUrl: string,
    fileSize: string
}