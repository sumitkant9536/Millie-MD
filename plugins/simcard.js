let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/simpcard', {
    avatar: await conn.getProfilePicture(who).catch(_ => 'https://telegra.ph/file/755a7ce9b80c608ec22d0.jpg'),
  }), 'simpcard.jpg', 'simp', m)
}

handler.help = ['simpcard']
handler.tags = ['maker']

handler.command = /^(simpcard)$/i

module.exports = handler
