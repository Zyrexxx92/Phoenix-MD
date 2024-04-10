let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.mentionedJid[0] || m.sender]
  let xp = user.exp
  conn.reply(m.chat, `XP von ${m.mentionedJid[0] || 'dir'}: ${xp}`, m)
}

handler.help = ['xa']
handler.tags = ['xp']
handler.command = /^xa$/i

export default handler