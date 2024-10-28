const {gameOptions, againOptions} = require("./options");
const chats = {}

const startGame = async (bot, chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!')
  const rndNum = Math.floor(Math.random() * 10);
  chats[chatId] = rndNum
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

export const start = (bot) => {
  bot.setMyCommands([
    {command: '/start', description: 'Приветствие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Игра: угадай цифру'}
  ])

  bot.on('message', async message => {
    const text = message.text;
    const chatId = message.chat.id;

    if (text === '/start') {
      if (message.from.username === 'yana_avtkhva') {
        await bot.sendAnimation(chatId, 'CgACAgQAAxkBAAMkZx95BeecrK3NWua1zRVjq5mCcxMAAhEDAALxfQRTKsNFLE2pbyg2BA')
        return bot.sendMessage(chatId, `Мы ждём тебя дома ${message.chat.first_name}`);
      } else {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/2.webp')
        return bot.sendMessage(chatId, `Добро пожаловать в телеграмм бот разработчика Heidvald Halvardson`);
      }
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${message.chat.first_name} ${message.chat.last_name}`);
    }

    if (text === '/game') {
      return  startGame(chatId)
    }

    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!)')
  })

  bot.on('callback_query', async message => {
    const data = message.data;
    const chatId = message.message.chat.id;

    if (data === '/again') {
      return  startGame(chatId)
    }

    if (+data === chats[chatId]) {
      return await bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats[chatId]}`, againOptions)
    } else {
      return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал ${chats[chatId]}`, againOptions)
    }
  })
}
