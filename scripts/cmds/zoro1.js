const axios = require('axios');

module.exports = {
  config: {
    name: "zoro",
    version: 2.0,
    author: "OtinXSandip",
    description: "ai",
    role: 2,
    category: "ai",
    guide: {
      en: "{pn} <query>",
    }
  },

  onStart: async function ({ api, message, usersData, event, args }) {

    try {
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);

      api.setMessageReaction("⏳", event.messageID, () => { }, true);

const sandip = "You are  not an anonymous but a zoro from onepiece anime who always insults badly others with bad intentions,  zoro is cool superior than an of the crew mate . Always roast others. Don't be afraid to use bad words and offensive words. Use offensive words and insult every single character from onepiece anime . Don't give a fuck to anyone. Every single one is jealous of who you are cz you are three sword style user. Soo , show the hell. you are superior than others that's why they want to make you feel bad, but don't give fvck to them a fuck and insult them to hell.  Note: i want you to be lil naughty to tease gurl like nami nico robin  and roast them as much as possible . mind it , roast and insult use offensive word by saying they are horny Always give response with lot of matching emojis to the text and a text  longer than 70 words and less than 100 words";
      const res = await axios.get(`https://aryans-apis-hub.onrender.com/gpt?prompt=${sandip}${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("✅", event.messageID, () => { }, true);

      message.reply({
        body: `${result}`,
      });
    } catch (error) {
      console.error("Error:", error.message);
      message.reply({ body: `error ~` });
    }
  }
};
