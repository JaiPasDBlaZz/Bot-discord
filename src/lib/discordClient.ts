import client from "./client";
import launchCrons from "./crons";
import deployCommands from "./deploy-command";
// Require the necessary discord.js classes

const { DISCORD_SECRET_BOT } = require("../../config.json");

const runDiscordBot = async () => {
  // Create a new client instance

  // When the client is ready, run this code (only once)
  client.once("ready", async () => {
    deployCommands();
    await launchCrons();
    console.log("Ready!");
  });

  client.on("interactionCreate", async (interaction: any) => {
    console.log(interaction);
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (commandName === "server") {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
    } else if (commandName === "user") {
      await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
      );
    }
  });

  // Login to Discord with your client's token
  client.login(DISCORD_SECRET_BOT);
};

export default runDiscordBot;
