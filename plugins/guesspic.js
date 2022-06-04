let fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
  conn.guesspic = conn.guesspic ? conn.guesspic : {}
  let id = m.chat
  if (id in conn.guesspic) {
    conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.tebakgambar[id][0])
    throw false
  }
  let res = await fetch(global.API('zahir', '/api/kuis/tebakgambar', {}, 'apikey'))
  if (res.status !== 200) throw await res.text()
  let json = await res.json()
  // if (!json.status) throw json
  let caption = `
Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}hint for hint
Bonus: ${poin} XP
    `.trim()
  conn.guesspic[id] = [
    await conn.sendFile(m.chat, json.result.images, 'tebakgambar.jpg', caption, m, false, { thumbnail: Buffer.alloc(0) }),
    json, poin,
    setTimeout(() => {
      if (conn.guesspic[id]) conn.reply(m.chat, `Time is up!\nThe Answer Is *${json.result.jawaban}*`, conn.guesspic[id][0])
      delete conn.guesspic[id]
    }, timeout)
  ]
}
handler.help = ['guesspic']
handler.tags = ['game']
handler.command = /^guesspic/i

module.exports = handler
