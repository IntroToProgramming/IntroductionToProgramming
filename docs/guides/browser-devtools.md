---
description: 学会打开浏览器开发者工具（Inspector/DevTools），并使用 Console 作为 REPL。
---

# 浏览器开发者工具与 Console

## 你将学到什么

- 打开浏览器开发者工具（Inspector/DevTools）
- 进入 Console 并执行 JavaScript
- 用 Console 做最小实验与排错

## 第一次打开开发者工具

下面以 Chrome / Edge 为例，其他浏览器入口相近：

1. 在网页空白处右键，选择“检查 / Inspect”。
2. 或者使用快捷键：
   - Windows / Linux：`F12` 或 `Ctrl + Shift + I`
   - macOS：`Cmd + Option + I`
3. 打开后，点击顶部的 “Console（控制台）” 标签。

如果你只想直接打开 Console：

- Windows / Linux：`Ctrl + Shift + J`
- macOS：`Cmd + Option + J`

Firefox 的快捷键略有不同：`Ctrl + Shift + K`（macOS 为 `Cmd + Option + K`）。

## 把 Console 当作一个 REPL

REPL 就是“输入一行，马上看到结果”。你可以从这几步开始：

1. 输入 `2 + 2`，按 Enter。
2. 输入 `document.title`，查看当前网页标题。
3. 输入 `console.log('hello')`，看输出信息。
4. 需要多行时，用 `Shift + Enter` 换行，最后再按 Enter 执行。

Console 里运行的代码只影响当前页面，刷新页面就会恢复原状。

## 常见问题

- 看不到 Console：先确认 DevTools 已打开，再切到 Console 标签。
- 输入没有反应：确认光标在 Console 内，按 Enter 执行。
- 看到红色报错：通常是代码错误，不会“弄坏”你的电脑或浏览器。

## 什么时候会用到它

- 快速试验一段代码
- 查看程序输出或报错
- 理解网页上发生了什么

## 官方文档入口

- [Chrome DevTools 打开方式](https://developer.chrome.com/docs/devtools/open)
- [Chrome DevTools Console 使用说明](https://developer.chrome.com/docs/devtools/console/)
- [Edge DevTools 快捷键](https://learn.microsoft.com/microsoft-edge/devtools/shortcuts/)
- [Firefox Web Console 使用说明](https://firefox-source-docs.mozilla.org/devtools-user/web_console/)

（需要更深入时，再去阅读这些官方资料即可。）
