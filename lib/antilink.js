import * as fs from 'fs';

let handler = m => m

let linkRegex = /chat.whatsapp.com\//i
handler.before = async function (m, { isAdmin, isBotAdmin, conn }) {
//  if (isAdmin) { m.reply('*Link grup itu gak boleh dikirim ya admin :v*') }
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)
  
  if (isGroupLink && !fs.readFileSync("ruppenlinks.txt", "utf-8").includes(m.text)) {
    try {
      fs.appendFile("ruppenlinks.txt", m.text+'\n', (err) => {});
    } catch (error) {
      console.error(error)
    }
  }
  
  let handler = function (m) {
    if (!m.quoted) throw false
    let { chat, fromMe, id } = m.quoted
    conn.sendMessage(m.chat, { delete: { remoteJid: m.chat,  id: m.quoted.id, participant: m.quoted.sender } })
  } 

  if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
    if (isAdmin) { m.reply('*Link grup itu gak boleh dikirim ya admin :v*') }
    if (m.text.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikic 
    if (isAdmin) { m.reply('*Link grup itu gak boleh dikirim ya admin :v*') }
    if (!isBotAdmin) m.reply(` *「 ANTILINK 」* ${isAdmin ? "Admin ist kostenlos yay :'v" : `\n\nGruppenlink erkannt und ${global.namabot} ist kein Admin, kann also nicht kicken!`}`)
    if (isBotAdmin) {
      m.reply(global.lg[global.db.data.chats[m.chat].sprache]._antilink.text)
      await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
      await conn.sendMessage(m.chat, { delete: m.key })
    }
  }
  return true
}

export default handler
