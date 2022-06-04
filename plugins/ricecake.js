const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.ricecake = conn.ricecake ? conn.ricecake : {}
    let id = m.chat
    if (id in conn.ricecake) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.ricecake[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/ricecake.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Question-* ${json.question}
*Description-* ${json.description}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}rchint for help
Bonus: ${poin} XP
    `.trim()
    conn.ricecake[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.ricecake[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.answer}*`, conn.ricecake[id][0])
            delete conn.ricecake[id]
        }, timeout)
    ]
}
handler.help = ['ricecake']
handler.tags = ['game']
handler.command = /^ricecake/i

module.exports = handler
