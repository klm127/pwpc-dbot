

import dotenv from 'dotenv'
import StartBot from './discord.connect'

dotenv.config()

console.log(process.argv)

StartBot(false)
