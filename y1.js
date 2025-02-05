const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const path = require('path');

const token = '7870983263:AAHnPM_EO-o51Iv6ya66NgRZn7fl9VDGSws'; // Replace with your user bot token
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
        // Send the video file to the user if it exists
        bot.sendVideo(chatId, videoPath)
            .then(() => {
                console.log(`Video with ID ${uniqueId} successfully played for user ${chatId}.`);
            })
            .catch((error) => {
                console.error('Failed to play the video:', error);
                bot.sendMessage(chatId, 'Failed to play the video. Please try again later.');
            });
    } else {
        const videoUrl = `https://example.com/videos/${uniqueId}.mp4`; // Replace with the actual video URL
        const fileStream = fs.createWriteStream(videoPath);

        // Download the video from the URL
        https.get(videoUrl, (response) => {
            if (response.statusCode === 200) {
                // Pipe the response to the file stream
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    console.log(`Video with ID ${uniqueId} downloaded successfully.`);
                    // Now send the video to the user
                    bot.sendVideo(chatId, videoPath)
                        .then(() => {
                            console.log(`Video with ID ${uniqueId} played for user ${chatId}.`);
                        })
                        .catch((error) => {
                            console.error('Failed to send the video:', error);
                            bot.sendMessage(chatId, 'Failed to send the video. Please try again later.');
                        });
                });
            } else {
                console.error('Error downloading video. Status Code:', response.statusCode);
                bot.sendMessage(chatId, 'Error downloading the video. Please try again later.');
            }
        }).on('error', (error) => {
            console.error('Error downloading the video:', error);
            bot.sendMessage(chatId, 'Error downloading the video. Please try again later.');
        });
    }
});

// Handle other messages (optional, for debugging or general responses)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Please click a valid video link to start.');
});
