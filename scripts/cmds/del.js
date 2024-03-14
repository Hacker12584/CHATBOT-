module.exports = {
  config: {
    name: "delete",
    aliases: ['del','d'],
    author: "S",
role: 2,
    category: "system"
  },

  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const path = require('path');

    const fileName = args[0];

    if (!fileName) {
      api.sendMessage("Please provide a file name to delete.", event.threadID);
      return;
    }

    const filePath = path.join(__dirname, fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        api.sendMessage(`❎ | Failed to delete ${fileName}.`, event.threadID);
        return;
      }
      api.sendMessage(`✅ ( ${fileName} ) 𝗗𝗘𝗟𝗘𝗧𝗘𝗗 𝚂𝚞𝚌𝚌𝚎𝚜𝚜`, event.threadID);
    });
  }
};
