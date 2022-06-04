let handler = async (m, { conn }) => {
    conn.guessword = conn.guessword ? conn.guessword : {}
    let id = m.chat
    if (!(id in conn.guessword)) throw false
    let json = conn.guessword[id][1]
    m.reply('```' + json.answer.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^wrhint$/i
handler.limit = true
module.exports = handler
