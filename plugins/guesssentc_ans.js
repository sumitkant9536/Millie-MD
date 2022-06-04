const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*snhint/i.test(m.quoted.text)) return !0
    this.guesssentc = this.guesssentc ? this.guesssentc : {}
        if (!(id in this.guesssentc)) return !0
        if (m.quoted.id == this.guesssentc[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.guesssentc[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.guesssentc[id][2]
            m.reply(`*Correct!*\n+${this.guesssentc[id][2]} XP`)
            clearTimeout(this.guesssentc[id][3])
            delete this.guesssentc[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
