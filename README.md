# <p align="center">Telegram Bot</p>

<p align="center">
    <a href="https://github.com/lendradev/#readme"><img src="https://img.shields.io/github/license/lendradev/telegram-bot?color=blue&label=License&logo=github&style=flat-square"></a>
    <a href="https://github.com/lendradev/#readme"><img src="https://img.shields.io/github/package-json/v/lendradev/telegram-bot?color=blue&label=Version&logo=github&style=flat-square"></a>
    <a href="https://github.com/lendradev/#readme"><img src="https://img.shields.io/github/repo-size/lendradev/telegram-bot?label=Size&logo=github&style=flat-square"></a>
</p>

#

## 📑 **Requirements**
- [Git](https://git-scm.com/downloads)
- [Node V14+](https://nodejs.org/en/download)
- [Ffmpeg](https://ffmpeg.org/download.html)

#

## ⚙️ **Installation**

> **Linux**
```bash
> sudo apt update && sudo apt upgrade # Optional
> sudo apt install git nodejs ffmpeg
> sudo npm install -g yarn # Optional
> git clone https://github.com/lendradev/telegram-bot
> cd telegram-bot
> yarn install
> yarn start
```

> **Termux**
```bash
> pkg update && pkg upgrade # Optional
> pkg install git nodejs ffmpeg
> npm install -g yarn # Optional
> git clone https://github.com/lendradev/telegram-bot
> cd telegram-bot
> yarn install
> yarn start
```

# 

## 📔 Features

<!-- Regular Section -->
<details>
<summary>Regular</summary>
<br>

| Name  | Aliases | Arguments |
|:------|:-------:|:---------:|
| hello |   hai   |   none    |
| say   |  none   |   none    |


</details>

<h1></h1>

<!-- Downloader Section -->
<details>
<summary>Downloader</summary>
<br>

| Name  |    Aliases     | Arguments |       Description       |
|:-----:|:--------------:|:---------:|:-----------------------:|
| ytmp3 |  ytaudio, yta  |   [url]   | Download youtube audio  |
| fbmp3 |  fba, fbaudio  |   [url]   | Download facebook audio |
| ytmp4 |   ytvid, ytv   |   [url]   | Download youtube video  |
| fbmp4 | fbvid, fbvideo |   [url]   | Download facebook video |

</details>

<h1></h1>

<!-- Bot Section -->
<details>
<summary>Bot</summary>
<br>

| Name |   Aliases   | Arguments |         Description         |
|:----:|:-----------:|:---------:|:---------------------------:|
| ping |    pong     |   none    |      Send pong message      |
| menu | help, guide |   none    | Send all guide bot features |

</details>

<h1></h1>

<!-- Games Section -->
<details>
<summary>Game</summary>
<br>

| Name |     Aliases      | Arguments  |                  Description                  |
|:----:|:----------------:|:----------:|:---------------------------------------------:|
|  is  | 8ball, eightball | [question] | Answer random question with random answer too |

</details>