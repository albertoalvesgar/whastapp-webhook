require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const VERIFY_TOKEN = "Z71llJvFzhUaVxAiuwBTURVBtgZfAB6YGVjQSGFW";

app.post('/webhook', (req, res) => {
  console.log('Notificación recibida:', req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado con éxito');
    res.status(200).send(challenge);
  } else {
    console.warn('Intento de verificación fallido');
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
