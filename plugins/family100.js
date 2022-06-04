const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.family100 = conn.family100 ? conn.family100 : {}
    let id = m.chat
    if (id in conn.family100) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.family100[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/family100.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}fmhint for help
Bonus: ${poin} XP
    `.trim()
    conn.family100[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.family100[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.jawaban}*`, conn.family100[id][0])
            delete conn.family100[id]
        }, timeout)
    ]
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100/i

module.exports = handler
