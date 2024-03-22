const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "clean",
    aliases: ["c"],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "Helps to clean cache and tmp folder"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
    const cacheFolderPath = path.join(__dirname, 'cache');
    const tmpFolderPath = path.join(__dirname, 'tmp');

    try {
      api.sendMessage({ body: 'Cleaning cache and tmp folders...', attachment: null }, event.threadID);

      const cleanFolder = (folderPath) => {
        try {
          if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);

            if (files.length > 0) {
              files.forEach(file => {
                const filePath = path.join(folderPath, file);

                fs.unlinkSync(filePath);
                console.log(`File ${file} deleted successfully from ${folderPath} at ${new Date().toLocaleString()}!`);
              });

              console.log(`All files in the ${folderPath} folder deleted successfully at ${new Date().toLocaleString()}!`);
            } else {
              console.log(`${folderPath} folder is empty at ${new Date().toLocaleString()}.`);
            }
          } else {
            console.log(`${folderPath} folder not found at ${new Date().toLocaleString()}.`);
          }
        } catch (error) {
          console.error(`Error cleaning ${folderPath}: ${error}`);
        }
      };

      cleanFolder(cacheFolderPath);
      cleanFolder(tmpFolderPath);

      api.sendMessage({ body: 'Cache and tmp folders cleaned successfully!' }, event.threadID);
    } catch (error) {
      console.error(`Error in cleaning process: ${error}`);
      api.sendMessage({ body: 'An error occurred while cleaning folders.' }, event.threadID);
    }
  },
};
