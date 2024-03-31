import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { TongYiAPI } from '../src'

dotenv.config()

/**
 * 基础功能演示
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const api = new TongYiAPI({
    apiKey: process.env.TY_API_KEY,
    debug: false
  })

  const prompt = '讲一个冷笑话'

  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
