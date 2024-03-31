import Keyv from 'keyv'

export type Role = 'user' | 'assistant' | 'system'

export type FetchFn = typeof fetch

export type TongYiAPIOptions = {
  apiKey: string

  /** @defaultValue `'https://api.TongYi.com'` **/
  apiBaseUrl?: string

  apiOrg?: string

  /** @defaultValue `false` **/
  debug?: boolean

  completionParams?: Partial<
    Omit<TongYi.CreateChatCompletionRequest, 'messages' | 'n' | 'stream'>
  >

  systemMessage?: string

  /** @defaultValue `4096` **/
  maxModelTokens?: number

  /** @defaultValue `1000` **/
  maxResponseTokens?: number

  messageStore?: Keyv
  getMessageById?: GetMessageByIdFunction
  upsertMessage?: UpsertMessageFunction

  fetch?: FetchFn
}

export type SendMessageOptions = {
  /** The name of a user in a multi-user chat. */
  name?: string
  parentMessageId?: string
  conversationId?: string
  messageId?: string
  stream?: boolean
  systemMessage?: string
  timeoutMs?: number
  onProgress?: (partialResponse: ChatMessage) => void
  abortSignal?: AbortSignal
  completionParams?: Partial<
    Omit<TongYi.CreateChatCompletionRequest, 'messages' | 'n' | 'stream'>
  >
}

export type MessageActionType = 'next' | 'variant'

export type SendMessageBrowserOptions = {
  conversationId?: string
  parentMessageId?: string
  messageId?: string
  action?: MessageActionType
  timeoutMs?: number
  onProgress?: (partialResponse: ChatMessage) => void
  abortSignal?: AbortSignal
}

export interface ChatMessage {
  id: string
  text: string
  role: Role
  name?: string
  delta?: string
  detail?:
    | TongYi.CreateChatCompletionResponse
    | CreateChatCompletionStreamResponse

  parentMessageId?: string
}

export class TongYiError extends Error {
  statusCode?: number
  statusText?: string
  isFinal?: boolean
  accountId?: string
}

/** Returns a chat message from a store by it's ID (or null if not found). */
export type GetMessageByIdFunction = (id: string) => Promise<ChatMessage>

/** Upserts a chat message to a store. */
export type UpsertMessageFunction = (message: ChatMessage) => Promise<void>

export interface CreateChatCompletionStreamResponse
  extends TongYi.CreateChatCompletionDeltaResponse {
  usage: CreateCompletionStreamResponseUsage
}

export interface CreateCompletionStreamResponseUsage
  extends TongYi.CreateCompletionResponseUsage {
  estimated: true
}

/**
 * https://chat.openapi.com/backend-api/conversation
 */
export type ConversationJSONBody = {
  /**
   * The action to take
   */
  action: string

  /**
   * The ID of the conversation
   */
  conversation_id?: string

  /**
   * Prompts to provide
   */
  messages: Prompt[]

  /**
   * The model to use
   */
  model: string

  /**
   * The parent message ID
   */
  parent_message_id: string
}

export type Prompt = {
  /**
   * The content of the prompt
   */
  content: PromptContent

  /**
   * The ID of the prompt
   */
  id: string

  /**
   * The role played in the prompt
   */
  role: Role
}

export type ContentType = 'text'

export type PromptContent = {
  /**
   * The content type of the prompt
   */
  content_type: ContentType

  /**
   * The parts to the prompt
   */
  parts: string[]
}

export type ConversationResponseEvent = {
  message?: Message
  conversation_id?: string
  error?: string | null
}

export type Message = {
  id: string
  content: MessageContent
  role: Role
  user: string | null
  create_time: string | null
  update_time: string | null
  end_turn: null
  weight: number
  recipient: string
  metadata: MessageMetadata
}

export type MessageContent = {
  content_type: string
  parts: string[]
}

export type MessageMetadata = any

export namespace TongYi {
  export interface CreateChatCompletionDeltaResponse {
    request_id: string
    choise: Array<CreateChatCompletionResponseChoisesInner>
    output: CreateCompletionResponseOutput
    usage: CreateCompletionResponseUsage
  }

  /**
   *
   * @export
   * @interface ChatCompletionRequestMessage
   */
  export interface ChatCompletionRequestMessage {
    /**
     * 角色当前可选值：system、user、assistant和tool
     * @type {string}
     * @memberof ChatCompletionRequestMessage
     */
    role: ChatCompletionRequestMessageRoleEnum
    /**
     * 对话内容
     * @type {string}
     * @memberof ChatCompletionRequestMessage
     */
    content: string
    /**
     * role为tool表示当前message为function_call的调用结果，name是function的名称，需要和上轮response中的tool_calls[i].function.name参数保持一致，content为function的输出。
     * @type {string}
     * @memberof ChatCompletionRequestMessage
     */
    name?: string
  }
  export declare const ChatCompletionRequestMessageRoleEnum: {
    readonly System: 'system'
    readonly User: 'user'
    readonly Assistant: 'assistant'
  }
  export declare type ChatCompletionRequestMessageRoleEnum =
    (typeof ChatCompletionRequestMessageRoleEnum)[keyof typeof ChatCompletionRequestMessageRoleEnum]
  /**
   *
   * @export
   * @interface ChatCompletionResponseMessage
   */
  export interface ChatCompletionResponseMessage {
    /**
     * The role of the author of this message.
     * @type {string}
     * @memberof ChatCompletionResponseMessage
     */
    role: ChatCompletionResponseMessageRoleEnum
    /**
     * The contents of the message
     * @type {string}
     * @memberof ChatCompletionResponseMessage
     */
    content: string
  }
  export declare const ChatCompletionResponseMessageRoleEnum: {
    readonly System: 'system'
    readonly User: 'user'
    readonly Assistant: 'assistant'
  }
  export declare type ChatCompletionResponseMessageRoleEnum =
    (typeof ChatCompletionResponseMessageRoleEnum)[keyof typeof ChatCompletionResponseMessageRoleEnum]
  /**
   *
   * @export
   * @interface CreateChatCompletionRequest
   */
  export interface CreateChatCompletionRequest {
    /**
     * 指定用于对话的通义千问模型名，目前可选择qwen-turbo、qwen-plus、qwen-max、qwen-max-1201和qwen-max-longcontext。
     * @type {string}
     * @memberof CreateChatCompletionRequest
     */
    model: string
    /**
     * 用户与模型的对话历史，对话接口未来都会有message传输，list中的每个元素形式为{"role":角色, "content": 内容}。角色当前可选值：system、user、assistant和tool。未来可以扩展到更多role。
     * @type {Array<ChatCompletionRequestMessage>}
     * @memberof CreateChatCompletionRequest
     */
    messages: Array<ChatCompletionRequestMessage>
    /**
     * 用于控制随机性和多样性的程度。具体来说，temperature值控制了生成文本时对每个候选词的概率分布进行平滑的程度。较高的temperature值会降低概率分布的峰值，使得更多的低概率词被选择，生成结果更加多样化；而较低的temperature值则会增强概率分布的峰值，使得高概率词更容易被选择，生成结果更加确定。取值范围：[0, 2)，系统默认值0.85。不建议取值为0，无意义。
     * @type {number}
     * @memberof CreateChatCompletionRequest
     */
    temperature?: number | null
    /**
     * 生成时，核采样方法的概率阈值。例如，取值为0.8时，仅保留累计概率之和大于等于0.8的概率分布中的token，作为随机采样的候选集。取值范围为（0,1.0)，取值越大，生成的随机性越高；取值越低，生成的随机性越低。默认值为0.8。注意，取值不要大于等于1
     * @type {number}
     * @memberof CreateChatCompletionRequest
     */
    top_p?: number | null
    /**
     * 生成时，采样候选集的大小。例如，取值为50时，仅将单次生成中得分最高的50个token组成随机采样的候选集。取值越大，生成的随机性越高；取值越小，生成的确定性越高。注意：如果top_k参数为空或者top_k的值大于100，表示不启用top_k策略，此时仅有top_p策略生效，默认是空。
     * @type {number}
     * @memberof CreateChatCompletionRequest
     */
    top_k?: number
    /**
     * 生成时使用的随机数种子，用户控制模型生成内容的随机性。seed支持无符号64位整数，默认值为1234。在使用seed时，模型将尽可能生成相同或相似的结果，但目前不保证每次生成的结果完全相同。
     * @type {number}
     * @memberof CreateChatCompletionRequest
     */
    seed?: number
    /**
     * 是否使用流式输出。当以stream模式输出结果时，接口返回结果为generator，需要通过迭代获取结果，默认每次输出为当前生成的整个序列，最后一次输出为最终全部生成结果，可以通过参数incremental_output为False改变输出模式为非增量输出。
     * @type {boolean}
     * @memberof CreateChatCompletionRequest
     */
    stream?: boolean | null
    /**
     * stop参数用于实现内容生成过程的精确控制，在生成内容即将包含指定的字符串或token_ids时自动停止，生成内容不包含指定的内容。例如，如果指定stop为"你好"，表示将要生成"你好"时停止；如果指定stop为[37763, 367]，表示将要生成"Observation"时停止。stop参数支持以list方式传入字符串数组或者token_ids数组，支持使用多个stop的场景。
     * @type {CreateChatCompletionRequestStop}
     * @memberof CreateChatCompletionRequest
     */
    stop?: CreateChatCompletionRequestStop
    /**
     * 用于限制模型生成token的数量，max_tokens设置的是生成上限，并不表示一定会生成这么多的token数量。其中qwen-turbo最大值和默认值为1500，qwen-max、qwen-max-1201 、qwen-max-longcontext 和 qwen-plus最大值和默认值均为2000。
     * @type {number}
     * @memberof CreateChatCompletionRequest
     */
    max_tokens?: number
    /**
     * 用于控制流式输出模式，默认False，即后面内容会包含已经输出的内容；设置为True，将开启增量输出模式，后面输出不会包含已经输出的内容，您需要自行拼接整体输出，参考流式输出示例代码。
       默认False：
       I
       I like
       i like apple
       True:
       I
       like
       apple
       该参数只能与stream输出模式配合使用。
     * @type {boolean}
     * @memberof CreateChatCompletionRequest
     */
    incremental_output?: boolean
    /**
     * 模型内置了互联网搜索服务，该参数控制模型在生成文本时是否参考使用互联网搜索结果。取值如下：
       true：启用互联网搜索，模型会将搜索结果作为文本生成过程中的参考信息，但模型会基于其内部逻辑“自行判断”是否使用互联网搜索结果。
       false（默认）：关闭互联网搜索。
     * @type {boolean}
     * @memberof CreateChatCompletionRequest
     */
    enable_search?: boolean
    /**
     * 用于控制模型生成时的重复度。提高repetition_penalty时可以降低模型生成top_k的重复度。1.0表示不做惩罚。默认为1.1。
     * @type {number}
     * @memberof CreateChatCompletionRequest
     */
    repetition_penalty?: number
  }
  /**
   * @type CreateChatCompletionRequestStop
   * Up to 4 sequences where the API will stop generating further tokens.
   * @export
   */
  export declare type CreateChatCompletionRequestStop = Array<string> | string
  /**
   *
   * @export
   * @interface CreateChatCompletionResponse
   */
  export interface CreateChatCompletionResponse {
    /**
     * 本次请求的系统唯一码。
     * @type {string}
     * @memberof CreateChatCompletionResponse
     */
    request_id: string
    /**
     *
     * @type {Array<CreateChatCompletionResponseChoisesInner>}
     * @memberof CreateChatCompletionResponse
     */
    choise: Array<CreateChatCompletionResponseChoisesInner>
    output: CreateCompletionResponseOutput
    /**
     *
     * @type {CreateCompletionResponseUsage}
     * @memberof CreateChatCompletionResponse
     */
    usage: CreateCompletionResponseUsage
  }
  /**
   *
   * @export
   * @interface CreateChatCompletionResponseChoisesInner
   */
  export interface CreateChatCompletionResponseChoisesInner {
    /**
     *
     * @type {ChatCompletionResponseMessage}
     * @memberof CreateChatCompletionResponseChoisesInner
     */
    message?: ChatCompletionResponseMessage
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponseChoisesInner
     */
    finish_reason?: string
  }

  /**
   * 输出信息
   * @export
   * @interface CreateCompletionResponseUsage
   */
  export interface CreateCompletionResponseOutput {
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponseChoisesInner
     */
    text?: string
    /**
     *
     * @type {string}
     * @memberof CreateChatCompletionResponseChoisesInner
     */
    finish_reason?: string
  }

  /**
   * token用量信息
   * @export
   * @interface CreateCompletionResponseUsage
   */
  export interface CreateCompletionResponseUsage {
    /**
     *
     * @type {number}
     * @memberof CreateCompletionResponseUsage
     */
    output_tokens: number
    /**
     *
     * @type {number}
     * @memberof CreateCompletionResponseUsage
     */
    input_tokens: number
  }
}
