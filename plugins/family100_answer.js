const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*fmhint/i.test(m.quoted.text)) return !0
    this.family100 = this.family100 ? this.family100 : {}
        if (!(id in this.family100)) return m.reply('The matter has ended')
        if (m.quoted.id == this.family100[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.family100[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.family100[id][2]
            m.reply(`*Correct!*\n+${this.family100[id][2]} XP`)
            clearTimeout(this.family100[id][3])
            delete this.family100[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
