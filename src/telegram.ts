import TelegramBot from 'node-telegram-bot-api'

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN)

export class Telegram {
  async sendMsg(content: string) {
    await bot.sendMessage(process.env.TELEGRAM_BOT_CHAT_ID, this.escape.markdownV2(content), { parse_mode: 'MarkdownV2' })
  }

  escape = {
    markdownV2: (msg: string) =>
      msg
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/~/g, '\\~')
        // .replace(/`/g, "\\`")
        .replace(/>/g, '\\>')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!'),
  }
}

export default new Telegram()
