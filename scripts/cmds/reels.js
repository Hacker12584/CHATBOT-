const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function downloadVideo(url, destination) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(destination, Buffer.from(response.data, 'binary'));
}

module.exports = {
  config: {
    name: "reels",
    aliases: ['reel','Reel'],
    author: "kshitiz",
    version: "1.1",
    shortDescription: {
      en: "View Instagram reels by hashtag",
    },
    longDescription: {
      en: "View a random Instagram reel by providing a hashtag",
    },
    category: "FUN",
    guide: {
      en: "{p}reels [hashtag]",
    },
  },
  onStart: async function ({ api, event, args }) {
    const hashtag = args[0];

    if (!hashtag) {
      api.sendMessage({ body: 'Please provide a hashtag.\nExample: {p}reels zoro' }, event.threadID, event.messageID);
      return;
    }

    try {
      const response = await axios.get(`https://reels-0er8.onrender.com/reels?hashtag=${hashtag}`);
      const videoURLs = response.data.videoURLs;

      if (!videoURLs || videoURLs.length === 0) {
        api.sendMessage({ body: `No reels found for the hashtag ${hashtag}.` }, event.threadID, event.messageID);
        return;
      }

      const randomIndex = Math.floor(Math.random() * videoURLs.length); // Generate a random index
      const selectedVideoURL = videoURLs[randomIndex]; // Select a random video URL

      const tempVideoPath = path.join(os.tmpdir(), 'reels_video.mp4');
      await downloadVideo(selectedVideoURL, tempVideoPath);

      await api.sendMessage({
        body: `Here is a random Instagram reel:`,
        attachment: fs.createReadStream(tempVideoPath),
      }, event.threadID, event.messageID);

      fs.unlinkSync(tempVideoPath);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while fetching or processing the reel.\nPlease try again later.' }, event.threadID, event.messageID);
    }
  },
};
