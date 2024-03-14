const { get } = require('axios');
const fs = require('fs');
const path = require('path');

let url = "https://ai-tools.replit.app";
let f = path.join(__dirname, 'cache', 'sdxl.png');

module.exports = {
  config: {
    name: "pixart",
    aliases: ["sdx"],
    version: "1.0",
    author: "Strawhat Luffy || DEKU",
    countDown: 5,
    role: 0,
    shortDescription: "Gen Image",
    longDescription: "Generate image in sdxl",
    category: "",
    guide: "{p}[prompt | style]",
  },

  onStart: async function ({ api, event, args }) {
    function r(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    let g = `•——[Style list]——•\n\n1. Cinematic\n2. Photographic\n3. Anime\n4. Manga\n5. Digital Art\n6. Pixel art\n7. Fantasy art\n8. Neonpunk\n9. 3D Model`;

    if (!args[0]) return r('Missing prompt and style\n\n' + g);

    const [b, c] = args.join(" ").split("|").map(item => item.trim());

    if (!b) return r('Missing prompt!');
    if (!c) return r('Missing style!\n\n' + g);

    try {
      const d = (await get(`${url}/sdxl?prompt=${b}&styles=${c}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(f, Buffer.from(d, "utf8"));
      return r({ attachment: fs.createReadStream(f, () => fs.unlinkSync(f)) });
    } catch (e) {
      return r(e.message);
    }
  }
};
