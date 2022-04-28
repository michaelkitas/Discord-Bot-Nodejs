const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  let prefix = "!";
  let message = msg.content;

  let channel = msg.channelId;
  let botChannel = "968539510923210795";

  const sendMessage = (message) => {
    client.channels.cache.get(botChannel).send(message);
  };

  console.log(msg);

  if (channel === botChannel) {
    if (message.startsWith(prefix)) {
      const command = message.slice(prefix.length).split(" ")[0];

      let admins = ["Michael Kitas#4423"];

      // let isAdmin = `${msg.author.username}#${msg.author.discriminator}` in admins;
      let isAdmin = msg.member.roles.cache.find(role => role.name === "Admin");
      
      switch (command) {
        case "stats":
          isAdmin
            ? sendMessage(`This server has ${msg.guild.memberCount} members`)
            : sendMessage("You are not an admin");
          break;

        case "help":
          sendMessage("This is a help command");
          break;
      }
    }
  } else {
    msg.channel.send("This is not a bot channel");
  }

  // if (msg.content === "Hello") {
  //   sendMessage("Hello!");
  // }
});

client.login("YOUR_BOT_TOKEN");
