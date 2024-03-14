const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

async function fetchTikTokVideos(keyword) {
  try {
    const response = await axios.get(`https://tiktok-ivory-nine.vercel.app/kshitiz?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  config: {
    name: "tiktok",
    aliases: [],
    author: "kshitiz",
    version: "1.0",
    shortDescription: {
      en: "Play TikTok video",
    },
    longDescription: {
      en: "Play a TikTok video by providing keyword",
    },
    category: "fun",
    guide: {
      en: "{p}{n} [keyword]",
    },
  },
  onStart: async function ({ api, event, args }) {
    const keyword = args.join(' ');

    if (!keyword) {
      api.sendMessage({ body: 'Please provide a keyword.\nExample: {p}tiktok dance' }, event.threadID);
      return;
    }

    const videos = await fetchTikTokVideos(keyword);

    if (!videos || videos.length === 0) {
      api.sendMessage({ body: `No TikTok videos found for the keyword: ${keyword}.` }, event.threadID, event.messageID);
      return;
    }

    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideo = videos[randomIndex];
    const videoUrl = selectedVideo.videoUrl;

    if (!videoUrl) {
      api.sendMessage({ body: 'Error: Video not found.' }, event.threadID, event.messageID);
      return;
    }

    try {
      const videoStream = await getStreamFromURL(videoUrl);

      await api.sendMessage({
        body: `Here is your TikTok video:`,
        attachment: videoStream,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while processing the video.\nPlease try again later.' }, event.threadID, event.messageID);
    }
  },
};
