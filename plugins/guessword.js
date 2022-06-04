const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.guessword = conn.guessword ? conn.guessword : {}
    let id = m.chat
    if (id in conn.guessword) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.guessword[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/guessword.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Question-* ${json.question}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}wrhint for help
Bonus: ${poin} XP
    `.trim()
    conn.guessword[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.guessword[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.answer}*`, conn.guessword[id][0])
            delete conn.guessword[id]
        }, timeout)
    ]
}
handler.help = ['guessword']
handler.tags = ['game']
handler.command = /^guessword/i

module.exports = handler
