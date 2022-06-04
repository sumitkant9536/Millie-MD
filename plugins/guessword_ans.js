const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*wrhint/i.test(m.quoted.text)) return !0
    this.guessword = this.guessword ? this.guessword : {}
        if (!(id in this.guessword)) return !0
        if (m.quoted.id == this.guessword[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.guessword[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.guessword[id][2]
            m.reply(`*Correct!*\n+${this.guessword[id][2]} XP`)
            clearTimeout(this.guessword[id][3])
            delete this.guessword[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
