let handler = async (m, { conn }) => {
    conn.guesspic = conn.guesspic ? conn.guesspic : {}
    let id = m.chat
    if (!(id in conn.guesspic)) throw false
    let json = conn.guesspic[id][1]
    m.reply('```' + json.result.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_') + '```')
}
handler.command = /^hint$/i

module.exports = handler
