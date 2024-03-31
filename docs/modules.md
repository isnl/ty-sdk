[ty-sdk](readme.md) / Exports

# ty-sdk

## Table of contents

### Namespaces

- [TongYi](modules/TongYi.md)

### Classes

- [TongYiAPI](classes/TongYiAPI.md)
- [TongYiError](classes/TongYiError.md)

### Interfaces

- [ChatMessage](interfaces/ChatMessage.md)
- [CreateChatCompletionStreamResponse](interfaces/CreateChatCompletionStreamResponse.md)
- [CreateCompletionStreamResponseUsage](interfaces/CreateCompletionStreamResponseUsage.md)

### Type Aliases

- [ContentType](modules.md#contenttype)
- [ConversationJSONBody](modules.md#conversationjsonbody)
- [ConversationResponseEvent](modules.md#conversationresponseevent)
- [FetchFn](modules.md#fetchfn)
- [GetMessageByIdFunction](modules.md#getmessagebyidfunction)
- [Message](modules.md#message)
- [MessageActionType](modules.md#messageactiontype)
- [MessageContent](modules.md#messagecontent)
- [MessageMetadata](modules.md#messagemetadata)
- [Prompt](modules.md#prompt)
- [PromptContent](modules.md#promptcontent)
- [Role](modules.md#role)
- [SendMessageBrowserOptions](modules.md#sendmessagebrowseroptions)
- [SendMessageOptions](modules.md#sendmessageoptions)
- [TongYiAPIOptions](modules.md#tongyiapioptions)
- [UpsertMessageFunction](modules.md#upsertmessagefunction)

## Type Aliases

### ContentType

Ƭ **ContentType**: ``"text"``

#### Defined in

[src/types.ts:148](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L148)

___

### ConversationJSONBody

Ƭ **ConversationJSONBody**: `Object`

https://chat.openapi.com/backend-api/conversation

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | `string` | The action to take |
| `conversation_id?` | `string` | The ID of the conversation |
| `messages` | [`Prompt`](modules.md#prompt)[] | Prompts to provide |
| `model` | `string` | The model to use |
| `parent_message_id` | `string` | The parent message ID |

#### Defined in

[src/types.ts:104](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L104)

___

### ConversationResponseEvent

Ƭ **ConversationResponseEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `conversation_id?` | `string` |
| `error?` | `string` \| ``null`` |
| `message?` | [`Message`](modules.md#message) |

#### Defined in

[src/types.ts:162](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L162)

___

### FetchFn

Ƭ **FetchFn**: typeof `fetch`

#### Defined in

[src/types.ts:5](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L5)

___

### GetMessageByIdFunction

Ƭ **GetMessageByIdFunction**: (`id`: `string`) => `Promise`\<[`ChatMessage`](interfaces/ChatMessage.md)\>

#### Type declaration

▸ (`id`): `Promise`\<[`ChatMessage`](interfaces/ChatMessage.md)\>

Returns a chat message from a store by it's ID (or null if not found).

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

##### Returns

`Promise`\<[`ChatMessage`](interfaces/ChatMessage.md)\>

#### Defined in

[src/types.ts:86](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L86)

___

### Message

Ƭ **Message**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content` | [`MessageContent`](modules.md#messagecontent) |
| `create_time` | `string` \| ``null`` |
| `end_turn` | ``null`` |
| `id` | `string` |
| `metadata` | [`MessageMetadata`](modules.md#messagemetadata) |
| `recipient` | `string` |
| `role` | [`Role`](modules.md#role) |
| `update_time` | `string` \| ``null`` |
| `user` | `string` \| ``null`` |
| `weight` | `number` |

#### Defined in

[src/types.ts:168](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L168)

___

### MessageActionType

Ƭ **MessageActionType**: ``"next"`` \| ``"variant"``

#### Defined in

[src/types.ts:53](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L53)

___

### MessageContent

Ƭ **MessageContent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content_type` | `string` |
| `parts` | `string`[] |

#### Defined in

[src/types.ts:181](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L181)

___

### MessageMetadata

Ƭ **MessageMetadata**: `any`

#### Defined in

[src/types.ts:186](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L186)

___

### Prompt

Ƭ **Prompt**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | [`PromptContent`](modules.md#promptcontent) | The content of the prompt |
| `id` | `string` | The ID of the prompt |
| `role` | [`Role`](modules.md#role) | The role played in the prompt |

#### Defined in

[src/types.ts:131](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L131)

___

### PromptContent

Ƭ **PromptContent**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `content_type` | [`ContentType`](modules.md#contenttype) | The content type of the prompt |
| `parts` | `string`[] | The parts to the prompt |

#### Defined in

[src/types.ts:150](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L150)

___

### Role

Ƭ **Role**: ``"user"`` \| ``"assistant"`` \| ``"system"``

#### Defined in

[src/types.ts:3](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L3)

___

### SendMessageBrowserOptions

Ƭ **SendMessageBrowserOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `abortSignal?` | `AbortSignal` |
| `action?` | [`MessageActionType`](modules.md#messageactiontype) |
| `conversationId?` | `string` |
| `messageId?` | `string` |
| `onProgress?` | (`partialResponse`: [`ChatMessage`](interfaces/ChatMessage.md)) => `void` |
| `parentMessageId?` | `string` |
| `timeoutMs?` | `number` |

#### Defined in

[src/types.ts:55](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L55)

___

### SendMessageOptions

Ƭ **SendMessageOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `abortSignal?` | `AbortSignal` | - |
| `completionParams?` | `Partial`\<`Omit`\<[`CreateChatCompletionRequest`](interfaces/TongYi.CreateChatCompletionRequest.md), ``"messages"`` \| ``"n"`` \| ``"stream"``\>\> | - |
| `conversationId?` | `string` | - |
| `messageId?` | `string` | - |
| `name?` | `string` | The name of a user in a multi-user chat. |
| `onProgress?` | (`partialResponse`: [`ChatMessage`](interfaces/ChatMessage.md)) => `void` | - |
| `parentMessageId?` | `string` | - |
| `stream?` | `boolean` | - |
| `systemMessage?` | `string` | - |
| `timeoutMs?` | `number` | - |

#### Defined in

[src/types.ts:37](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L37)

___

### TongYiAPIOptions

Ƭ **TongYiAPIOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiBaseUrl?` | `string` | **`Default Value`** `'https://api.TongYi.com'` * |
| `apiKey` | `string` | - |
| `apiOrg?` | `string` | - |
| `completionParams?` | `Partial`\<`Omit`\<[`CreateChatCompletionRequest`](interfaces/TongYi.CreateChatCompletionRequest.md), ``"messages"`` \| ``"n"`` \| ``"stream"``\>\> | - |
| `debug?` | `boolean` | **`Default Value`** `false` * |
| `fetch?` | [`FetchFn`](modules.md#fetchfn) | - |
| `getMessageById?` | [`GetMessageByIdFunction`](modules.md#getmessagebyidfunction) | - |
| `maxModelTokens?` | `number` | **`Default Value`** `4096` * |
| `maxResponseTokens?` | `number` | **`Default Value`** `1000` * |
| `messageStore?` | `Keyv` | - |
| `systemMessage?` | `string` | - |
| `upsertMessage?` | [`UpsertMessageFunction`](modules.md#upsertmessagefunction) | - |

#### Defined in

[src/types.ts:7](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L7)

___

### UpsertMessageFunction

Ƭ **UpsertMessageFunction**: (`message`: [`ChatMessage`](interfaces/ChatMessage.md)) => `Promise`\<`void`\>

#### Type declaration

▸ (`message`): `Promise`\<`void`\>

Upserts a chat message to a store.

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`ChatMessage`](interfaces/ChatMessage.md) |

##### Returns

`Promise`\<`void`\>

#### Defined in

[src/types.ts:89](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L89)
