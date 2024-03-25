const axios = require("axios");
const { getBuffer } = require("../System/Function2.js");
let mergedCommands = ["toqr"];

module.exports = {
  name: "otherscommands",
  alias: [...mergedCommands],
  uniquecommands: ["toqr"],
  description: "Other commands",
  start: async (
    Phoenix,
    m,
    { pushName, prefix, inputCMD, doReact, text, args, participants, isCreator }
  ) => {
    switch (inputCMD) {
      case "toqr":
        if (!text) {
          await doReact("❔");
          return m.reply(
            `Bitte gebe einen Link ein!\n\nBeispiel: *${prefix}toqr https://baron.x10.bz*`
          );
        }

        const res = await getBuffer(
          `https://www.qrtag.net/api/qr_8.png?url=${text}`
        );
        return Phoenix.sendMessage(
          m.from,
          { image: res, caption: `\n*Source:* ${text}` },
          { quoted: m }
        );

      default:
        break;
    }
  },
};
