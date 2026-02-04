# 序列化（Serialization）

序列化是把内存中的对象变成“可传输/可存储”的格式（通常是字符串或字节流）。

## 为什么需要

* 网络传输
* 保存到磁盘
* 跨进程通信

## JavaScript 中的常见方式

```javascript
let obj = { x: 1, y: 2 };
let text = JSON.stringify(obj); // 序列化
let obj2 = JSON.parse(text);    // 反序列化
```

## 常见限制

* JSON 不支持函数、`undefined`、循环引用。
* 日期对象会变成字符串。

## 进一步阅读

序列化是“程序之间交流”的基础。
