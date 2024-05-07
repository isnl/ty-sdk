[ty-sdk](../readme.md) / [Exports](../modules.md) / CreateChatCompletionStreamResponse

# Interface: CreateChatCompletionStreamResponse

## Hierarchy

- [`CreateChatCompletionDeltaResponse`](TongYi.CreateChatCompletionDeltaResponse.md)

  ↳ **`CreateChatCompletionStreamResponse`**

## Table of contents

### Properties

- [choise](CreateChatCompletionStreamResponse.md#choise)
- [output](CreateChatCompletionStreamResponse.md#output)
- [request\_id](CreateChatCompletionStreamResponse.md#request_id)
- [usage](CreateChatCompletionStreamResponse.md#usage)

## Properties

### choise

• **choise**: [`CreateChatCompletionResponseChoisesInner`](TongYi.CreateChatCompletionResponseChoisesInner.md)[]

#### Inherited from

[CreateChatCompletionDeltaResponse](TongYi.CreateChatCompletionDeltaResponse.md).[choise](TongYi.CreateChatCompletionDeltaResponse.md#choise)

#### Defined in

[src/types.ts:193](https://github.com/isnl/ty-sdk/blob/6759037/src/types.ts#L193)

___

### output

• **output**: [`CreateCompletionResponseOutput`](TongYi.CreateCompletionResponseOutput.md)

#### Inherited from

[CreateChatCompletionDeltaResponse](TongYi.CreateChatCompletionDeltaResponse.md).[output](TongYi.CreateChatCompletionDeltaResponse.md#output)

#### Defined in

[src/types.ts:194](https://github.com/isnl/ty-sdk/blob/6759037/src/types.ts#L194)

___

### request\_id

• **request\_id**: `string`

#### Inherited from

[CreateChatCompletionDeltaResponse](TongYi.CreateChatCompletionDeltaResponse.md).[request_id](TongYi.CreateChatCompletionDeltaResponse.md#request_id)

#### Defined in

[src/types.ts:192](https://github.com/isnl/ty-sdk/blob/6759037/src/types.ts#L192)

___

### usage

• **usage**: [`CreateCompletionStreamResponseUsage`](CreateCompletionStreamResponseUsage.md)

#### Overrides

[CreateChatCompletionDeltaResponse](TongYi.CreateChatCompletionDeltaResponse.md).[usage](TongYi.CreateChatCompletionDeltaResponse.md#usage)

#### Defined in

[src/types.ts:95](https://github.com/isnl/ty-sdk/blob/6759037/src/types.ts#L95)
