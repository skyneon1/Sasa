const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');

const token = '7656791016:AAEEM5LMg1OaNMzZd_wlQo5krLeJmaPujUo';
const bot = new TelegramBot(token, {polling: true});
const channelId = '-1002492493854';

let pendingVideoId = {}; // Store the pending video IDs for each user

bot.onText(/\/start (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const uniqueId = match[1];
    pendingVideoId[chatId] = uniqueId; // Store the unique ID for the user
    console.log(`User ${chatId} started with video ID: ${uniqueId}`);
    checkMembership(chatId, isMember => {
        if (isMember) {
            bot.sendMessage(chatId, 'You are a member of the channel. You can now use the "Try Again" button below to play the video.', {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Try Again', callback_data: `start ${uniqueId}` }]]
                }
            });
        } else {
            bot.sendMessage(chatId, 'Please join our channel to access the video.', {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Join Channel', url: `https://t.me/${channelId}` }], [{ text: 'Try Again', callback_data: `start ${uniqueId}` }]]
                }
            });
        }
    });
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Use the link provided in the channel to access specific videos.');
});

bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (data.startsWith('start')) {
        const uniqueId = data.split(' ')[1];
        pendingVideoId[chatId] = uniqueId; // Store the unique ID for the user
        checkMembership(chatId, isMember => {
            if (isMember) {
                const videoFilePath = `C:\\Users\\Ghost\\Desktop\\Xtopia\\videos\\${uniqueId}.txt`;
                console.log(`Retrieving video from path: ${videoFilePath}`);
                if (fs.existsSync(videoFilePath)) {
                    const fileId = fs.readFileSync(videoFilePath, 'utf8');
                    console.log(`File ID retrieved: ${fileId}`);
                    bot.getFile(fileId).then(file => {
                        console.log(`File path: ${file.file_path}`);
                        const fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
                        console.log(`File URL: ${fileUrl}`);
                        const outputFile = fs.createWriteStream('video.mp4');
                        https.get(fileUrl, (response) => {
                            response.pipe(outputFile);
                            outputFile.on('finish', () => {
                                console.log(`Video downloaded to video.mp4`);
                                bot.sendVideo(chatId, 'video.mp4').catch(err => {
                                    console.error('Failed to send video:', err);
                                    bot.sendMessage(chatId, 'Failed to play the video.');
                                });
                            });
                        }).on('error', err => {
                            console.error('Failed to download video:', err);
                            bot.sendMessage(chatId, 'Failed to download video.');
                        });
                    }).catch(err => {
                        console.error('Failed to get file info:', err);
                        bot.sendMessage(chatId, 'Failed to get file info.');
                    });
                } else {
                    console.error('Video file not found:', videoFilePath);
                    bot.sendMessage(chatId, 'Video not found.');
                }
            } else {
                bot.sendMessage(chatId, 'Please join the channel to access the video.', {
                    reply_markup: {
                        inline_keyboard: [[{ text: 'Join Channel', url: `https://t.me/${channelId}` }]]
                    }
                });
            }
        });
    }
});

// Function to ensure a directory exists
function ensureDirectoryExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

// Function to save the video file_id associated with the unique ID
function saveVideoLink(uniqueId, fileId) {
    const filePath = `C:\\Users\\Ghost\\Desktop\\Xtopia\\videos\\${uniqueId}.txt`;
    fs.writeFileSync(filePath, fileId);
    console.log(`Saved file ID to: ${filePath}`);
}

// Function to check if a user is a member of the channel
function checkMembership(chatId, callback) {
    bot.getChatMember(channelId, chatId).then(member => {
        callback(member.status === 'member' || member.status === 'administrator' || member.status === 'creator');
    }).catch(err => {
        console.error('Failed to get chat member:', err);
        callback(false);
    });
}
