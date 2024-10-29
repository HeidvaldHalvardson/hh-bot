import {GrammyError, HttpError, InlineKeyboard} from "grammy";
import {hydrate} from "@grammyjs/hydrate";

export const start = (bot) => {
  bot.use(hydrate())

  bot.api.setMyCommands([
    {command: '/start', description: 'Запуск бота'},
    {command: '/menu', description: 'Меню'},
  ])

  bot.command('start', async (ctx) => {
    await ctx.reply('Привет! Я Бот.')
  })

  const menuBoard = new InlineKeyboard()
    .text('Узнать статус заказа', 'order-status')
    .text('Поддержка', 'support')

  const backKeyboard = new InlineKeyboard()
    .text('< Назад в меню', 'back')

  bot.command('menu', async (ctx) => {
    await ctx.reply('Выберите пункт меню', {
      reply_markup: menuBoard
    })
  })

  bot.callbackQuery('order-status', async (ctx) => {
    await ctx.callbackQuery.message.editText('Статус заказа: в пути', {
      reply_markup: backKeyboard
    })
    await ctx.answerCallbackQuery()
  })

  bot.callbackQuery('support', async (ctx) => {
    await ctx.callbackQuery.message.editText('Напишите ваш запрос', {
      reply_markup: backKeyboard
    })
    await ctx.answerCallbackQuery()
  })

  bot.callbackQuery('back', async (ctx) => {
    await ctx.callbackQuery.message.editText('Выберите пункт меню', {
      reply_markup: menuBoard
    })
    await ctx.answerCallbackQuery()
  })

  bot.catch((err) => {
    const ctx = err.ctx
    console.log(`Error while handling update ${ctx.update.update_id}`)
    const e = err.error

    if (e instanceof GrammyError) {
      console.error('Error in request:', e.description)
    } else if (e instanceof HttpError) {
      console.error('Could not contact Telegram', e)
    } else {
      console.error('Unknown error:', e)
    }
  })

}