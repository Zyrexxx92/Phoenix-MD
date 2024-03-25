const { getRandom } = require("../System/Function");
const { webp2mp4File } = require("../System/Uploader");
const { toAudio } = require("../System/File-Converter");
const { exec } = require("child_process");
const fs = require("fs");
const PDFDocument = require("pdfkit");
let { GraphOrg } = require("../System/Uploader");
const { getBuffer } = require("../System/Function2.js");

const util = require("util");
let mergedCommands = [
  "toimg",
  "toimage",
  "togif",
  "tomp4",
  "tomp3",
  "toaudio",
  "tourl",
  "topdf",
  "imgtopdf",
  "toqr",
];

module.exports = {
  name: "converters",
  alias: [...mergedCommands],
  uniquecommands: [
    "toimg",
    "togif",
    "tomp4",
    "tomp3",
    "toaudio",
    "tourl",
    "topdf",
    "imgtopdf",
    "toqr",
  ],
  description: "All converter related commands",
  start: async (
    Phoenix,
    m,
    { inputCMD, text, quoted, doReact, prefix, mime }
  ) => {
    switch (inputCMD) {
      case "toimg":
      case "toimage":
        if (!m.quoted && !/webp/.test(mime)) {
          await doReact("❔");
          return m.reply(
            `Please reply to a *Non-animated* sticker to convert it to image`
          );
        }
        await doReact("🎴");
        let mediaMess = await Phoenix.downloadAndSaveMediaMessage(quoted);
        let ran = await getRandom(".png");
        exec(`ffmpeg -i ${mediaMess} ${ran}`, (err) => {
          fs.unlinkSync(mediaMess);
          if (err) {
            Phoenix.sendMessage(
              m.from,
              {
                text: `Please mention a *Non-animated* sticker to process ! \n\nOr use *${prefix}togif* / *${prefix}tomp4*  to process *Animated* sticker !`,
              },
              { quoted: m }
            );
            return;
          }
          let buffer = fs.readFileSync(ran);
          Phoenix.sendMessage(
            m.from,
            { image: buffer, caption: `_Converted by:_  *${botName}*\n` },
            { quoted: m }
          );
          fs.unlinkSync(ran);
        });
        break;

      case "tomp4":
        if (!m.quoted && !/webp/.test(mime)) {
          await doReact("❔");
          return reply(
            `Bitte reagiere auf den Befehl mit einem Sticker!`
          );
        }
        await doReact("🎴");
        let mediaMess2 = await Phoenix.downloadAndSaveMediaMessage(quoted);
        let webpToMp4 = await webp2mp4File(mediaMess2);

        await Phoenix.sendMessage(
          m.from,
          {
            video: { url: webpToMp4.result },
            caption: `_Converted by:_  *${botName}*\n`,
          },
          { quoted: m }
        );
        fs.unlinkSync(mediaMess2);
        break;

      case "togif":
        if (!m.quoted && !/webp/.test(mime)) {
          await doReact("❔");
          return m.reply(
            `Bitte reagiere auf den Befehl mit einem Sticker!`
          );
        }
        await doReact("🎴");
        let mediaMess3 = await Phoenix.downloadAndSaveMediaMessage(quoted);
        let webpToMp42 = await webp2mp4File(mediaMess3);

        await Phoenix.sendMessage(
          m.from,
          {
            video: { url: webpToMp42.result },
            caption: `_Converted by:_  *${botName}*\n`,
            gifPlayback: true,
          },
          { quoted: m }
        );
        fs.unlinkSync(mediaMess3);

        break;

      case "tomp3":
        if (/document/.test(mime)) {
          await doReact("❌");
          return m.reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!/video/.test(mime) && !/audio/.test(mime)) {
          await doReact("❌");
          return reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!m.quoted) {
          await doReact("❔");
          return m.reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix}tomp3`
          );
        }
        await doReact("🎶");
        let media = await quoted.download();
        await Phoenix.sendPresenceUpdate("recording", m.from);
        let audio = await toAudio(media, "mp4");
        Phoenix.sendMessage(
          m.from,
          {
            document: audio,
            mimetype: "audio/mpeg",
            fileName: `Converted By ${botName} ${m.id}.mp3`,
          },
          { quoted: m }
        );

        break;

      case "toaudio":
        if (/document/.test(mime)) {
          await doReact("❌");
          return m.reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!/video/.test(mime) && !/audio/.test(mime)) {
          await doReact("❌");
          return m.reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption *${prefix}tomp3*`
          );
        }
        if (!m.quoted) {
          await doReact("❔");
          return m.reply(
            `Send/Reply Video/Audio You Want To Convert Into MP3 With Caption ${prefix}tomp3`
          );
        }
        await doReact("🎶");
        let media2 = await quoted.download();
        await Phoenix.sendPresenceUpdate("recording", m.from);
        let audio2 = await toAudio(media2, "mp4");
        Phoenix.sendMessage(
          m.from,
          { audio: audio2, mimetype: "audio/mpeg" },
          { quoted: m }
        );
        break;

      case "tourl":
        if (!m.quoted) {
          await doReact("❔");
          return m.reply(
            `Plese provide an *Image* / *Video* to generate a link! With Caption ${prefix}tourl`
          );
        }
        let media5 = await Phoenix.downloadAndSaveMediaMessage(quoted);
        if (/image/.test(mime)) {
          await doReact("🔗");
          let anu = await GraphOrg(media5);
          m.reply(`*Generated Image URL:* \n\n${util.format(anu)}\n`);
        } else if (/video/.test(mime)) {
          await doReact("▶️");
          try {
            let anu = await GraphOrg(media5);
            m.reply(`*Generated Video URL:* \n\n${util.format(anu)}\n`);
          } catch (e) {
            await doReact("❌");
            await fs.unlinkSync(media5);
            return Phoenix.sendMessage(
              m.from,
              {
                text: `*Error!*\n\n*Maximale Größe:* 5MB`,
              },
              { quoted: m }
            );
          }
        } else {
          await doReact("❌");
          return m.reply(
            `Plese provide an *Image* / *Video* to generate a link!`
          );
        }
        await fs.unlinkSync(media5);
        break;

      case "topdf":
      case "imgtopdf":
        if (/image/.test(mime)) {
          await doReact("📑");
          let mediaMess4 = await Phoenix.downloadAndSaveMediaMessage(quoted);

          async function generatePDF(path) {
            return new Promise((resolve, reject) => {
              const doc = new PDFDocument();

              const imageFilePath = mediaMess4.replace(/\\/g, "/");
              doc.image(imageFilePath, 0, 0, {
                width: 612, // It will make your image to horizontally fill the page - Change it as per your requirement
                align: "center",
                valign: "center",
              });

              doc.pipe(fs.createWriteStream(path));

              doc.on("end", () => {
                resolve(path);
              });

              doc.end();
            });
          }

          try {
            let randomFileName = `./${Math.floor(
              Math.random() * 1000000000
            )}.pdf`;
            const pdfPATH = randomFileName;
            await generatePDF(pdfPATH);
            pdf = fs.readFileSync(pdfPATH);

            setTimeout(async () => {
              let pdf = fs.readFileSync(pdfPATH);

              Phoenix.sendMessage(
                m.from,
                {
                  document: pdf,
                  fileName: `Converted By ${botName}.pdf`,
                },
                { quoted: m }
              );

              fs.unlinkSync(mediaMess4);
              fs.unlinkSync(pdfPATH);
            }, 1000);
          } catch (error) {
            await doReact("❌");
            console.error(error);
            return m.reply(
              `Error.`
            );
          }
        } else {
          await doReact("❔");
          return m.reply(`Bitte reagiere auf ein *Bild*, um es in eine PDF Datei zu konvertieren!`);
        }
        break;
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
        await Phoenix.sendMessage(
          m.from,
          { image: res, caption: `\n*Source:* ${text}` },
          { quoted: m }
        );
        break;

      default:
        break;
    }
  },
};
