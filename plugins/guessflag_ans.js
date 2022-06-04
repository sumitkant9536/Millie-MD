const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*flhint/i.test(m.quoted.text)) return !0
    this.guessflag = this.guessflag ? this.guessflag : {}
        if (!(id in this.guessflag)) return !0
        if (m.quoted.id == this.guessflag[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.guessflag[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.guessflag[id][2]
            m.reply(`*Correct!*\n+${this.guessflag[id][2]} XP`)
            clearTimeout(this.guessflag[id][3])
            delete this.guessflag[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
