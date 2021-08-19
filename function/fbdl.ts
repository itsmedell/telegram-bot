export function getValidUrl(url: string) {
    const REGEX = RegExp('https:/www|m.facebook|fb.watch/[aA0-zZ9]|com/watch/\\?v=[0-9]+')
    console.log(REGEX)
    return REGEX.test(url)
}