const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.brainteaser = conn.brainteaser ? conn.brainteaser : {}
    let id = m.chat
    if (id in conn.brainteaser) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.brainteaser[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/brainteaser.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Question_* ${json.question}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}brhint for help
Bonus: ${poin} XP
    `.trim()
    conn.brainteaser[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.brainteaser[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.answer}*`, conn.brainteaser[id][0])
            delete conn.brainteaser[id]
        }, timeout)
    ]
}
handler.help = ['brainteaser']
handler.tags = ['game']
handler.command = /^brainteaser/i

module.exports = handler
