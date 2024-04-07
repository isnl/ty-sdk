# 通义千问 大语言模型 Nodejs SDK <!-- omit in toc -->


[![NPM](https://img.shields.io/npm/v/ty-sdk.svg)](https://www.npmjs.com/package/ty-sdk) [![Build Status](https://github.com/isnl/ty-sdk/actions/workflows/test.yml/badge.svg)](https://github.com/isnl/ty-sdk/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/isnl/ty-sdk/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [介绍](#介绍)
- [安装](#安装)
- [使用](#使用)
- [文档](#文档)
- [Demos](#demos)
- [兼容性](#兼容性)
- [License](#license)

## 介绍

此存储库是nodejs版本的通义千问大语言模型API的包装 ✨

<p align="center">
  <img alt="Example usage" src="/media/demo.gif">
</p>

<br>

<p align="center">
  <img alt="Example usage" src="/media/demo-on-progress.gif">
</p>

<br>

<p align="center">
  <img alt="Example usage" src="/media/demo-on-conversation.gif">
</p>


您可以在您的nodejs项目中这样调用api

```ts
import { TongYiAPI } from 'ty-sdk'

const api = new TongYiAPI({
  apiKey: process.env.TY_API_KEY
})

const res = await api.sendMessage('Hello World!')
console.log(res.text)
```

## 安装

```bash
npm install ty-sdk
```

确保您的 `node >= 18`，这样 `fetch` 是可用的。（或者如果您安装了 [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill)，则 `node >= 14`）即可。

## 使用

1.登录 [阿里云百炼](https://bailian.console.aliyun.com/)  控制台  

2.创建大模型应用 [https://bailian.console.aliyun.com/#/app-center](https://bailian.console.aliyun.com/#/app-center)

3.创建并复制API KEY [https://bailian.console.aliyun.com/#/api_key](https://bailian.console.aliyun.com/#/api_key)


```ts
import { TongYiAPI } from 'ty-sdk'

async function example() {
  const api = new TongYiAPI({
    apiKey: process.env.TY_API_KEY
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
```

您可以使用 `completionParams` 来覆盖默认的 `model` (`qwen-plus`) 和任何 [官方文档参数](https://help.aliyun.com/document_detail/2712576.html)。

```ts
const api = new TongYiAPI({
  apiKey: process.env.TY_API_KEY,
  completionParams: {
    model: 'qwen-turbo',
    temperature: 0.5,
    top_p: 0.8
  }
})
```

如果想要连续对话，您需要像这样传递 `parentMessageId`：

```ts
const api = new TongYiAPI({ apiKey: process.env.TY_API_KEY })

// 发送一条消息并等待回复
let res = await api.sendMessage('你知道通义千问吗?')
console.log(res.text)

// 发送一个连续对话消息
res = await api.sendMessage('能展开说说吗?', {
  parentMessageId: res.id
})
console.log(res.text)

// 发送另一个连续对话消息
res = await api.sendMessage('我们现在在讨论什么东西？', {
  parentMessageId: res.id
})
console.log(res.text)
```

您可以通过 `onProgress` 处理程序添加流式处理：

```js
const res = await api.sendMessage('写一篇关于青蛙的500字作文。', {
  // 流式响应
  onProgress: (partialResponse) => console.log(partialResponse.text)
})

// 在最后打印完整文本
console.log(res.text)
```

您可以使用 `timeoutMs` 选项设置超时时间：

```ts
// 2分钟后超时（还将终止底层 HTTP 请求）
const response = await api.sendMessage(
  '写一篇非常非常长的关于青蛙的作文',
  {
    timeoutMs: 2 * 60 * 1000
  }
)
```

如果您想查看有关实际发送到 [SDK](https://help.aliyun.com/document_detail/2712576.html) 的更多信息，请在 `TongYiAPI` 构造函数中设置 `debug: true` 选项：

```ts
const api = new TongYiAPI({
  apiKey: process.env.TY_API_KEY,
  debug: true
})
```

我们默使认用基本的 `systemMessage`。您可以在 `TongYiAPI` 构造函数或 `sendMessage` 中覆盖这个消息：

```ts
const res = await api.sendMessage('宇宙的答案是什么？', {
  systemMessage: `您好，我是一个人工智能超级助手。我会尽可能简洁地回答每个问题。\n如果您正在生成列表，请不要有太多项目。
当前日期：${new Date().toISOString()}\n\n`
})
```

请注意，我们会自动处理将先前的消息附加到提示并尝试优化可用标记数（默认为 `4096`）。

<details>
<summary>在CommonJS中使用 (Dynamic import)</summary>

```js
async function example() {
  // To use ESM in CommonJS, you can use a dynamic import like this:
  const { TongYiAPI } = await import('ty-sdk')
  // You can also try dynamic importing like this:
  // const importDynamic = new Function('modulePath', 'return import(modulePath)')
  // const { TongYiAPI } = await importDynamic('ty-sdk')

  const api = new TongYiAPI({ apiKey: process.env.TY_API_KEY })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
```

</details>

## 文档

在 [自动生成的文档](./docs/classes/TongYiAPI.md) 中查看更多方法和参数的相关信息

## Demos

要运行包含的演示：

1. 克隆仓库 [https://github.com/isnl/ty-sdk](https://github.com/isnl/ty-sdk)
2. 安装 Node 依赖
3. 在 .env 文件中设置 `TY_API_KEY`

这是最简单的 [基础演示](./demos/demo.ts)：

```bash
npx tsx demos/demo.ts
```

显示进度处理程序的 [演示](./demos/demo-on-progress.ts)：

```bash
npx tsx demos/demo-on-progress.ts
```

进度演示使用可选的 `onProgress` 参数来接收持续输出结果。

一个 [对话演示](./demos/demo-conversation.ts)：

```bash
npx tsx demos/demo-conversation.ts
```


请注意，为了记住超出当前 Node.js 进程范围的先前对话上下文，持久化消息是必需的，在默认情况下，我们只在内存中存储消息。

## 兼容性

- 仅支持ESM模块。
- 要求`node`版本大于等于14。
- 假定已安装了`fetch`功能。
  - 对于`node`版本大于等于18的环境，`fetch`已默认内置安装。
  - 对于`node`版本小于18的环境，你需要安装类似`unfetch/polyfill`（[使用指南](https://github.com/developit/unfetch#usage-as-a-polyfill)）或`isomorphic-fetch`（[使用指南](https://github.com/matthew-andrews/isomorphic-fetch#readme)）这样的polyfill库。


## License

MIT
