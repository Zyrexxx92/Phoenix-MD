require("dotenv").config();

let gg = process.env.MODS;
if (!gg) {
  gg = "49491741711168", "4365022989060";   // You can replace this number with yours //
}


global.owner = gg.split(",");
global.mongodb = process.env.MONGODB || "mongodb+srv://baron:xjFQyvqxnup6vKfQ@lionbot.ymq2zpo.mongodb.net/?retryWrites=true&w=majority&appName=LionBot";
global.sessionId = process.env.SESSION_ID || "22_3_2c9e_cddd_fded";
global.prefa = process.env.PREFIX || "/";
global.tenorApiKey = process.env.TENOR_API_KEY || "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c";
global.packname = process.env.PACKNAME || `Phoenix Bot`;
global.author = process.env.AUTHOR || "by: Team Phoenix";
global.port = process.env.PORT || "10000";
global.openAiAPI = process.env.OPENAI_API || "Put your openai API key here";
global.owner = gg.split(",");

module.exports = {
  mongodb: global.mongodb,
};
