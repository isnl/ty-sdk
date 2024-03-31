import dotenv from 'dotenv-safe'

import { TongYiAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing the `onProgress` streaming support.
 *
 * ```
 * npx tsx demos/demo-on-progress.ts
 * ```
 */
async function main() {
  const api = new TongYiAPI({ apiKey: process.env.TY_API_KEY })

  const prompt = '将一个比较好笑的冷笑话'

  console.log(prompt)
  const res = await api.sendMessage(prompt, {
    onProgress: (partialResponse) => {
      console.log(partialResponse.delta)
    }
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
