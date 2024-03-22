const fs = require("fs");
const config = require("../Configurations.js");
const eco = require("discord-mongoose-economy");
const ty = eco.connect(config.mongodb);
const { userData } = require("../System/MongoDB/MongoDb_Schema.js");
const axios = require("axios");
const path = require("path");
const package = require("../package.json");









//////////
let mergedCommands = [
    uniquecommands= [
        "ping", 
        "team",
        "runtime",
         "test", 
         "p"
        
        ],

    
  ];

module.exports = {
    name: "systemcommands",
    alias: [...mergedCommands],
    uniquecommands: ["ping", "team", "runtime", "test", "p"],
    description: "All system commands",
    start: async (
      Phoenix,
      m,
      { pushName, prefix, inputCMD, doReact, text, args }
    ) => {
      const pic = fs.readFileSync("./Assets/Phoenix.jpg");
      switch (inputCMD) {

case 'runtime': {
    let lowq = `*Bot ist Aktiv seit:*\n🎉 *${runtime(process.uptime())}*`
      reply(lowq)
    }
  break

  case 'test': case 'p': case 'ping': 
  let timestampe = speed()
  let latensie = speed() - timestampe
   reply(`🧧Test erfolgreich, Bot ist aktiv!\n\n📍 *Ping* ${latensie.toFixed(4)} milisekunden\n\n Tippe ${prefix}menu um meine Befehle zu sehen`)
  break   


        
case 'team': 
  
reply(`  *━━━〈 🦁ღĹíőͥńͣ BͫØ₸ღ Team🦁 〉━━━*

*High Team* :

-👑 *Ɛ×ͥΐզͣօͫή* (Inhaber)
-👑 *Cthulhu* (Inhaber)
-👑 *𝕯𝖆𝖗𝖙𝖍 𝕾𝖎𝖉𝖎𝖔𝖚𝖘* (Inhaber)

*Teamleitung* :

-👀 *GoldtraderJD* (Leitung)
-👀 *⸸ℑꈤᥴꪊ𝕭ꪊᦓ⸸* (Stv.Leitung)

*Community-Manager* : 

-🤵 *(Name)*

*Tech-Team* :

-💎 *Baron* (Leitung)
-🕹️ *(Name)* 
-🕹️ *(Name)*

*Mod-Team* :

-💎 *Cthulhu* (Leitung)
-👮🏻‍♂️ *Toruto* (Mod)
-👮🏻‍♂️ *(Name)* (Mod)


*Support-Team* :

-💎 *Takyma* (Leitung)
-👷🏻‍♂️ *𝕾𝖆𝖒𝖚𝖗𝖆𝖎ᴳᵒᵈ* (Supporter)
-👷🏻‍♂️ *(Name)* (Supporter)
-👷🏻‍♂️ *(Name)* (Supporter)

*Hoster-Team*:

-💎 *Ɛ×ͥΐզͣօͫή* (Leitung)
-💻 *Cthulhu* (Hoster)
-💻 *GoldtraderJD* (Hoster)
-💻 *⸸ℑꈤᥴꪊ𝕭ꪊᦓ⸸* (Hoster)
-💻 *(Name)* (Hoster)

\n📛 Wir bemühen uns, euch zeitnah zu antworten, und bitten höflich darum, kein Spam zu versenden. \n\n Um eine Supportanfrage zu stellen,benutzt bitte ${prefix}support gefolgt von eurem Anliegen.\n\n✨️Danke für eure Unterstützung,euer Lion-Bot Team. `)
break;

default:
  break;
   }
  },
};
