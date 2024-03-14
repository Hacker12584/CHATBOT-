let url = "https://ai-tools.replit.app";
const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/cache/render3d.png';

module.exports = {
  config: {
    name: "zhi",
  	version: "1.0.0",
  	role: 0,
    author: "Deku",//modified by shann
	  longDescription: "Generate image on Render 3D",
  	Category: "AI",
  	usages: "[prompt]",
  	cooldowns: 5,
  },
  onStart: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    
    if (!args[0]) return r('Missing prompt!');
    
    const a = args.join(" ")
    if (!a) return r('Missing prompt!');
    try {
    const d = (await get(url+'/render?prompt='+a, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  },
};
