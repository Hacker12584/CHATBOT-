const axios = require("axios");

module.exports = {
  config: {
    name: "roast",
    aliases: ["insult"], // Added "insult" as an alias
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Roast someone by using this cmd",
    category: "𝗙𝗨𝗡",
    guide: "{pn} @mention",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const mentions = event.mentions;

      if (Object.keys(mentions).length !== 1) {
        api.sendMessage("Please mention one person to roast.", event.threadID);
        return;
      }

      const mentionName = mentions[Object.keys(mentions)[0]].replace("@", "");

      if (mentionName.toLowerCase() === "kshitiz") {
        api.sendMessage("Ayo Gay You can't roast my owner🤬 ", event.threadID);
        return;
      }

      if (mentionName.toLowerCase() === "clyde jv'sk") {
        api.sendMessage("You can't roast Clyde Jv'sk! He's untouchable! 😎", event.threadID);
        return;
      }

      const url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";

      const response = await axios.get(url);
      const insult = response.data.insult;

      const roastMessage = `${mentionName}, ${insult}`;
      api.sendMessage(roastMessage, event.threadID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Error!", event.threadID);
    }
  },
};
