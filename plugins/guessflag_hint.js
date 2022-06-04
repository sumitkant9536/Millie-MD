let handler = async (m, { conn }) => {
    conn.guessflag = conn.guessflag ? conn.guessflag : {}
    let id = m.chat
    if (!(id in conn.guessflag)) throw false
    let json = conn.guessflag[id][1]
    m.reply('```' + json.name.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^flhint$/i
handler.limit = true
module.exports = handler
