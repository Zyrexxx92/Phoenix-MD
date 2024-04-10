import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
  let lastUse = {}
  let cooldown = 10 * 1000 // 20 Sekunden

  if(!lastUse[m.sender]) 
    lastUse[m.sender] = 0

  let elapsed = Date.now() - lastUse[m.sender]

  if (elapsed < cooldown) {
    return conn.reply(m.chat, `⏱️ Warte noch ${Math.round((cooldown - elapsed) / 1000)} Sekunden, bevor du diesen Command erneut nutzen kannst. ⏱️`, m)
  }
  
  lastUse[m.sender] = Date.now()

  let user = global.db.data.users[m.sender]
  let { exp, limit, team, level, role, registered } = user

  let name = registered ? user.name : conn.getName(m.sender)

  let adminStatusCheck = isAdmin ? '✔️ Ja' : '❌ Nein'
  let ownerStatusCheck = isOwner ? '✔️ Ja' : '❌ Nein' 

  let str = `👤 *User Information* 👤\n📛 Name: *${name}*\n💼 Limit: *${limit}*\n👑 Gruppen-Admin Status: *${adminStatusCheck}*\n👑 Besitzer: *${ownerStatusCheck}*\n` 

  if (team !== 'user') {
    str += `🔰 Besonderer Rang: *${team}*\n`
  }

  let xpInfo = xpRange(user.level, global.multiplier)
  str += `🎯 Level: *${level}* \n📊 Rang: *${role}*\n⚔️ xp: *${exp}/${xpInfo.max}* \n`

  m.reply(str)
}

handler.help = ['xp']
handler.tags = ['xp']
handler.command = /^(xp|lvl|cp|level)$/i
handler.register = true

export default handler