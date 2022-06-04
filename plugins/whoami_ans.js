const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*whfint/i.test(m.quoted.text)) return !0
    this.whoami = this.whoami ? this.whoami : {}
        if (!(id in this.whoami)) return !0
        if (m.quoted.id == this.whoami[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.whoami[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.whoami[id][2]
            m.reply(`*Correct!*\n+${this.whoami[id][2]} XP`)
            clearTimeout(this.whoami[id][3])
            delete this.whoami[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
