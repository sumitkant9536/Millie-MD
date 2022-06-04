let handler = async (m, { conn }) => {
    conn.guesssentc = conn.guesssentc ? conn.guesssentc : {}
    let id = m.chat
    if (!(id in conn.guesssentc)) throw false
    let json = conn.guesssentc[id][1]
    m.reply('```' + json.answer.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^snhint$/i
handler.limit = true
module.exports = handler
