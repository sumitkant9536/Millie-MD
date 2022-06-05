const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.guessph = conn.guessph ? conn.guessph : {}
    let id = m.chat
    if (id in conn.guessph) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.guessph[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/guessflag2.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}wrhint for help
Bonus: ${poin} XP
    `.trim()
    conn.guessph[id] = [
        await conn.reply(m.chat, json.img, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.guessph[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.jawaban}*`, conn.guessph[id][0])
            delete conn.guessph[id]
        }, timeout)
    ]
}
handler.help = ['guessph']
handler.tags = ['game']
handler.command = /^guessph/i

module.exports = handler
