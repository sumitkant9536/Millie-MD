let handler = async (m, { conn }) => {
    conn.guesschem = conn.guesschem ? conn.guesschem : {}
    let id = m.chat
    if (!(id in conn.guesschem)) throw false
    let json = conn.guesschem[id][1]
    m.reply('```' + json.symbol.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^chhint$/i
handler.limit = true
module.exports = handler
