import parse from "parse-duration";

export function filterDuration(duration: number, target?: string) {
    let match: boolean
    if (target) {
        if (target.endsWith('h')) {
            if (duration >= parse(target, 's')) {
                match = true
            } else {
                match = false
            }
        } else if (target.endsWith('m')) {
            if (duration >= parse(target, 's')) {
                match = true
            } else {
                match = false
            }
        } else if (target.endsWith('s')) {
            if (duration >= parse(target, 's')) {
                match = true
            } else {
                match = false
            }
        } else {
            if (duration >= parse(target, 's')) {
                match = true
            } else {
                match = false
            }
        }
    } else {
        if (duration >= parse('10m', 's')) {
            match = true
        } else {
            match = false
        }
    }

    return match
}


export function checkValidUrl(url: string) {
    const regex = new RegExp("https?://")
    return regex.test(url)
}