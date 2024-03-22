const axios = require('axios');

module.exports = {
  config: {
    name: "baby",

    version: "1.0",
    author: "clyde jvsk",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "AI",
    guide: "{pn} question"
  },

  onStart: async function ({ message, event, args, commandName }) {
    const userID = event.senderID;
    const prompt = args.join(' ');

    try {
      const response = await axios.get("https://milanbhandari.onrender.com/infra", {
        params: {
          prompt: prompt
        }
      });

      if (response.data && response.data.answer) {
        message.reply({ body: `${response.data.answer}` }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function ({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;

    const prompt = args.join(' ');

    try {
      const response = await axios.get("https://milanbhandari.onrender.com/infra", {
        params: {
          prompt: prompt
        }
      });

      if (response.data && response.data.answer) {
        message.reply({ body: `${response.data.answer}` }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
