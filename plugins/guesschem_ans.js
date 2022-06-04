const similarity = require('similarity')
const threshold = 0.72
module.exports = {
    async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*chhint/i.test(m.quoted.text)) return !0
    this.guesschem = this.guesschem ? this.guesschem : {}
        if (!(id in this.guesschem)) return m.reply("galat")
        if (m.quoted.id == this.guesschem[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.guesschem[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.symbol.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.guesschem[id][2]
            m.reply(`*Correct!*\n+${this.guesschem[id][2]} XP`)
            clearTimeout(this.guesschem[id][3])
            delete this.guesschem[id]
        } else if (similarity(m.text.toLowerCase(), json.symbol.toLowerCase().trim()) >= threshold) m.reply(`*a little more!*`)
        else m.reply(`*Wrong!*`)
    }
    return !0
},
exp: 0
}
