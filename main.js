const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.once('ready', () => {
  console.log('Client is ready!');
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();

const app = express();

app.get('/send-message', async (req, res) => {
  const number = '+380731027043';
  const chatId = number.substring(1) + '@c.us';
  const text = req.query.text;
  // const allChats = await client.getChats();

  client.sendMessage(chatId, text);
  // client.sendMessage(allChats[0].id, text);
  res.send('Message sent!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
