const similarity = require('similarity')
const threshold = 0.72
module.exports = {
  async before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/type.*hint/i.test(m.quoted.text)) return !0
    this.guesspic = this.guesspic ? this.guesspic : {}
    if (!(id in this.guesspic)) return m.reply('The matter has ended')
    if (m.quoted.id == this.guesspic[id][0].id) {
      let json = JSON.parse(JSON.stringify(this.guesspic[id][1]))
      // m.reply(JSON.stringify(json, null, '\t'))
      if (m.text.toLowerCase() == json.result.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += this.guesspic[id][2]
        m.reply(`*Correct!*\n+${this.guesspic[id][2]} XP`)
        clearTimeout(this.guesspic[id][3])
        delete this.guesspic[id]
      } else if (similarity(m.text.toLowerCase(), json.result.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
      else m.reply(`*Wrong!*`)
    }
    return !0
  },
  exp: 0
}
