let handler = async (m, { conn }) => {
    conn.guesslyrics = conn.guesslyrics ? conn.guesslyrics : {}
    let id = m.chat
    if (!(id in conn.guesslyrics)) throw false
    let json = conn.guesslyrics[id][1]
    m.reply('```' + json.answer.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^lyhint$/i
handler.limit = true
module.exports = handler
