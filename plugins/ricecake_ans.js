const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*rchint/i.test(m.quoted.text)) return !0
    this.ricecake = this.ricecake ? this.ricecake : {}
        if (!(id in this.ricecake)) return !0
        if (m.quoted.id == this.ricecake[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.ricecake[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.ricecake[id][2]
            m.reply(`*Correct!*\n+${this.ricecake[id][2]} XP`)
            clearTimeout(this.ricecake[id][3])
            delete this.ricecake[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
