import Keyv from 'keyv'
import pTimeout from 'p-timeout'
import QuickLRU from 'quick-lru'
import { v4 as uuidv4 } from 'uuid'

import * as types from './types'
import { fetch as globalFetch } from './fetch'
import { fetchSSE } from './fetch-sse'

const TONGYI_MODEL = 'qwen-plus'

const USER_LABEL_DEFAULT = 'user'
const ASSISTANT_LABEL_DEFAULT = 'assistant'

export class TongYiAPI {
  protected _apiKey: string
  protected _apiBaseUrl: string
  protected _debug: boolean

  protected _systemMessage: string
  protected _completionParams: Omit<
    types.TongYi.CreateChatCompletionRequest,
    'messages' | 'n'
  >
  protected _fetch: types.FetchFn

  protected _getMessageById: types.GetMessageByIdFunction
  protected _upsertMessage: types.UpsertMessageFunction

  protected _messageStore: Keyv<types.ChatMessage>

  /**
   * Creates a new client wrapper around TongYi's chat completion API, mimicing the official TongYiQianWen webapp's functionality as closely as possible.
   *
   * @param apiKey - TongYi API key (required).
   * @param apiBaseUrl - Optional override for the TongYi API base URL.
   * @param debug - Optional enables logging debugging info to stdout.
   * @param completionParams - Param overrides to send to the [TongYi chat completion API](https://help.aliyun.com/document_detail/2712576.html). Options like `temperature` and `presence_penalty` can be tweaked to change the personality of the assistant.
   * @param maxModelTokens - Optional override for the maximum number of tokens allowed by the model's context. Defaults to 4096.
   * @param maxResponseTokens - Optional override for the minimum number of tokens allowed for the model's response. Defaults to 1000.
   * @param messageStore - Optional [Keyv](https://github.com/jaredwray/keyv) store to persist chat messages to. If not provided, messages will be lost when the process exits.
   * @param getMessageById - Optional function to retrieve a message by its ID. If not provided, the default implementation will be used (using an in-memory `messageStore`).
   * @param upsertMessage - Optional function to insert or update a message. If not provided, the default implementation will be used (using an in-memory `messageStore`).
   * @param fetch - Optional override for the `fetch` implementation to use. Defaults to the global `fetch` function.
   */
  constructor(opts: types.TongYiAPIOptions) {
    const {
      apiKey,
      apiBaseUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      debug = false,
      messageStore,
      completionParams,
      systemMessage,
      getMessageById,
      upsertMessage,
      fetch = globalFetch
    } = opts

    this._apiKey = apiKey
    this._apiBaseUrl = apiBaseUrl
    this._debug = !!debug
    this._fetch = fetch

    this._completionParams = {
      model: TONGYI_MODEL,
      ...completionParams
    }

    this._systemMessage = systemMessage

    if (this._systemMessage === undefined) {
      const currentDate = new Date().toISOString().split('T')[0]
      this._systemMessage = `You are a helpful assistant.\nCurrent date: ${currentDate}`
    }

    this._getMessageById = getMessageById ?? this._defaultGetMessageById
    this._upsertMessage = upsertMessage ?? this._defaultUpsertMessage

    if (messageStore) {
      this._messageStore = messageStore
    } else {
      this._messageStore = new Keyv<types.ChatMessage, any>({
        store: new QuickLRU<string, types.ChatMessage>({ maxSize: 10000 })
      })
    }

    if (!this._apiKey) {
      throw new Error('TongYi missing required apiKey')
    }

    if (!this._fetch) {
      throw new Error('Invalid environment; fetch is not defined')
    }

    if (typeof this._fetch !== 'function') {
      throw new Error('Invalid "fetch" is not a function')
    }
  }

  /**
   * Sends a message to the TongYi chat completions endpoint, waits for the response
   * to resolve, and returns the response.
   *
   * If you want your response to have historical context, you must provide a valid `parentMessageId`.
   *
   * If you want to receive a stream of partial responses, use `opts.onProgress`.
   *
   * Set `debug: true` in the `TongYiAPI` constructor to log more info on the full prompt sent to the TongYi chat completions API. You can override the `systemMessage` in `opts` to customize the assistant's instructions.
   *
   * @param message - The prompt message to send
   * @param opts.parentMessageId - Optional ID of the previous message in the conversation (defaults to `undefined`)
   * @param opts.messageId - Optional ID of the message to send (defaults to a random UUID)
   * @param opts.systemMessage - Optional override for the chat "system message" which acts as instructions to the model (defaults to the TongYiQianWen system message)
   * @param opts.timeoutMs - Optional timeout in milliseconds (defaults to no timeout)
   * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
   * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
   * @param completionParams - Optional overrides to send to the [TongYi chat completion API](https://help.aliyun.com/document_detail/2712576.html). Options like `temperature` and `presence_penalty` can be tweaked to change the personality of the assistant.
   *
   * @returns The response from TongYiQianWen
   */
  async sendMessage(
    text: string,
    opts: types.SendMessageOptions = {}
  ): Promise<types.ChatMessage> {
    const {
      parentMessageId,
      messageId = uuidv4(),
      timeoutMs,
      onProgress,
      stream = onProgress ? true : false,
      completionParams
    } = opts

    let { abortSignal } = opts

    let abortController: AbortController = null
    if (timeoutMs && !abortSignal) {
      abortController = new AbortController()
      abortSignal = abortController.signal
    }

    const message: types.ChatMessage = {
      role: 'user',
      id: messageId,
      parentMessageId,
      text
    }

    const latestQuestion = message

    const { messages } = await this._buildMessages(text, opts)

    const result: types.ChatMessage = {
      role: 'assistant',
      id: uuidv4(),
      parentMessageId: messageId,
      text: ''
    }

    const responseP = new Promise<types.ChatMessage>(
      async (resolve, reject) => {
        const url = `${this._apiBaseUrl}`
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._apiKey}`,
          Accept: stream ? 'text/event-stream' : '*/*'
        }
        const body = {
          model: TONGYI_MODEL,
          parameters: {
            ...this._completionParams,
            ...completionParams,
            incremental_output: stream ? true : false
          },
          input: {
            messages
          }
        }

        if (this._debug) {
          console.log(`sendMessage`, body)
        }

        if (stream) {
          fetchSSE(
            url,
            {
              method: 'POST',
              headers,
              body: JSON.stringify(body),
              signal: abortSignal,
              onMessage: (data: string) => {
                try {
                  const response: types.TongYi.CreateChatCompletionDeltaResponse =
                    JSON.parse(data)

                  if (response.request_id) {
                    result.id = response.request_id
                  }

                  if (response.output.text?.length) {
                    const delta = response.output
                    result.delta = delta.text
                    if (delta?.text) result.text += delta.text
                    onProgress?.(result)
                  }
                  if (response.output.finish_reason === 'stop') {
                    result.text += response.output.text
                    return resolve(result)
                  }
                } catch (err) {
                  console.warn('TongYi stream SEE event unexpected error', err)
                  return reject(err)
                }
              },
              onError: (errDataStr) => {
                const errData = JSON.parse(errDataStr)
                const msg = `TongYi error ${errData.code}: ${errData.message}`
                const error = new types.TongYiError(msg)
                error.statusCode = errData.code
                error.statusText = errData.message
                return reject(error)
              }
            },
            this._fetch
          ).catch(reject)
        } else {
          try {
            const res = await this._fetch(url, {
              method: 'POST',
              headers,
              body: JSON.stringify(body),
              signal: abortSignal
            })

            if (!res.ok) {
              const result = await res.text()
              const errData = JSON.parse(result)
              const msg = `TongYi error ${errData.code}: ${errData.message}`
              const error = new types.TongYiError(msg)
              error.statusCode = errData.code
              error.statusText = errData.message
              return reject(error)
            }

            const response: types.TongYi.CreateChatCompletionResponse =
              await res.json()
            if (this._debug) {
              console.log(response)
            }

            if (response?.request_id) {
              result.id = response.request_id
            }

            if (response.output.finish_reason === 'stop') {
              result.text = response.output.text.trim()
              return resolve(result)
            }
          } catch (err) {
            return reject(err)
          }
        }
      }
    ).then(async (message) => {
      return Promise.all([
        this._upsertMessage(latestQuestion),
        this._upsertMessage(message)
      ]).then(() => message)
    })

    if (timeoutMs) {
      if (abortController) {
        // This will be called when a timeout occurs in order for us to forcibly
        // ensure that the underlying HTTP request is aborted.
        ;(responseP as any).cancel = () => {
          abortController.abort()
        }
      }

      return pTimeout(responseP, {
        milliseconds: timeoutMs,
        message: 'TongYi timed out waiting for response'
      })
    } else {
      return responseP
    }
  }

  get apiKey(): string {
    return this._apiKey
  }

  set apiKey(apiKey: string) {
    this._apiKey = apiKey
  }

  protected async _buildMessages(text: string, opts: types.SendMessageOptions) {
    const { systemMessage = this._systemMessage } = opts
    let { parentMessageId } = opts

    const userLabel = USER_LABEL_DEFAULT
    const assistantLabel = ASSISTANT_LABEL_DEFAULT

    let messages: types.TongYi.ChatCompletionRequestMessage[] = []

    if (systemMessage) {
      messages.push({
        role: 'system',
        content: systemMessage
      })
    }

    const systemMessageOffset = messages.length
    let nextMessages = text
      ? messages.concat([
          {
            role: 'user',
            content: text,
            name: opts.name
          }
        ])
      : messages

    do {
      messages = nextMessages
      if (!parentMessageId) {
        break
      }
      const parentMessage = await this._getMessageById(parentMessageId)
      if (!parentMessage) {
        break
      }
      const parentMessageRole = parentMessage.role || 'user'
      nextMessages = nextMessages.slice(0, systemMessageOffset).concat([
        {
          role: parentMessageRole,
          content: parentMessage.text,
          name: parentMessage.name
        },
        ...nextMessages.slice(systemMessageOffset)
      ])

      parentMessageId = parentMessage.parentMessageId
    } while (true)

    return { messages }
  }

  protected async _defaultGetMessageById(
    id: string
  ): Promise<types.ChatMessage> {
    const res = await this._messageStore.get(id)
    return res
  }

  protected async _defaultUpsertMessage(
    message: types.ChatMessage
  ): Promise<void> {
    await this._messageStore.set(message.id, message)
  }
}
