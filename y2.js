const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = '7656791016:AAEEM5LMg1OaNMzZd_wlQo5krLeJmaPujUo'; // Replace with your user bot token
const bot = new TelegramBot(token, { polling: true });

const videosDirectory = path.join(__dirname, 'videos'); // Directory to store video files

// Ensure the videos directory exists
if (!fs.existsSync(videosDirectory)) {
    fs.mkdirSync(videosDirectory);
}

// Handle incoming /start command with a unique ID
bot.onText(/\/start (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const uniqueId = match[1]; // Extract the unique ID from the command
    const videoPath = path.join(videosDirectory, `${uniqueId}.mp4`);

    if (fs.existsSync(videoPath)) {
        // Send the video file to the user
        bot.sendVideo(chatId, videoPath)
            .then(() => {
                console.log(`Video with ID ${uniqueId} successfully played for user ${chatId}.`);
            })
            .catch((error) => {
                console.error('Failed to play the video:', error);
                bot.sendMessage(chatId, 'Failed to play the video. Please try again later.');
            });
    } else {
        // Notify the user if the video is not found
        bot.sendMessage(chatId, 'Video not found. Please check the link or contact support.');
    }
});

// Handle other messages (optional, for debugging or general responses)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Please click a valid video link to start.');
});
