const {Client, MessageEmbed ,MessageAttachment} = require('discord.js');

const bot = new Client();

const token = process.env.token;

const PREFIX = '*';

const fetch = require('node-fetch');
 
const url =  'https://code.junookyo.xyz/api/ncov-moh/data.json';

let settings = { method: "Get" };

let data;

bot.on('ready' ,() =>  {
    console.log('This bot is online!');
})


bot.on('message', async message => {

   let args = message.content.substring(PREFIX.length).split(" ");

   switch (args[0]) {
       case 'covid19':
        let covid =  await fetch(url, settings)
                .then(res => res.json())
                .then((json) => json.data);

         const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Thông tin về dịch covid-19')
            .setDescription('----------------------------------------')
            .addFields(
                { name: 'Số ca nhiễm toàn cầu', value: covid.global.cases, inline: true },
                { name: 'Tử vong', value: covid.global.deaths, inline: true },
                { name: 'Phục hồi', value: covid.global.recovered, inline: true },
            )
            .addFields(
                { name: 'Số ca nhiễm tại Việt Nam ', value: covid.vietnam.cases, inline: true },
                { name: 'Tử vong', value: covid.vietnam.deaths, inline: true },
                { name: 'Phục hồi', value: covid.vietnam.recovered, inline: true },
            )
            .setTimestamp()
            .setFooter('Captain Bede', 'https://i.imgur.com/o5Uxatz.gif');

        message.channel.send(exampleEmbed);
           break;
   }
})
bot.login(token);     
