const fs = require("fs");
const axios = require("axios");
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

let mergedCommands = [
  "help",
  "h",
  "menu",
  "sc",
  "support",
  "supportgc",
  "script",
  "system",
  "info",
  "about",
  "ping",
  "runtime",
  "team"
];

module.exports = {
  name: "systemcommands",
  alias: [...mergedCommands],
  uniquecommands: ["script", "support", "help", "system", "about", "ping", "runtime", "team"],
  description: "All system commands",
  start: async (
    Phoenix,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const pic = fs.readFileSync("./Assets/Phoenix.jpg");
    switch (inputCMD) {
      case "script":
      case "sc":
        await doReact("🧣");
        let repoInfo = await axios.get(
          "https://api.github.com/repos/7ucg/Phoenix-MD"
        );
        let repo = repoInfo.data;
        console.log(repo);
        let txt = `            🧣 *${botName}'s Script* 🧣\n\n*🎀 Total Forks:* ${
          repo.forks_count
        }\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${
          repo.license.name
        }\n*📁 Repo Size:* ${(repo.size / 1024).toFixed(
          2
        )} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:* ${
          repo.html_url
        }\n\n❝ Dont forget to give a Star ⭐ to the repo. It's made with restless hardwork by *Team Phoenix*. ❞\n\n*©️ Team Phoenix- 2024*`;
        Phoenix.sendMessage(m.from, { image: pic, caption: txt }, { quoted: m });
        break;

      case "support":
      case "supportgc":
        await doReact("🔰");
        let txt2 = `              🧣 *Support Group* 🧣\n\n*${botName}* is an open source project, and we are always happy to help you.\n\n*Link:* ${suppL}\n\n*Note:* Please don't spam in the group, and don't message *Admins directly* without permission. Ask for help inside *Group*.\n\n*Thanks for using Phoenix.*`;
        Phoenix.sendMessage(m.from, { image: pic, caption: txt2 }, { quoted: m });
        break;

      case "help":
      case "h":
      case "menu":
        await doReact("☃️");
        await Phoenix.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `╟   🏮 *${capitalizedFile}* 🏮   ╢\n\n`;
            formatted += `\`\`\`${commands
              .map((cmd) => `⥼   ${prefix + cmd}`)
              .join("\n")}\`\`\`\n\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\nKonnichiwa *${pushName}* Senpai,\n\nI am *${botName}*, a WhatsApp bot built to take your boring WhatsApp experience into next level.\n\n*🔖 My Prefix is:*  ${prefix}\n\n${formattedCommands}\n\n\n*©️ Team Phoenix- 2024*`;
        await Phoenix.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;
       
       
case 'runtime': {
  await doReact("👀");
  let text3 = `🧣 *${botName} Runtime* 🧣\n\n*⏱️ Bot Uptime:* ${runtime(process.uptime())}\n\n*©️ Team Phoenix- 2024*`;
  Phoenix.sendMessage(m.from, { image: pic, caption: text3 }, { quoted: m });
   
  }
break;

case 'test': case 'p': case 'ping': 
let timestampe = speed()
let latensie = speed() - timestampe
 m.reply(`🧧Test erfolgreich, Bot ist aktiv!\n\n📍 *Ping* ${latensie.toFixed(4)} milisekunden\n\n Tippe ${prefix}menu um meine Befehle zu sehen`)
break;   


      
case 'team': 
await doReact("👀");

m.reply(` *━━━〈 🦁ღĹíőͥńͣ BͫØ₸ღ Team🦁 〉━━━*

*High Team* :

-👑 *Ɛ×ͥΐզͣօͫή* (Inhaber)
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

-💎 *𝕾𝖆𝖒𝖚𝖗𝖆𝖎ᴳᵒᵈ*(Leitung)
-👷🏻‍♂️ *(Name)* (Supporter)
-👷🏻‍♂️ *(Name)* (Supporter)

*Hoster-Team*:

-💎 *Ɛ×ͥΐզͣօͫή* (Leitung)
-💻 *GoldtraderJD* (Hoster)
-💻 *⸸ℑꈤᥴꪊ𝕭ꪊᦓ⸸* (Hoster)
-💻 *(Name)* (Hoster)

\n*📛 Wir bemühen uns,* *euch zeitnah zu antworten,* *und bitten höflich darum,* *kein Spam zu versenden.* \n\n* Um eine Supportanfrage zu stellen,* *benutzt bitte ${prefix}support gefolgt von eurem Anliegen.*\n\n*✨️Danke für eure Unterstützung,euer Phoenix-Bot Team. *`)
break;
       

      case "system":
      case "info":
      case "about":
        await doReact("🔰");
        let xyz = await axios.get(
          "https://api.github.com/repos/7ucg/Phoenix-MD/releases"
        );
        let latest = xyz.data[0].tag_name;
        const version2 = package.version;
        let nodeVersion = process.version;
        let os = process.platform;
        let osVersion = process.release.lts;
        let architecture = process.arch;
        let computername = process.env.COMPUTERNAME;
        let os2 = process.env.OS;
        let cpu2 = process.env.PROCESSOR_IDENTIFIER;
        let core = process.env.NUMBER_OF_PROCESSORS;

        let txt4 = `            🧣 *System Info* 🧣


*〄 Node Version:* ${nodeVersion}

*〄 OS:* ${os2}

*〄 Platform:* ${os}

*〄 Os Version:* ${osVersion}

*〄 Computer Name:* ${computername}

*〄 CPU:* ${cpu2}

*〄 CPU Core:* ${core}

*〄 CPU Architecture:* ${architecture}

*〄 Current Bot version:* ${latest}

*〄 Latest Bot version:* ${latest}
`;

        if (latest.includes(version2) || version2.includes(latest)) {
          txt4 += `\n\n*⚠️ Bot Update Available:*`;
        } else txt4 += `\n\n*🔰 Bot is up to date.*`;
        Phoenix.sendMessage(m.from, { image: pic, caption: txt4 }, { quoted: m });

        break;

      default:
        break;
    }
  },
};
