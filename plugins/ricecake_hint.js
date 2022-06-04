let handler = async (m, { conn }) => {
    conn.ricecake = conn.ricecake ? conn.ricecake : {}
    let id = m.chat
    if (!(id in conn.ricecake)) throw false
    let json = conn.ricecake[id][1]
    m.reply('```' + json.answer.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^rchint$/i
handler.limit = true
module.exports = handler
