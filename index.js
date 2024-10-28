import { Telegraf } from "telegraf";
import {start} from "./start";
const { gameOptions, againOptions } = require('./options')

const token = '8051342874:AAFJI6SZT8hqu1hoMChjdg5Sk6ZUDpNKKuQ'

const VERCEL_URL = `${process.env.VERCEL_URL}`
const BOT_TOKEN = process.env.BOT_TOKEN || token

const bot = new Telegraf(BOT_TOKEN)

// bot.start((ctx) => {
//   start(ctx)
// })
const greeting = () => async (ctx) => {
  const messageId = ctx.message?.message_id
  const replyText = `Hello ${ctx.message?.from.first_name}`

  if (messageId) {
    await ctx.reply(replyText, { reply_to_message_id: messageId })
  }
}

bot.on('message', greeting())

export const messageHandler = async (req, res) => {
  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.')
  }

  const getWebhookInfo = await bot.telegram.getWebhookInfo()
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    await bot.telegram.deleteWebhook()
    await bot.telegram.setWebhook(`${VERCEL_URL}/api`)
  }

  if (req.method === 'POST') {
    await bot.handleUpdate(req.body, res)
  } else {
    res.status(200).json('Listening to bot events...')
  }
}
