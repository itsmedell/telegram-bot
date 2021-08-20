import moment from "moment";
import fs from 'fs';
import ytdl, { videoFormat } from "ytdl-core";

export function shortNumberFormat(value: number): string {
    let resultValue: string;
    const formatList = ["", "K", "M", "B", "T"];
    let formatNumber = 0;
    if (value < 1000) return value.toString();

    while(value >= 1000) {
        if (value >= 100000) {
            resultValue = (value /= 1000).toPrecision(3);
            formatNumber++;
        } else {
            resultValue = (value /= 1000).toPrecision(2);
            formatNumber++;
        }
    }

    if (/\.0$/.test(resultValue)) {
        resultValue = resultValue.substr(0, resultValue.length - 2)
    }

    return `${resultValue} ${formatList[formatNumber]}`
}

export function chooseQuality(format: videoFormat[], target: string, alternative: string) {
    try {
        return ytdl.chooseFormat(format, {quality: target})
    } catch (error) {
        return ytdl.chooseFormat(format, {quality: alternative})
    }
}