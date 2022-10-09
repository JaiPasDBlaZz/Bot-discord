import express from "express";
import http from "http";
import runDiscordBot from "./lib/discordClient";

async function startServer() {
  const app: express.Application = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.get("/connect-bot", async (request, response) => {
    const accessToken = request.get("access_token");

    if (!accessToken) {
      return response.redirect(
        "https://discord.com/api/oauth2/authorize?client_id=1027931171562197053&permissions=2080&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Foauth&response_type=code&scope=bot%20webhook.incoming%20applications.commands"
      );
    }
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);
}

startServer();
runDiscordBot();
