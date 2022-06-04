const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.guessflag = conn.guessflag ? conn.guessflag : {}
    let id = m.chat
    if (id in conn.guessflag) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.guessflag[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/guessflag2.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
 ${json.img}
\n*Click the url and guess the country flag*

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}flhint for help
Bonus: ${poin} XP
    `.trim()
    conn.guessflag[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.guessflag[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.name}*`, conn.guessflag[id][0])
            delete conn.guessflag[id]
        }, timeout)
    ]
}
handler.help = ['guessflag']
handler.tags = ['game']
handler.command = /^guessflag/i

module.exports = handler
