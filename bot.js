const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

const adminToken = '7870983263:AAHnPM_EO-o51Iv6ya66NgRZn7fl9VDGSws';
const userToken = '7656791016:AAEEM5LMg1OaNMzZd_wlQo5krLeJmaPujUo';

const adminBot = new TelegramBot(adminToken, {polling: true});
const userBot = new TelegramBot(userToken, {polling: true});

const channelId = '-1002492493854';
const userBotUsername = 'x2_user_bot'; // Correct username without '@'
const userBotLink = `https://t.me/${userBotUsername}?start=`; // Link to the user interaction bot

const defaultThumbnailPath = 'C:\\Users\\Ghost\\Desktop\\Xtopia\\photo.jpg'; // Path to your default thumbnail image

let pendingVideoId = {}; // Store the pending video IDs for each user

// ADMIN BOT LOGIC
adminBot.on('photo', (msg) => {
    const photoId = msg.photo[msg.photo.length - 1].file_id;
    adminBot.getFileLink(photoId).then(link => {
        console.log('Photo link:', link);
        const file = fs.createWriteStream('photo.jpg');
        https.get(link, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                const uniqueId = generateUniqueId(); // Generate a unique identifier
                adminBot.sendPhoto(channelId, 'photo.jpg', {
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

adminBot.on('video', (msg) => {
    const videoId = msg.video.file_id;
    adminBot.getFileLink(videoId).then(link => {
        console.log('Video link:', link);
        const uniqueId = generateUniqueId(); // Generate a unique identifier
        ensureDirectoryExists('C:\\Users\\Ghost\\Desktop\\Xtopia\\videos'); // Ensure the directory exists
        saveVideoLink(uniqueId, link); // Save the video link associated with the unique ID
        adminBot.sendPhoto(channelId, defaultThumbnailPath, {
            caption: `Check out this video! [Click here to interact with the bot](${userBotLink}${uniqueId})`,
            parse_mode: 'Markdown'
        }).catch(err => {
            console.error('Failed to send video thumbnail:', err);
        });
    }).catch(err => {
        console.error('Failed to get video link:', err);
    });
});

// USER BOT LOGIC
userBot.onText(/\/start (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const uniqueId = match[1];
    pendingVideoId[chatId] = uniqueId; // Store the unique ID for the user
    checkMembership(chatId, isMember => {
        if (isMember) {
            userBot.sendMessage(chatId, 'You are a member of the channel. You can now use the "Show Video" button below to play the video.', {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Show Video', callback_data: 'show_video' }]]
                }
            });
        } else {
            userBot.sendMessage(chatId, 'Please join our channel to access the video.', {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Join Channel', url: `https://t.me/${channelId}` }], [{ text: 'Show Video', callback_data: 'show_video' }]]
                }
            });
        }
    });
});

userBot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (data === 'show_video') {
        checkMembership(chatId, isMember => {
            if (isMember) {
                const uniqueId = pendingVideoId[chatId];
                const videoFilePath = `C:\\Users\\Ghost\\Desktop\\Xtopia\\videos\\${uniqueId}.txt`;
                console.log('Video file path:', videoFilePath);
                if (fs.existsSync(videoFilePath)) {
                    const videoLink = fs.readFileSync(videoFilePath, 'utf8');
                    console.log('Video link:', videoLink);
                    userBot.getFileLink(videoLink).then(link => {
                        const file = fs.createWriteStream('video.mp4');
                        https.get(link, (response) => {
                            response.pipe(file);
                            file.on('finish', () => {
                                userBot.sendVideo(chatId, 'video.mp4').then(() => {
                                    // Set a timer to delete the video after 20 minutes
                                    setTimeout(() => {
                                        userBot.deleteMessage(chatId, callbackQuery.message.message_id).catch(err => console.error('Failed to delete message:', err));
                                    }, 20 * 60 * 1000); // 20 minutes in milliseconds
                                }).catch(err => {
                                    console.error('Failed to send video:', err);
                                    userBot.sendMessage(chatId, 'Failed to play the video.');
                                });
                            });
                        }).on('error', err => {
                            console.error('Failed to download video:', err);
                            userBot.sendMessage(chatId, 'Failed to download video.');
                        });
                    }).catch(err => {
                        console.error('Failed to get video link:', err);
                        userBot.sendMessage(chatId, 'Failed to get video link.');
                    });
                } else {
                    userBot.sendMessage(chatId, 'Video not found.');
                }
            } else {
                userBot.sendMessage(chatId, 'Please join the channel to access the video.', {
                    reply_markup: {
                        inline_keyboard: [[{ text: 'Join Channel', url: `https://t.me/${channelId}` }]]
                    }
                });
            }
        });
    }
});

// Common Functions
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

function ensureDirectoryExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
}

function saveVideoLink(uniqueId, link) {
    const filePath = `C:\\Users\\Ghost\\Desktop\\Xtopia\\videos\\${uniqueId}.txt`;
    fs.writeFileSync(filePath, link);
}

function checkMembership(chatId, callback) {
    userBot.getChatMember(channelId, chatId).then(member => {
        callback(member.status === 'member' || member.status === 'administrator' || member.status === 'creator');
    }).catch(err => {
        console.error('Failed to get chat member:', err);
        callback(false);
    });
}
