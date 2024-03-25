const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const prefix = global.prefa;
const path = require("path");
const package = require("../package.json");

const pad = (s) => (s < 10 ? "0" : "") + s;
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);
  return (time = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`);
};
const uptime = () => formatTime(process.uptime());

let mergedCommands = ["stalk", "nowa", "stalkwhatsapp", "stalknumber"];

module.exports = {
  name: "stalk",
  alias: [...mergedCommands],
  uniquecommands: ["stalk ", "nowa", "stalkwhatsapp", "stalknumber"],
  desc: "Search for a whatsapp number in a given range",
  usage: "stalk 4365022999902xxx",
  doReact: "🎈",
  category: "Core",
  start: async (Phoenix, m, { pushName, args, prefix, doReact, inputCMD, text }) => {
   {switch (inputCMD) { 
    case "stalk":
        case "nowa":
        case "stalkwhatsapp":
        case "stalknumber":
          await doReact("🎈");
    if (!text) return m.reply(`📵🔢 Enter a number ending with 'x'\n\nExample: ${prefix + "stalk"}  4365022999902xxx`)
var inputnumber = text.split(" ")[0]
        
        m.reply(`📱🔍 Exploring for WhatsApp accounts within the range...`)
        function countInstances(string, word) {
            return string.split(word).length - 1
        }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx
        if (random_length == 1) {
            randomxx = 10
        } else if (random_length == 2) {
            randomxx = 100
        } else if (random_length == 3) {
            randomxx = 1000
        }
        var text66 = `🔖 *WhatsApp Numbers Directory*\n\n`
        var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
        var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`
        for (let i = 0; i < randomxx; i++) {
            var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            var status1 = nu[Math.floor(Math.random() * nu.length)]
            var status2 = nu[Math.floor(Math.random() * nu.length)]
            var status3 = nu[Math.floor(Math.random() * nu.length)]
            var dom4 = nu[Math.floor(Math.random() * nu.length)]
            var random21
            if (random_length == 1) {
                random21 = `${status1}`
            } else if (random_length == 2) {
                random21 = `${status1}${status2}`
            } else if (random_length == 3) {
                random21 = `${status1}${status2}${status3}`
            } else if (random_length == 4) {
                random21 = `${status1}${status2}${status3}${dom4}`
            }
            var anu = await Phoenix.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`)
            var anuu = anu.length !== 0 ? anu : false
            try {
                try {
                    var anu1 = await Phoenix.fetchStatus(anu[0].jid)
                } catch {
                    var anu1 = '401'
                }
                if (anu1 == '401' || anu1.status.length == 0) {
                    nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`
                } else {
                    text66 += `📞 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n 🌐 ️*Bio :* ${anu1.status}\n⏳️*Last update :* ${moment(anu1.setAt).tz('Europe/Berlin').format('HH:mm:ss DD/MM/YYYY')}\n\n`
                }
            } catch {
                nowhatsapp += `${number0}${i}${number1}\n`
            }
        }
        m.reply(`${text66}${nobio}${nowhatsapp}`)
        
      break;
      default:
        break;
      }
    }
  },
};
  
