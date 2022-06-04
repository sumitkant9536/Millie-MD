const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.whoami = conn.whoami ? conn.whoami : {}
    let id = m.chat
    if (id in conn.whoami) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.whoami[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/whoami.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Question-* ${json.question}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}whhint for help
Bonus: ${poin} XP
    `.trim()
    conn.whoami[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.whoami[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.answer}*`, conn.whoami[id][0])
            delete conn.whoami[id]
        }, timeout)
    ]
}
handler.help = ['whoami']
handler.tags = ['game']
handler.command = /^whoami/i

module.exports = handler
