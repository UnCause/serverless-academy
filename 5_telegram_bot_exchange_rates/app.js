import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import NodeCache from 'node-cache';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN.trim(), {polling: true});
//start with a script "env $(cat .env | xargs) node app.js"
const myCache = new NodeCache( { stdTTL: 300 } );

bot.onText(/\/start/,  msg => { //Creating a keyboard with currencies
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Choose currency to see the exchange rate.", {
        reply_markup: {
            keyboard: [
                ['USD', 'EUR']
            ]
        }
    })
})

//Sending messages with exchange rates
bot.on("message", async msg => {
    const chatId = msg.chat.id;
    let PrivatRates = await getPrivatRate();
    let MonoRates = await getMonoRate();
    if (msg.text === "USD") {
        await bot.sendMessage(chatId, `
There is exchange rate for USD in Privatbank:
Buy rate: ${PrivatRates[1].buy} UAH
Sale rate: ${PrivatRates[1].sale} UAH
There is exchange rate for USD in Monobank:
Buy rate: ${MonoRates[0].rateBuy} UAH
Sale rate: ${MonoRates[0].rateSell} UAH
        `)
    } else if (msg.text === "EUR") {
        await bot.sendMessage(chatId, `
There is exchange rate for EUR in Privatbank:
Buy rate: ${PrivatRates[0].buy} UAH
Sale rate: ${PrivatRates[0].sale} UAH
There is exchange rate for EUR in Monobank:
Buy rate: ${MonoRates[1].rateBuy} UAH
Sale rate: ${MonoRates[1].rateSell} UAH
        `)
    }
})

//Returning exchange rates data of monobank, caches data if another API request is not allowed
async function getMonoRate() {
    if (myCache.has("USDrate") && myCache.has("EURrate")) {
        const data = [
            myCache.get("USDrate"),
            myCache.get("EURrate")
        ]
        return data;
    } else {
        const res = await axios.get("https://api.monobank.ua/bank/currency");
        const filteredRates = await res.data.filter(element => 
            (element.currencyCodeA === 840 && element.currencyCodeB === 980) 
            || 
            (element.currencyCodeA === 978 && element.currencyCodeB === 980));
        myCache.mset([
            {key: "USDrate", val: filteredRates[0], ttl: 300},
            {key: "EURrate", val: filteredRates[1], ttl: 300}
        ]);
        return await filteredRates;
    }
}

//Returning exchange rates data of privatbank
async function getPrivatRate() {
    const res = await axios.get("https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11");
    return res.data;
}