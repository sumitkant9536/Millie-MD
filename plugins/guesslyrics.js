const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.guesslyrics = conn.guesslyrics ? conn.guesslyrics : {}
    let id = m.chat
    if (id in conn.guesslyrics) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.guesslyrics[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/guesslyrics.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Question_* ${json.question}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}lyhint for help
Bonus: ${poin} XP
    `.trim()
    conn.guesslyrics[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.guesslyrics[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.answer}*`, conn.guesslyrics[id][0])
            delete conn.guesslyrics[id]
        }, timeout)
    ]
}
handler.help = ['guesslyrics']
handler.tags = ['game']
handler.command = /^guesslyrics/i

module.exports = handler
