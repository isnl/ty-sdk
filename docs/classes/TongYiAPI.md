[ty-sdk](../readme.md) / [Exports](../modules.md) / TongYiAPI

# Class: TongYiAPI

## Table of contents

### Constructors

- [constructor](TongYiAPI.md#constructor)

### Accessors

- [apiKey](TongYiAPI.md#apikey)

### Methods

- [sendMessage](TongYiAPI.md#sendmessage)

## Constructors

### constructor

• **new TongYiAPI**(`opts`)

Creates a new client wrapper around TongYi's chat completion API, mimicing the official TongYiQianWen webapp's functionality as closely as possible.

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`TongYiAPIOptions`](../modules.md#tongyiapioptions) |

#### Defined in

[src/tongyi-api.ts:46](https://github.com/isnl/ty-sdk/blob/52769c2/src/tongyi-api.ts#L46)

## Accessors

### apiKey

• `get` **apiKey**(): `string`

#### Returns

`string`

#### Defined in

[src/tongyi-api.ts:290](https://github.com/isnl/ty-sdk/blob/52769c2/src/tongyi-api.ts#L290)

• `set` **apiKey**(`apiKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |

#### Returns

`void`

#### Defined in

[src/tongyi-api.ts:294](https://github.com/isnl/ty-sdk/blob/52769c2/src/tongyi-api.ts#L294)

## Methods

### sendMessage

▸ **sendMessage**(`text`, `opts?`): `Promise`\<[`ChatMessage`](../interfaces/ChatMessage.md)\>

Sends a message to the TongYi chat completions endpoint, waits for the response
to resolve, and returns the response.

If you want your response to have historical context, you must provide a valid `parentMessageId`.

If you want to receive a stream of partial responses, use `opts.onProgress`.

Set `debug: true` in the `TongYiAPI` constructor to log more info on the full prompt sent to the TongYi chat completions API. You can override the `systemMessage` in `opts` to customize the assistant's instructions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `opts` | [`SendMessageOptions`](../modules.md#sendmessageoptions) |

#### Returns

`Promise`\<[`ChatMessage`](../interfaces/ChatMessage.md)\>

The response from TongYiQianWen

#### Defined in

[src/tongyi-api.ts:121](https://github.com/isnl/ty-sdk/blob/52769c2/src/tongyi-api.ts#L121)
