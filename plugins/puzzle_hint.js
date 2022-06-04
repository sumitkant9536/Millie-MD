let handler = async (m, { conn }) => {
    conn.puzzle = conn.puzzle ? conn.puzzle : {}
    let id = m.chat
    if (!(id in conn.puzzle)) throw false
    let json = conn.puzzle[id][1]
    m.reply('```' + json.answer.replace(/[AUIEOaiueo]/g, '_') + '```')
}
handler.command = /^pzhint$/i
handler.limit = true
module.exports = handler
