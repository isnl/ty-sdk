[ty-sdk](../readme.md) / [Exports](../modules.md) / [TongYi](../modules/TongYi.md) / ChatCompletionRequestMessage

# Interface: ChatCompletionRequestMessage

[TongYi](../modules/TongYi.md).ChatCompletionRequestMessage

**`Export`**

ChatCompletionRequestMessage

## Table of contents

### Properties

- [content](TongYi.ChatCompletionRequestMessage.md#content)
- [name](TongYi.ChatCompletionRequestMessage.md#name)
- [role](TongYi.ChatCompletionRequestMessage.md#role)

## Properties

### content

• **content**: `string`

对话内容

**`Memberof`**

ChatCompletionRequestMessage

#### Defined in

[src/types.ts:213](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L213)

___

### name

• `Optional` **name**: `string`

role为tool表示当前message为function_call的调用结果，name是function的名称，需要和上轮response中的tool_calls[i].function.name参数保持一致，content为function的输出。

**`Memberof`**

ChatCompletionRequestMessage

#### Defined in

[src/types.ts:219](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L219)

___

### role

• **role**: [`ChatCompletionRequestMessageRoleEnum`](../modules/TongYi.md#chatcompletionrequestmessageroleenum-1)

角色当前可选值：system、user、assistant和tool

**`Memberof`**

ChatCompletionRequestMessage

#### Defined in

[src/types.ts:207](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L207)
