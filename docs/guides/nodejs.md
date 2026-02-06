---
description: 安装 Node.js，并在本地运行 JavaScript。
---

# 安装 Node.js 并在 VS Code 运行 JavaScript

## 你将学到什么

- 安装 Node.js（推荐 LTS 版本）
- 验证 Node.js 与 npm 是否可用
- 在 VS Code 终端运行 JavaScript 文件

## 安装 Node.js

1. 打开 Node.js 官网下载页，选择 LTS 版本。
2. 按提示完成安装。
3. 安装后先关闭并重新打开终端。

## 验证是否安装成功

在终端里分别输入：

```bash
node -v
npm -v
```

如果能看到版本号，说明安装完成。

## 运行你的第一个本地脚本

1. 用 VS Code 打开一个文件夹。
2. 新建 `hello.js`，写入：

```javascript
console.log("hello from node");
```

3. 打开 VS Code 内置终端。
4. 在终端中运行：

```bash
node hello.js
```

看到输出就成功了。

## 常见问题

- `node` 命令不存在：关闭并重开终端，或重新安装 Node.js。
- 没看到输出：确认终端所在目录与 `hello.js` 在同一文件夹。

## 官方文档入口

- [Node.js 下载页面](https://nodejs.org/en/download/)
- [Node.js 官方使用文档](https://nodejs.org/en/learn/)
- [VS Code 的 Node.js 教程](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)

（需要深入时再查即可。）
