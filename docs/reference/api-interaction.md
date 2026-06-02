# API 调用与 Function Calling

本附录讲解如何用代码直接调用 AI API。当你想让 AI 融入自动化流程、构建 Agent、或做 AI 驱动的应用时，聊天界面就不够用了，你需要直接和 API 打交道。

这一章用 JavaScript 写例子。你不需要是 JavaScript 专家，能看懂基本语法就行。

## 准备工作

使用 OpenAI 的 API 之前，你需要：

1. 注册账号并获取 API Key。
2. 安装官方 SDK（推荐），或者直接用 fetch 调用。

```bash
npm install openai
```

API Key 不要硬编码在代码里，用环境变量管理：

```bash
export OPENAI_API_KEY="sk-xxxx"
```

国内模型（豆包、Kimi、DeepSeek、Qwen）的 API 结构和 OpenAI 兼容，换一个 baseURL 就行。

## 方式一：用 OpenAI SDK

SDK 封装了 HTTP 请求、错误处理、流式输出等细节，推荐在正式项目中使用。

### 基本对话

```javascript
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "你是一个有用的助手。" },
    { role: "user", content: "用一句话解释什么是 API。" },
  ],
});

console.log(response.choices[0].message.content);
```

SDK 会自动处理认证头、JSON 序列化、错误重试等。你只需要关注业务逻辑。

### 流式输出

```javascript
const stream = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "写一首短诗。" }],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) process.stdout.write(content);
}
```

流式输出让前端可以逐字显示结果，ChatGPT 的“打字机”效果就是这么实现的。

### 传入图片

支持视觉输入的模型可以同时接收文字和图片。消息里的 `content` 不再只是字符串，而是一个内容数组：一段文字说明，加上一张或多张图片。

```javascript
const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "请描述这张图，并指出里面最重要的三个信息。",
        },
        {
          type: "image_url",
          image_url: {
            url: "https://example.com/dashboard.png",
          },
        },
      ],
    },
  ],
});

console.log(response.choices[0].message.content);
```

如果图片在本地，可以把它转成 Base64，再作为 Data URL 传入：

```javascript
import { readFile } from "node:fs/promises";

const imageBuffer = await readFile("screenshot.png");
const base64Image = imageBuffer.toString("base64");

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "这张截图里的报错可能是什么原因？" },
        {
          type: "image_url",
          image_url: {
            url: `data:image/png;base64,${base64Image}`,
          },
        },
      ],
    },
  ],
});

console.log(response.choices[0].message.content);
```

这种调用适合处理截图分析、图表解读、设计稿反馈、资料整理等任务。它和图像生成不同：这里不是让模型画图，而是让模型读取图片并回答问题。

### 使用国内模型

国内模型大多兼容 OpenAI 格式，只需要换 baseURL：

```javascript
// DeepSeek
const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// 通义千问
const qwen = new OpenAI({
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.QWEN_API_KEY,
});

// 用法和 OpenAI 完全一样
const response = await deepseek.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "你好" }],
});
```

## 方式二：用 fetch 直接调用

如果你不想装 SDK，或者想理解底层原理，可以直接发 HTTP 请求：

```javascript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [{ role: "user", content: "用一句话解释什么是 API。" }],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

SDK 和 fetch 的关系：SDK 是对 fetch 的封装。理解 fetch 能帮你理解 SDK 在做什么，但日常开发用 SDK 更方便。

## 推理模式

推理模型（如 o1、o3）在回答之前会进行内部思考。这个过程会消耗额外的 token，但能显著提升复杂任务的表现。

### 基本用法

```javascript
const response = await client.chat.completions.create({
  model: "o3",
  messages: [
    { role: "user", content: "分析这段代码的时间复杂度，并给出优化方案" }
  ],
});

console.log(response.choices[0].message.content);
```

推理模型会自动进行内部推理，你不需要额外配置。

### 控制推理深度

通过 `reasoning_effort` 参数，你可以控制模型推理的深度：

```javascript
const response = await client.chat.completions.create({
  model: "o3",
  reasoning_effort: "medium",  // low / medium / high
  messages: [
    { role: "user", content: "解释快速排序的时间复杂度" }
  ],
});
```

- `low`：快速推理，适合简单问题。
- `medium`：平衡推理深度和速度（默认）。
- `high`：深度推理，适合复杂问题，但消耗更多 token。

> 提醒：推理模型的 token 价格通常更高。对于简单任务，用普通模型（如 gpt-4o）更划算。

## 生成参数

模型生成文本时，有几个参数可以控制输出的特性。这些参数不影响模型"理解"问题的能力，但会影响它"怎么回答"。

### temperature

`temperature` 控制输出的随机性，取值范围通常是 0 到 2。

- **低 temperature（如 0）**：输出更确定、更集中。每次问同样的问题，得到的回答会很相似。适合需要一致性和准确性的场景，比如代码生成、数据提取。
- **高 temperature（如 0.8）**：输出更随机、更多样。适合创意写作、头脑风暴等需要多样性的场景。

```javascript
// 低 temperature：确定性输出
const response = await client.chat.completions.create({
  model: "gpt-4o",
  temperature: 0,
  messages: [{ role: "user", content: "写一个计算斐波那契数列的函数" }],
});

// 高 temperature：创意输出
const response = await client.chat.completions.create({
  model: "gpt-4o",
  temperature: 0.8,
  messages: [{ role: "user", content: "写一首关于编程的诗" }],
});
```

### top_p

`top_p`（nucleus sampling）是另一种控制随机性的方式。它从概率最高的词开始累加，直到累积概率达到 `top_p`，然后只从这些词中选择。

- `top_p = 1`：考虑所有可能的词（默认行为）。
- `top_p = 0.9`：只从累积概率前 90% 的词中选择，过滤掉最不可能的词。

```javascript
const response = await client.chat.completions.create({
  model: "gpt-4o",
  top_p: 0.9,
  messages: [{ role: "user", content: "解释量子计算" }],
});
```

> 提醒：通常不需要同时调整 `temperature` 和 `top_p`。选择其中一个调整即可。大多数情况下，使用默认值就好。

### 什么时候需要调整这些参数？

大多数应用场景下，默认参数就够用了。以下是一些可能需要调整的场景：

- **需要高度一致的输出**：把 `temperature` 设为 0。适合代码生成、格式化输出、数据提取。
- **需要创意多样性**：适当提高 `temperature`（如 0.7-0.9）。适合创意写作、生成多种方案。
- **需要过滤低概率输出**：降低 `top_p`（如 0.9）。适合需要输出更"安全"的场景。

> 提醒：Agent 框架通常会帮你管理这些参数，你不需要手动设置。但理解这些参数有助于你调试 Agent 的行为——如果 Agent 的输出太随机或太死板，你可能需要调整这些参数。

## Token 管理与成本

API 调用按 Token 计费。Token 是模型处理文本的最小单位，英文大约 1 个单词 ≈ 1 个 Token，中文大约 1 个字 ≈ 1.5-2 个 Token。

控制成本的方法：

- **控制输入长度**：只给必要的上下文，不要把整本书塞进去。
- **控制输出长度**：用 max_tokens 参数限制回复长度。
- **监控消耗**：API 返回里包含 usage 字段。

```javascript
const response = await client.chat.completions.create({
  model: "gpt-4o",
  max_tokens: 500, // 限制输出长度
  messages: [{ role: "user", content: "简要介绍 JavaScript。" }],
});

console.log(`输入: ${response.usage.prompt_tokens} tokens`);
console.log(`输出: ${response.usage.completion_tokens} tokens`);
console.log(`总计: ${response.usage.total_tokens} tokens`);
```

不同模型价格差异很大。简单任务用便宜模型（如 gpt-4o-mini），复杂任务再用贵的模型。

## Embedding API：文本转向量

Embedding 把文本转换成一组数字（向量），用于语义搜索、聚类、相似度比较。这是 RAG 的基础。

```javascript
const embedding = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: "什么是机器学习？",
});

console.log(embedding.data[0].embedding); // 一个 1536 维的向量
console.log(embedding.usage.total_tokens); // 消耗的 Token 数
```

批量处理多段文本：

```javascript
const texts = [
  "什么是机器学习？",
  "深度学习和机器学习有什么区别？",
  "今天天气真好。",
];

const embeddings = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: texts,
});

// 返回的向量数组，可以用于相似度计算
for (const item of embeddings.data) {
  console.log(`文本 ${item.index}: ${item.embedding.slice(0, 5)}...`);
}
```

计算两个向量的余弦相似度：

```javascript
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

const emb1 = embeddings.data[0].embedding;
const emb2 = embeddings.data[1].embedding;
const emb3 = embeddings.data[2].embedding;

console.log(cosineSimilarity(emb1, emb2)); // 接近 1（语义相似）
console.log(cosineSimilarity(emb1, emb3)); // 接近 0（语义无关）
```

“什么是机器学习”和“深度学习和机器学习有什么区别”的相似度会很高，因为它们讨论的是相关话题。而“今天天气真好”和前两个的相似度会很低。

## Image API：图像生成

用代码调用图像生成 API：

```javascript
const image = await client.images.generate({
  model: "gpt-image-1",
  prompt: "一只橘猫坐在书桌上，旁边有一杯咖啡，水彩画风格",
  size: "1024x1024",
});

console.log(image.data[0].url); // 生成图片的 URL
```

图片通常以 URL 返回，你可以下载保存：

```javascript
const imageUrl = image.data[0].url;
const buffer = await fetch(imageUrl).then((r) => r.arrayBuffer());
await fs.writeFile("cat.png", Buffer.from(buffer));
```

用参考图进行编辑（Image Edit）：

```javascript
const edit = await client.images.edit({
  model: "gpt-image-1",
  image: fs.createReadStream("original.png"),
  prompt: "把背景换成海滩",
});
```

> 提醒：图像生成 API 的成本比文本 API 高得多。生成一张图的费用可能是几百次文本对话的总和。开发调试时用小尺寸，确认效果后再用大尺寸。

## Audio API：语音识别

语音识别（ASR）的输入是音频文件，输出是文字。常见用途包括会议纪要、播客转写、视频字幕、语音笔记整理。

用 Whisper 转写音频：

```javascript
import fs from "node:fs";

const transcript = await client.audio.transcriptions.create({
  model: "whisper-1",
  file: fs.createReadStream("meeting.mp3"),
  language: "zh",
});

console.log(transcript.text);
```

如果你想直接得到字幕格式，可以指定 `response_format`：

```javascript
const subtitles = await client.audio.transcriptions.create({
  model: "whisper-1",
  file: fs.createReadStream("meeting.mp3"),
  language: "zh",
  response_format: "srt",
});

console.log(subtitles);
```

语音识别的结果通常还需要后处理。比如分段、加标点、区分说话人、提取行动项，这些步骤可以继续交给文本模型完成。

## Function Calling：让模型调用函数

Function Calling 让模型能调用你定义的函数。这是 Agent “使用工具”的底层实现。

### 第一步：定义函数的 Schema

```javascript
const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "获取指定城市的天气信息",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "城市名称，如'北京'" },
        },
        required: ["city"],
      },
    },
  },
];
```

### 第二步：发送请求，处理函数调用

```javascript
const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "北京今天天气怎么样？" }],
  tools,
});

const message = response.choices[0].message;

if (message.tool_calls) {
  const toolCall = message.tool_calls[0];
  const args = JSON.parse(toolCall.function.arguments);

  // 执行你自己的函数
  const result = await getWeather(args.city);

  // 把结果发回给模型
  const finalResponse = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "user", content: "北京今天天气怎么样？" },
      message,
      { role: "tool", tool_call_id: toolCall.id, content: JSON.stringify(result) },
    ],
    tools,
  });

  console.log(finalResponse.choices[0].message.content);
}
```

整个流程：用户提问 → 模型决定调用函数 → 你执行函数 → 把结果返回 → 模型生成最终回答。

这就是 Agent “使用工具”的底层实现。当你理解了这个流程，再回头看 Agent 的 Tool Use 和 Loop，就会明白它们是怎么工作的。

## 错误处理

API 调用可能失败。SDK 内置了一些重试机制，但你仍然需要处理异常：

```javascript
import OpenAI from "openai";

const client = new OpenAI({ maxRetries: 3 });

try {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "你好" }],
  });
  console.log(response.choices[0].message.content);
} catch (error) {
  if (error.status === 429) {
    console.error("请求太频繁，稍后再试");
  } else if (error.status === 401) {
    console.error("API Key 无效");
  } else {
    console.error(`请求失败: ${error.message}`);
  }
}
```

常见错误：

- **429 Too Many Requests**：被限流了，SDK 会自动重试（指数退避）。
- **401 Unauthorized**：API Key 无效或过期。
- **500 Server Error**：服务端出错，通常重试就好。

## 小结

- SDK 封装了底层细节，推荐在正式项目中使用。fetch 调用帮你理解底层原理。
- 国内模型大多兼容 OpenAI 格式，换 baseURL 就行。
- 推理模型会自动进行内部思考，`reasoning_effort` 参数控制推理深度。
- 流式传输让前端可以逐字显示结果，改善用户体验。
- `temperature` 和 `top_p` 控制输出的随机性，大多数情况下使用默认值即可。
- Token 决定了成本，控制输入输出长度是基本功。
- Embedding API 把文本变成向量，是 RAG 和语义搜索的基础。
- 支持视觉输入的模型可以通过 Chat Completions 接收图片，用于截图分析、图表解读和设计反馈。
- Image API 调用图像生成，成本比文本 API 高得多。
- Audio API 可以用 Whisper 把语音转成文字，再交给文本模型做整理和总结。
- Function Calling 是 Agent “使用工具”的底层实现。

## 练习

1. 用 OpenAI SDK 写一个最简单的调用：发一条消息，打印回复。
2. 用 Embedding API 把三段文本转成向量，计算它们两两之间的余弦相似度。
3. 用 Chat Completions 传入一张截图，让模型解释截图里的主要信息。
4. 用 Image API 生成一张图片，保存到本地。
5. 用 Whisper 转写一段短音频，再让文本模型总结成三条要点。
6. 实现一个完整的 Function Calling 流程：定义一个“查询股票价格”的函数，让模型在用户问到股票时自动调用它。

## 延伸阅读

- [RAG 技术详解：向量检索与混合搜索](../reference/rag-deep-dive.md)
- [同步与异步 Sync & Async](../reference/glossary/sync-async.md)
- [编码与字符集 Encoding & Charset](../reference/glossary/encoding-and-charset.md)
