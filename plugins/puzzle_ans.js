const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*pzhint/i.test(m.quoted.text)) return !0
    this.puzzle = this.puzzle ? this.puzzle : {}
        if (!(id in this.puzzle)) return !0
        if (m.quoted.id == this.puzzle[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.puzzle[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.puzzle[id][2]
            m.reply(`*Correct!*\n+${this.puzzle[id][2]} XP`)
            clearTimeout(this.puzzle[id][3])
            delete this.puzzle[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
