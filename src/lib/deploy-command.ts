const { REST, SlashCommandBuilder, Routes } = require("discord.js");
const {
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
  DISCORD_SECRET_BOT,
} = require("../../config.json");

const deployCommande = () => {
  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with pong!"),
    new SlashCommandBuilder()
      .setName("server")
      .setDescription("Replies with server info!"),
    new SlashCommandBuilder()
      .setName("user")
      .setDescription("Replies with user info!"),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "10" }).setToken(DISCORD_SECRET_BOT);

  rest
    .put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
      body: commands,
    })
    .then((data: any) =>
      console.log(
        `Successfully registered ${data.length} application commands.`
      )
    )
    .catch(console.error);
};

export default deployCommande;
