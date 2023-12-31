import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN.trim(), {polling: true});
//start with a script "env $(cat .env | xargs) node app.js"

const forecast = {
    getGeo: async function(city) { //Returning latitude and longitude of city
        const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.API_KEY}`);
        const {lat, lon} = await res.data[0];
        return {
            lat: lat,
            lon: lon
        }
    },
    getForecast: async function(lat, lon) { // Returning data of weather forecast
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
        return res.data.list;
    }

}

bot.onText(/\/start/,  msg => { // Creating a keyboard on /start command
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "For which city do you want to see the forecast?", {
        reply_markup: {
            keyboard: [
                ['Forecast in New-York']
            ]
        }
    })
})

bot.on("message", async msg => { // Creating a keyboard to choose an interval of weather forecast
    const chatId = msg.chat.id;
    const geo = await forecast.getGeo("New-York");
    if(msg.text === "Forecast in New-York") {
        bot.sendMessage(chatId, "Choose the interval:", {
            reply_markup: {
                keyboard: [
                    ['at intervals of 3 hours', 'at intervals of 6 hours']
                ]
            }
        })
    }else if (msg.text === "at intervals of 3 hours") {
        bot.sendMessage(chatId, "The interval for a forecast message is 3 hours.")
        const data = await forecast.getForecast(geo.lat, geo.lon);
        for (let i = 0; i < data.length; i++) {
            //Sending a messages of weather forecast with interval of 3 hours
            await bot.sendMessage(chatId, ` 
*Weather forecast on ${data[i].dt_txt}*
Temperature: ${(data[i].main.temp-273.15).toFixed(2)}
Humidity: ${data[i].main.humidity}%
Weather precipitation: ${data[i].weather[0].description}
            `, {
                parse_mode: "Markdown"
            });
        }
    }else if (msg.text === "at intervals of 6 hours") {
        bot.sendMessage(chatId, "The interval for a forecast message is 6 hours.")
        const data = await forecast.getForecast(geo.lat, geo.lon);
        for (let i = 0; i < data.length; i+=2) {
            //Sending a messages of weather forecast with interval of 6 hours
            await bot.sendMessage(chatId, `
*Weather forecast on ${data[i].dt_txt}*
Temperature: ${(data[i].main.temp-273.15).toFixed(2)}
Humidity: ${data[i].main.humidity}%
Weather precipitation: ${data[i].weather[0].description}
            `, {
                parse_mode: "Markdown"
            });
        }
    }
})
