[ty-sdk](../readme.md) / [Exports](../modules.md) / [TongYi](../modules/TongYi.md) / CreateChatCompletionRequest

# Interface: CreateChatCompletionRequest

[TongYi](../modules/TongYi.md).CreateChatCompletionRequest

**`Export`**

CreateChatCompletionRequest

## Table of contents

### Properties

- [enable\_search](TongYi.CreateChatCompletionRequest.md#enable_search)
- [incremental\_output](TongYi.CreateChatCompletionRequest.md#incremental_output)
- [max\_tokens](TongYi.CreateChatCompletionRequest.md#max_tokens)
- [messages](TongYi.CreateChatCompletionRequest.md#messages)
- [model](TongYi.CreateChatCompletionRequest.md#model)
- [repetition\_penalty](TongYi.CreateChatCompletionRequest.md#repetition_penalty)
- [seed](TongYi.CreateChatCompletionRequest.md#seed)
- [stop](TongYi.CreateChatCompletionRequest.md#stop)
- [stream](TongYi.CreateChatCompletionRequest.md#stream)
- [temperature](TongYi.CreateChatCompletionRequest.md#temperature)
- [top\_k](TongYi.CreateChatCompletionRequest.md#top_k)
- [top\_p](TongYi.CreateChatCompletionRequest.md#top_p)

## Properties

### enable\_search

• `Optional` **enable\_search**: `boolean`

模型内置了互联网搜索服务，该参数控制模型在生成文本时是否参考使用互联网搜索结果。取值如下：
  true：启用互联网搜索，模型会将搜索结果作为文本生成过程中的参考信息，但模型会基于其内部逻辑“自行判断”是否使用互联网搜索结果。
  false（默认）：关闭互联网搜索。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:336](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L336)

___

### incremental\_output

• `Optional` **incremental\_output**: `boolean`

用于控制流式输出模式，默认False，即后面内容会包含已经输出的内容；设置为True，将开启增量输出模式，后面输出不会包含已经输出的内容，您需要自行拼接整体输出，参考流式输出示例代码。
  默认False：
  I
  I like
  i like apple
  True:
  I
  like
  apple
  该参数只能与stream输出模式配合使用。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:328](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L328)

___

### max\_tokens

• `Optional` **max\_tokens**: `number`

用于限制模型生成token的数量，max_tokens设置的是生成上限，并不表示一定会生成这么多的token数量。其中qwen-turbo最大值和默认值为1500，qwen-max、qwen-max-1201 、qwen-max-longcontext 和 qwen-plus最大值和默认值均为2000。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:313](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L313)

___

### messages

• **messages**: [`ChatCompletionRequestMessage`](TongYi.ChatCompletionRequestMessage.md)[]

用户与模型的对话历史，对话接口未来都会有message传输，list中的每个元素形式为{"role":角色, "content": 内容}。角色当前可选值：system、user、assistant和tool。未来可以扩展到更多role。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:271](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L271)

___

### model

• **model**: `string`

指定用于对话的通义千问模型名，目前可选择qwen-turbo、qwen-plus、qwen-max、qwen-max-1201和qwen-max-longcontext。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:265](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L265)

___

### repetition\_penalty

• `Optional` **repetition\_penalty**: `number`

用于控制模型生成时的重复度。提高repetition_penalty时可以降低模型生成top_k的重复度。1.0表示不做惩罚。默认为1.1。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:342](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L342)

___

### seed

• `Optional` **seed**: `number`

生成时使用的随机数种子，用户控制模型生成内容的随机性。seed支持无符号64位整数，默认值为1234。在使用seed时，模型将尽可能生成相同或相似的结果，但目前不保证每次生成的结果完全相同。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:295](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L295)

___

### stop

• `Optional` **stop**: [`CreateChatCompletionRequestStop`](../modules/TongYi.md#createchatcompletionrequeststop)

stop参数用于实现内容生成过程的精确控制，在生成内容即将包含指定的字符串或token_ids时自动停止，生成内容不包含指定的内容。例如，如果指定stop为"你好"，表示将要生成"你好"时停止；如果指定stop为[37763, 367]，表示将要生成"Observation"时停止。stop参数支持以list方式传入字符串数组或者token_ids数组，支持使用多个stop的场景。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:307](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L307)

___

### stream

• `Optional` **stream**: `boolean`

是否使用流式输出。当以stream模式输出结果时，接口返回结果为generator，需要通过迭代获取结果，默认每次输出为当前生成的整个序列，最后一次输出为最终全部生成结果，可以通过参数incremental_output为False改变输出模式为非增量输出。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:301](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L301)

___

### temperature

• `Optional` **temperature**: `number`

用于控制随机性和多样性的程度。具体来说，temperature值控制了生成文本时对每个候选词的概率分布进行平滑的程度。较高的temperature值会降低概率分布的峰值，使得更多的低概率词被选择，生成结果更加多样化；而较低的temperature值则会增强概率分布的峰值，使得高概率词更容易被选择，生成结果更加确定。取值范围：[0, 2)，系统默认值0.85。不建议取值为0，无意义。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:277](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L277)

___

### top\_k

• `Optional` **top\_k**: `number`

生成时，采样候选集的大小。例如，取值为50时，仅将单次生成中得分最高的50个token组成随机采样的候选集。取值越大，生成的随机性越高；取值越小，生成的确定性越高。注意：如果top_k参数为空或者top_k的值大于100，表示不启用top_k策略，此时仅有top_p策略生效，默认是空。

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:289](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L289)

___

### top\_p

• `Optional` **top\_p**: `number`

生成时，核采样方法的概率阈值。例如，取值为0.8时，仅保留累计概率之和大于等于0.8的概率分布中的token，作为随机采样的候选集。取值范围为（0,1.0)，取值越大，生成的随机性越高；取值越低，生成的随机性越低。默认值为0.8。注意，取值不要大于等于1

**`Memberof`**

CreateChatCompletionRequest

#### Defined in

[src/types.ts:283](https://github.com/isnl/ty-sdk/blob/52769c2/src/types.ts#L283)
