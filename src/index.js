import { Telegraf } from "telegraf";

// const options = {
//   gameOptions: {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [
//         [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
//         [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
//         [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
//         [{text: '0', callback_data: '0'}],
//       ]
//     })
//   },
//
//   againOptions: {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [
//         [{text: 'Играть еще раз?', callback_data: '/again'}],
//       ]
//     })
//   }
// }

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
