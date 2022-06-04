const fs = require('fs')
const fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.guesschem = conn.guesschem ? conn.guesschem : {}
    let id = m.chat
    if (id in conn.guesschem) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.guesschem[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/sumitkant9536/database/master/games/guesschem.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
*Element-* ${json.element}
  \nguess the element symbol

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}chhint for help
Bonus: ${poin} XP
    `.trim()
    conn.guesschem[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.guesschem[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.symbol}*`, conn.guesschem[id][0])
            delete conn.guesschem[id]
        }, timeout)
    ]
}
handler.help = ['guesschem']
handler.tags = ['game']
handler.command = /^guesschem/i

module.exports = handler
