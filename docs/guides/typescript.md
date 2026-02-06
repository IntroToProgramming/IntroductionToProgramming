---
description: 安装 TypeScript，完成第一次编译与运行。
---

# TypeScript 入门：安装、编译与运行

## 你将学到什么

- 安装 TypeScript
- 编写第一个 `.ts` 文件
- 编译成 `.js` 并运行

## 前置条件

- 已安装 VS Code（见 [安装与上手 VS Code](./vscode.md)）
- 已安装 Node.js（见 [安装 Node.js 并在 VS Code 运行 JavaScript](./nodejs.md)）

## 安装 TypeScript

首次体验可以用“全局安装”，更简单；长期使用建议“项目内安装”。

**方式 A：全局安装（上手更快）**

```bash
npm install -g typescript
```

**方式 B：项目内安装（更推荐）**

```bash
npm init -y
npm install -D typescript
```

## 写下第一个 TypeScript 文件

新建 `hello.ts`，写入：

```typescript
const message: string = "hello from ts";
console.log(message);
```

## 编译并运行

全局安装时，直接运行：

```bash
tsc hello.ts
```

项目内安装时，使用：

```bash
npx tsc hello.ts
```

编译后会生成 `hello.js`，再运行：

```bash
node hello.js
```

## 常见问题

- `tsc` 命令找不到：先用 `npx tsc`，或确认是否全局安装成功。
- 没生成 `hello.js`：确认当前目录是否有写入权限。

## 官方文档入口

- [TypeScript 下载与安装](https://www.typescriptlang.org/download/)
- [TypeScript Handbook（从零开始）](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch)
- [VS Code 的 TypeScript 编辑支持说明](https://code.visualstudio.com/docs/typescript/typescript-editing)

（需要深入时再查即可。）
