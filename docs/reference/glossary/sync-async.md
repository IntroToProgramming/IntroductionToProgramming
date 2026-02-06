# 同步与异步（Sync & Async）

## 同步（Synchronous）

同步表示“按顺序执行”：上一件事没完成，下一件事就不能开始。

```javascript
console.log('A');
console.log('B');
```

这两句一定按顺序输出。

## 异步（Asynchronous）

异步表示“先登记，稍后回来处理”。

```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
```

输出顺序通常是：A C B。

## 容易混淆的点

* 同步/异步说的是“什么时候拿到结果”。
* 阻塞/非阻塞说的是“等待时能不能干别的事”。

二者不同，但经常同时出现。

## 进一步阅读

理解同步/异步有助于你理解事件循环、Promise 和并发问题。
