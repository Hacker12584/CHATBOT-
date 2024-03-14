module.exports = {
  config: {
    name: "slot",
    version: "1.0",
    author: "Rishad",
    shortDescription: {
      en: "Game slot",
    },
    longDescription: {
      en: "Game slot.",
    },
    category: "game",
  },
  langs: {
    en: {
      invalid_amount: "Put a big 🌝 number, you can win twice the risk of my son 🌝🙌",
      not_enough_money: "You have this amount, see your balance then 🌝🤣",
      spin_message: "continued Rotation 🌝",
      win_message:"You win %1$💗!",
      lose_message: "You lost %1$🥲.",
      jackpot_message: "This is the amount that Diem won! tripartite %1 $!",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }
