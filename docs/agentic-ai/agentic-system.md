# Agent 机制与构建（Agentic System）

前面几章，我们一直在和 AI "对话"。这一章，我们要进入一个新层次：让 AI 自己行动。

Agent 不是"更聪明的聊天机器人"。它的核心差别在于：它能在后台自主执行多步操作，而不需要你每一步都确认。

要真正理解 Agent，你需要知道它内部是怎么运转的。

## Agent 内部机制：Loop、Run、Snapshot

### Loop：感知→思考→行动→观察

Agent 的核心是一个循环（Loop）。每一轮循环包含四个步骤：

1. **感知（Perceive）**：读取当前状态——用户说了什么、环境是什么样、上一步的结果是什么。
2. **思考（Think）**：分析当前状态，决定下一步该做什么。
3. **行动（Act）**：执行一个具体操作——调用工具、写文件、发请求。
4. **观察（Observe）**：检查行动的结果，更新状态。

然后回到第 1 步，开始下一轮循环。直到任务完成或遇到无法继续的情况。

用伪代码表示：

```text
while (任务未完成) {
  当前状态 = 感知()
  下一步 = 思考(当前状态)
  结果 = 行动(下一步)
  更新状态(结果)
}
```

这个循环可能执行 3 次，也可能执行 30 次。每次循环都是一次"试错+调整"的过程。

### Run：一次完整的任务执行

Run 是指从接收任务到完成（或失败）的整个过程。一次 Run 包含多轮 Loop。

比如你让 Agent "帮我整理今天的会议纪要"，一次 Run 可能是：

- Loop 1：读取会议录音文件。
- Loop 2：调用语音转文字工具。
- Loop 3：提取关键信息和待办事项。
- Loop 4：格式化输出。
- Loop 5：写入文件。

每一轮 Loop 都在推进任务，直到最终完成。

### Snapshot：上下文快照

Agent 在执行过程中，需要记住很多东西：用户的需求、已经做了什么、中间结果是什么。这些信息的集合就是一个快照（Snapshot）。

Snapshot 的作用：

- **上下文恢复**：如果 Agent 中断了（比如网络问题），可以从 Snapshot 恢复，不需要从头开始。
- **回退**：如果某一步做错了，可以回退到之前的 Snapshot。
- **调试**：你可以查看每个 Snapshot，理解 Agent 的决策过程。

## Tool Use：让 AI 真的"动手"

Agent 的核心能力是工具使用（Tool Use）。没有工具，Agent 就只是一个聊天机器人。

常见工具：

- **文件系统**：读写文档、整理资料。
- **终端命令**：跑脚本、执行构建、安装依赖。
- **外部 API**：拉取数据、调用服务、发送通知。
- **浏览器**：访问网页、提取信息。

当你告诉 Agent "帮我把这段代码跑一下"，它不是在"模拟"运行，而是真的调用了终端执行命令。

一个工具调用的过程：

```text
Agent 决定需要调用什么工具
  → 构造工具调用的参数
  → 执行工具
  → 获取结果
  → 基于结果决定下一步
```

> 提醒：工具权限要最小化。能不开放的，就先不开放。你不会给实习生无限的公司权限，同理，Agent 的工具权限也需要控制。

## MCP：模型与外部世界的统一接口

当多个工具与多个应用要互通时，就需要标准协议。

MCP（Model Context Protocol）是一个开放协议，目标是让模型能够稳定地理解与调用外部上下文。

它的核心价值是标准化：

- 你不需要为每个工具写专门的适配代码。
- 你只需要遵守一种"标准对话格式"。
- 新工具接入时，Agent 自动就能理解和使用。

打个比方：USB 是硬件的统一接口，MCP 是软件的统一接口。你不需要知道 U 盘内部怎么工作，插上就能用。MCP 让 Agent 对工具也是这种体验。

```text
没有 MCP：为每个工具写专门的代码 → 维护成本高
有了 MCP：工具按标准格式描述 → Agent 自动理解和调用
```

## 权限模型：Ask、Skip、Deny

当 Agent 在后台自主执行时，一个关键问题是：哪些操作需要你确认？

一个常见的权限模型是三级：

- **Ask（询问）**：执行前必须得到你的确认。适用于不可逆操作——删除文件、发送邮件、发布代码。
- **Skip（跳过）**：不需要确认，直接执行。适用于低风险操作——读取文件、运行测试、格式化代码。
- **Deny（禁止）**：不允许执行。适用于高风险操作——访问敏感目录、执行危险命令。

配置权限的原则：

- **默认保守**：不确定的操作，默认 Ask。
- **逐步放开**：用熟了之后，把高频低风险操作改为 Skip。
- **永远禁止**：某些操作永远不该自动执行，保持 Deny。

```text
读取文件 → Skip（低风险，直接执行）
运行测试 → Skip（低风险，直接执行）
修改代码 → Ask（中风险，确认后执行）
删除文件 → Ask（高风险，确认后执行）
格式化硬盘 → Deny（永远不允许）
```

## 安全意识

Agent 能"动手"意味着它也可能"犯错"。安全不是事后补救，而是从一开始就该考虑的事情。

### 零信任

不要默认 Agent 的输出都是对的。尤其是：

- 代码：AI 生成的代码可能有 bug，也可能有安全漏洞。
- 建议：AI 给出的操作建议可能不适合你的具体场景。
- 信息：AI 可能基于过时或错误的信息做出判断。

原则：永远验证，永远不盲信。

### 数据脱敏

敏感信息不该直接喂给 Agent：

- 密码、密钥、Token。
- 个人隐私数据（身份证号、手机号等）。
- 公司内部机密。

如果必须涉及敏感数据，先做脱敏处理——用占位符替代真实值。

### 权限边界

上一节讲的权限模型，本质上就是在划定安全边界。Agent 能做什么、不能做什么，需要明确。

一个实用的原则：Agent 的权限应该小于你的权限。它不需要知道所有事情，也不需要能做所有事情。

## 动手练习：实现一个简单的 Agent Harness

现在，我们动手实现一个最简单的 Agent Harness（Agent 运行框架）。不需要复杂的框架，用最基础的代码就能理解 Agent 的核心机制。

### 目标

用 JavaScript 实现一个简化版的 Agent Loop：接收用户指令 → 思考 → 调用工具 → 观察结果 → 循环直到完成。

### 第一步：定义工具

```javascript
// 工具注册表
const tools = {
  read_file: (params) => {
    // 模拟读取文件
    return `文件内容: ${params.path} 的内容`;
  },
  write_file: (params) => {
    // 模拟写入文件
    return `已写入文件: ${params.path}`;
  },
  run_command: (params) => {
    // 模拟执行命令
    return `命令执行结果: ${params.command} 的输出`;
  },
};
```

### 第二步：实现 Loop

```javascript
function agentLoop(task, maxIterations = 10) {
  let state = { task, history: [], result: null };

  for (let i = 0; i < maxIterations; i++) {
    // 感知：获取当前状态
    const context = buildContext(state);

    // 思考：决定下一步（这里用简单规则模拟，实际会调用 LLM）
    const nextAction = plan(context);

    if (nextAction.type === "done") {
      state.result = nextAction.output;
      break;
    }

    // 行动：调用工具
    const toolResult = tools[nextAction.tool](nextAction.params);

    // 观察：更新状态
    state.history.push({
      action: nextAction,
      result: toolResult,
    });
  }

  return state.result;
}
```

### 第三步：运行

```javascript
const result = agentLoop("读取 config.json 并写入备份");
console.log(result);
```

这个实现非常简化，但它展示了 Agent 的核心逻辑：循环执行，直到完成。真正的 Agent Harness 会在这个基础上加入 LLM 调用、权限检查、错误处理、Snapshot 管理等。

练习：试着扩展这个实现——加入权限检查（Ask/Skip/Deny）、加入错误处理、加入 Snapshot 保存。

## 小结

- Agent 的核心机制是 Loop（感知→思考→行动→观察），一次 Run 包含多轮 Loop。
- Tool Use 让 Agent 从"能想"变成"能做"。
- MCP 是工具的统一接口标准，降低集成成本。
- 权限模型（Ask/Skip/Deny）控制 Agent 能做什么、不能做什么。
- 安全意识：零信任、数据脱敏、最小权限。
- 动手实现 Agent Harness 是理解 Agent 机制的最好方式。

## 练习

1. 用你熟悉的编程语言，实现一个简化版的 Agent Loop（参考上面的代码）。
2. 为你实现的 Agent 加入权限检查：哪些工具调用需要确认，哪些可以直接执行。
3. 思考一个你日常工作中的重复任务，设计一个 Agent 工作流来自动化它。画出流程图，标注每一步需要什么工具。

## 延伸阅读

- [同步与异步 Sync & Async](../reference/glossary/sync-async.md)
- [进程与线程 Process & Thread](../reference/glossary/process-and-thread.md)
- [事务 Transaction](../reference/glossary/transaction.md)
