const { Telegraf } = require("telegraf");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Replace with your bot token from BotFather
const BOT_TOKEN = "7656791016:AAEEM5LMg1OaNMzZd_wlQo5krLeJmaPujUo";

// Initialize the bot
const bot = new Telegraf(BOT_TOKEN);

// Directory to store downloads
const DOWNLOAD_DIR = path.join(__dirname, "downloads");
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

// Command: /start
bot.start((ctx) => {
  ctx.reply("Welcome! Send me a video link, and I'll fetch it for you to play here.");
});

// Handle links sent to the bot
bot.on("text", async (ctx) => {
  const link = ctx.message.text;

  // Validate link (basic check)
  if (!link.startsWith("http")) {
    return ctx.reply("Please send a valid URL.");
  }

  const chatId = ctx.chat.id;
  ctx.reply("Downloading your video, please wait...");

  // Download the video using yt-dlp
  const outputFileName = `${DOWNLOAD_DIR}/video_${Date.now()}.mp4`;
  const command = `yt-dlp -f bestvideo+bestaudio --merge-output-format mp4 -o "${outputFileName}" "${link}"`;

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading video: ${stderr}`);
      return ctx.reply("Failed to download the video. Please try again.");
    }

    console.log(`Downloaded: ${stdout}`);

    // Send the video for inline playback
    try {
      await ctx.replyWithVideo({
        source: outputFileName,
        filename: path.basename(outputFileName),
      });
    } catch (err) {
      console.error("Error sending video:", err);
      ctx.reply("Failed to send the video. It might be too large.");
    } finally {
      // Clean up downloaded video
      fs.unlinkSync(outputFileName);
    }
  });
});

// Start the bot
bot.launch().then(() => {
  console.log("Bot is running...");
});

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
