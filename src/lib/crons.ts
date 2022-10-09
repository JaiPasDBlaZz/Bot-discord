import { Channel, EmbedBuilder, WebhookClient } from "discord.js";
import cron from "node-cron";

import client from "./client";

const launchCrons = async () => {
  const webhookTestURL = `https://discord.com/api/webhooks/1027924821650194503/NaHtHaewGbE6CPxMmjKy3IJ7fuQu3m0f2ep2SKgbslBo37aYI4ZkCJCNzQaVMWkZgSHu`;
  const webhookClient = new WebhookClient({ url: webhookTestURL });
  const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle("⏰ Daily Point ! Click me ⏰")
    .setColor(0x00ffff)
    .setDescription(
      "PWOUETTTT PWOUETTTT PWOUETTTT ! C'est l'heure du daily point mes p'tits potes !"
    )
    .setImage("https://media.giphy.com/media/65ANowzpMvndyT1y3J/giphy.gif")
    .setURL("https://tzar.clavus.cloud/meet/daily-point");
  const webhook = await client.fetchWebhook(
    "1027924821650194503",
    "NaHtHaewGbE6CPxMmjKy3IJ7fuQu3m0f2ep2SKgbslBo37aYI4ZkCJCNzQaVMWkZgSHu"
  );
  cron.schedule("0 45 17 * * Monday-Friday", async () => {
    const channel: Channel | undefined = client.channels.cache.find(
      (chan: Channel) => {
        // @ts-ignore
        return chan.name === "testtoad";
      }
    );

    try {
      if (!webhook) {
        return console.log("No webhook was found that I can use!");
      }
      await webhook.send({
        content:
          "@here, si le lien ne marche pas ... direction ici --> https://meet.clavus.io/daily-point",
        username: "Un Mec Bizarre !",
        avatarURL: "https://avatars.githubusercontent.com/u/23262432?v=4",
        embeds: [embed],
      });
    } catch (error) {
      console.error("Error trying to send a message: ", error);
    }
  });
};

export default launchCrons;
