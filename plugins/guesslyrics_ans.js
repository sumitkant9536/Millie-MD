const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*lyhint/i.test(m.quoted.text)) return !0
    this.guesslyrics = this.guesslyrics ? this.guesslyrics : {}
        if (!(id in this.guesslyrics)) return !0
        if (m.quoted.id == this.guesslyrics[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.guesslyrics[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.guesslyrics[id][2]
            m.reply(`*Correct!*\n+${this.guesslyrics[id][2]} XP`)
            clearTimeout(this.guesslyrics[id][3])
            delete this.guesslyrics[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
