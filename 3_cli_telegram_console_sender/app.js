import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const program = new Command();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
//start with a script "env $(cat .env | xargs) node app.js"

//Adding command for sending a text message
program
.command('send-message <message>')
.description('Send message to Telegram bot')
.alias('m')
.action((msg) => {
    getId().then(id => {
        bot.sendMessage(id, msg);
    })
});

//Adding command for sending a photo
program
.command('send-photo <path>')
.description('Send photo to Telegram bot. Just drag and drop it console after p-flag')
.alias('p')
.action((path) => {
    getId().then(id => {
        bot.sendPhoto(id, path);
    })
});

program.parse(process.argv);

//Returning chat.id to send a message
async function getId() {
    const updates = await bot.getUpdates({ offset: 1 });
    const Id = updates[updates.length - 1].message.chat.id;
    bot.stopPolling();
    return Id;
  };