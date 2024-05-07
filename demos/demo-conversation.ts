import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { TongYiAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx demos/demo-conversation.ts
 * ```
 */
async function main() {
  const api = new TongYiAPI({
    apiKey: process.env.TY_API_KEY,
    model: 'qwen1.5-32b-chat',
    debug: false
  })

  const prompt = '写一首关于猫的诗'

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  console.log('\n' + res.text + '\n')

  const prompt2 = '你能把它写得更可爱、更短吗？'

  res = await oraPromise(
    api.sendMessage(prompt2, {
      parentMessageId: res.id
    }),
    {
      text: prompt2
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt3 = '现在用英语写'

  res = await oraPromise(
    api.sendMessage(prompt3, {
      parentMessageId: res.id
    }),
    {
      text: prompt3
    }
  )
  console.log('\n' + res.text + '\n')

  const prompt4 = '我们现在在讨论什么？'

  res = await oraPromise(
    api.sendMessage(prompt4, {
      parentMessageId: res.id
    }),
    {
      text: prompt4
    }
  )
  console.log('\n' + res.text + '\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
