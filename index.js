require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  console.log("Notificación recibida:", JSON.stringify(req.body, null, 2));

  try {
    await axios.post(BACKEND_URL, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error reenviando a .NET:", error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado con éxito");
    res.status(200).send(challenge);
  } else {
    console.warn("Intento de verificación fallido");
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
