import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

const program = new Command();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});

program
.command('send-message <message>')
.description('Send message to Telegram bot')
.alias('m')
.action((msg) => {
    getId().then(id => {
        bot.sendMessage(id, msg);
    })
});

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


async function getId() {
    const updates = await bot.getUpdates({ offset: 1 });
    const Id = updates[updates.length - 1].message.chat.id;
    bot.stopPolling();
    return Id;
  };