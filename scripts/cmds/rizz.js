const axios = require('axios');

module.exports = {
  config: {
    name: 'rizz',
    version: '1.7',
    author: 'Shikaki',
    countDown: 8,
    role: 0,
    category: 'fun',
    shortDescription: {
      en: 'Tells a random rizz.'
    },
    longDescription: {
      en: 'Tells a random pickup line fetched from a pickup line API.'
    },
category: "😄 Fun",
    guide: {
      en: '{pn}'
    }
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://vinuxd.vercel.app/api/pickup');

      if (response.status !== 200 || !response.data || !response.data.pickup) {
        throw new Error('Invalid or missing response from pickup line API');
      }

      const pickupline = response.data.pickup;

      // Decorative border and emojis
      const message = `


${pickupline}


      `;

      // Send the pickup line with borders and emojis
      api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(`Failed to send pickup line: ${error.message}`);
      api.sendMessage('Sorry, something went wrong while trying to tell a pickup line. Please try again later.', event.threadID);
    }
  }
};
