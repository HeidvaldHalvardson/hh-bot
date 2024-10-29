import { Bot } from "grammy";

const VERCEL_URL = `${process.env.VERCEL_URL}`
const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

export const startVercel = async () => {
  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.')
  }

  bot.command(
    "start",
    (ctx) => ctx.reply("I'm running on Fly using long polling!"),
  );

  process.once("SIGINT", () => bot.stop());
  process.once("SIGTERM", () => bot.stop());

  await bot.start();
}