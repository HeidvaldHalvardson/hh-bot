require('dotenv').config()
const {start} = require("../api/start");
const {Bot} = require("grammy");

const BOT_TOKEN = process.env.BOT_TOKEN || ''

const bot = new Bot(BOT_TOKEN)

const port = 8000;
const app = express();

app.use(express.json());
app.use(`/${BOT_TOKEN}`, webhookCallback(bot, "express"));
app.use((_req, res) => res.status(200).send());

app.listen(port, () => console.log(`listening on port ${port}`));

bot.on('start', () => start(bot))
