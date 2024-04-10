let handler = m => m 

import { canLevelUp,xpRange, } from '../lib/levelling.js'
handler.before = async function(m) {
let { exp, limit, age, money, level, role, registered, team } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
         let chat = global.db.data.chats[m.chat]
        let _autolevelup = global.lg[chat.sprache]._autolevelup
let { min, xp, max } = xpRange(user.level, global.multiplier)
     if (chat.autolevelup && m.isGroup) {
    if (!user.autolevelup) return !0
    let before = user.level * 1
             let xpNeeded = max - exp
             let nextRank = canLevelUp(user.level, exp, global.multiplier) ? role : getNextRank(user.level)
        const pushname = m.pushName || _autolevelup.noname
    while (canLevelUp(user.level, user.exp, global.multiplier)) {
        user.level++
    }  
    if (before !== user.level) {
        await this.reply(m.chat, `${_autolevelup.levelup.replace('%name', pushname).replace('%before', before).replace('%level', user.level).replace('%min', min).replace('%max', max).replace('%role', role)}`,m)
          // await this.reply(m.chat, `${pushname}\n_*Level Up!*_\n_${before}_ -> _${user.level}_\n${min}/${max}xp\n🚀 Dein rank *${role}* 🚀\n`.trim(),m)
    }
}
        }
export default handler

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
}
 
function toNumber(property, _default = 0) { 
    if (property) return (a, i, b) => {
        return {...b[i], [property]: a[property] === undefined ? _default : a[property] }
    }
    else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
    return a.jid 

}  
function getNextRank(level) {
    let arr = Object.keys(global.multiplier)
    let position = false
    Object.keys(global.multiplier).forEach((key) => {
        if (level <= key) {
            position = key
        }
    })
    if (position !== false) {
        return arr[position]
    }
}