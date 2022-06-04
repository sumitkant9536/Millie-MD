const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*brhint/i.test(m.quoted.text)) return !0
    this.brainteaser = this.brainteaser ? this.brainteaser : {}
        if (!(id in this.brainteaser)) return !0
        if (m.quoted.id == this.brainteaser[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.brainteaser[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.brainteaser[id][2]
            m.reply(`*Correct!*\n+${this.brainteaser[id][2]} XP`)
            clearTimeout(this.brainteaser[id][3])
            delete this.brainteaser[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
