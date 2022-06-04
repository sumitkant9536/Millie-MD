let handler = async (m, { conn }) => {
    conn.brainteaser = conn.brainteaser ? conn.brainteaser : {}
    let id = m.chat
    if (!(id in conn.brainteaser)) throw false
    let json = conn.brainteaser[id][1]
    m.reply('```' + json.answer.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^brhint$/i
handler.limit = true
module.exports = handler
