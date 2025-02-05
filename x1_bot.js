const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');

const token = '7870983263:AAHnPM_EO-o51Iv6ya66NgRZn7fl9VDGSws';
const bot = new TelegramBot(token, {polling: true});
const channelId = '-1002492493854';
const userBotUsername = 'x2_user_bot'
const userBotLink = `https://t.me/${userBotUsername}?start=`; // Link to the user interaction bot


const defaultThumbnailPath = 'C:\\Users\\Ghost\\Desktop\\Xtopia\\photo.jpg'; // Path to your default thumbnail image
bot.onText(/\/start/, (msg) => { const chatId = msg.chat.id; adminBot.sendMessage(chatId, 'Hello! I am your admin bot. Send me photos or videos to post in the channel.'); });


bot.on('photo', (msg) => {
    const photoId = msg.photo[msg.photo.length - 1].file_id;
    bot.getFileLink(photoId).then(link => {
        console.log('Photo link:', link);
        const file = fs.createWriteStream('photo.jpg');
        https.get(link, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                const uniqueId = generateUniqueId(); 
                bot.sendPhoto(channelId, 'photo.jpg', {
                    caption: `Check out this photo! [Click here to interact with the bot](${userBotLink}${uniqueId})`,
                    parse_mode: 'Markdown'
                }).catch(err => {
                    console.error('Failed to send photo:', err);
                });
            });
        }).on('error', err => {
            console.error('Failed to download photo:', err);
        });
    }).catch(err => {
        console.error('Failed to get photo link:', err);
    });
});

bot.on('video', (msg) => {
    const videoId = msg.video.file_id;
    bot.getFileLink(videoId).then(link => {
        console.log('Video link:', link);
        const uniqueId = generateUniqueId(); // Generate a unique identifier
        ensureDirectoryExists('C:\\Users\\Ghost\\Desktop\\Xtopia\\videos'); // Ensure the directory exists
        saveVideoLink(uniqueId, link); // Save the video link associated with the unique ID
        bot.sendPhoto(channelId, defaultThumbnailPath, {
            caption: `Check out this video! [Click here to interact with the bot](${userBotLink}${uniqueId})`,
            parse_mode: 'Markdown'
        }).catch(err => {
            console.error('Failed to send video thumbnail:', err);
        });
    }).catch(err => {
        console.error('Failed to get video link:', err);
    });
});

// Function to generate a unique identifier
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Function to ensure a directory exists
function ensureDirectoryExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

// Function to save the video link associated with the unique ID
function saveVideoLink(uniqueId, link) {
    const filePath = `C:\\Users\\Ghost\\Desktop\\Xtopia\\videos\\${uniqueId}.txt`;
    fs.writeFileSync(filePath, link);
}
