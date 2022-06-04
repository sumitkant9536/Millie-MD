const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.puzzle = conn.puzzle ? conn.puzzle : {}
    let id = m.chat
    if (id in conn.puzzle) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.puzzle[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/puzzle.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Question-* ${json.question}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}pzhint for help
Bonus: ${poin} XP
    `.trim()
    conn.puzzle[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.puzzle[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.answer}*`, conn.puzzle[id][0])
            delete conn.puzzle[id]
        }, timeout)
    ]
}
handler.help = ['puzzle']
handler.tags = ['game']
handler.command = /^puzzle/i

module.exports = handler
