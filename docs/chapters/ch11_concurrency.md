# 并发

并发（Concurrency）关注的是：**多个任务在时间上交错执行**。

它不等于并行（Parallelism）。并行是“同时在多个核心上执行”，并发则是“看起来在同时发生”。

## 竞态条件（Race Condition）

并发最常见的问题是竞态：多个任务读写同一份状态，结果取决于“谁先谁后”。

一个经典例子是账户余额：

```javascript
let balance = 1000;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deposit(amount) {
    let current = balance;
    await delay(10);
    balance = current + amount;
}

async function withdraw(amount) {
    let current = balance;
    await delay(10);
    balance = current - amount;
}

Promise.all([
    deposit(200),
    withdraw(200)
]).then(() => console.log(balance));
```

最终结果可能是 800 或 1200，取决于哪一个先写回。

这种“读取-修改-写回”的操作如果不是原子的，就会出现竞态。

## 原子性与临界区

`count = count + 1` 看起来是一步，其实包含“读取 + 计算 + 写回”三步。  
当多个任务交错执行时，增量可能丢失。

```javascript
let count = 0;

async function inc() {
    let current = count;
    await delay(0);
    count = current + 1;
}

Promise.all([inc(), inc()]).then(() => console.log(count)); // 可能是 1
```

这段代码里，`await` 让两个任务交错执行，导致“加 1”只发生了一次效果。
“必须连续执行、不能被打断”的那段代码就叫**临界区**。

## 常见解决思路

* **锁/互斥**：同一时间只能一个任务修改共享状态。
* **队列化**：把操作排队，按顺序执行。
* **不可变数据**：不改共享对象，而是产生新对象。
* **消息传递**：不共享内存，只传递消息（如 Worker）。

## 死锁（概念）

如果两个任务互相等待对方释放资源，就会永远卡住，这叫死锁。  
JavaScript 主线程很少直接写锁，但在多线程环境（或数据库事务）里这是典型问题。
你要记住的不是“死锁怎么写”，而是：**多个资源 + 相互等待 = 风险**。

## JavaScript 的并发模型

JavaScript 在浏览器和 Node.js 中都遵循“事件循环”模型：

* 代码在一个主线程上执行。
* 异步任务被放到队列中。
* 事件循环不断从队列里取任务执行。

### 宏任务与微任务（极简版）

* `setTimeout` 属于宏任务。
* `Promise.then` / `await` 的回调属于微任务。

```javascript
console.log('A');
setTimeout(() => console.log('B'));
Promise.resolve().then(() => console.log('C'));
console.log('D');

// 输出顺序：A D C B
```

### async/await

`async/await` 是 Promise 的语法糖，本质仍然是“任务队列 + 回调”。

## 在单线程里也会发生“并发问题”

即使只有一个线程，只要有异步切换点（`await`、回调），也会出现“交错执行”。

上面的银行例子就是典型。

一种简单的修复方法是**串行化**：

```javascript
async function runInOrder() {
    await deposit(200);
    await withdraw(200);
    console.log(balance);
}
```

如果任务很多，可以用一个“队列”把它们排起来：

```javascript
function createQueue() {
    let last = Promise.resolve();
    return function enqueue(task) {
        last = last.then(() => task()).catch(() => {});
        return last;
    };
}

let enqueue = createQueue();

enqueue(() => deposit(200));
enqueue(() => withdraw(200));
```

## 并行：Worker 里的消息传递

浏览器里可以用 Web Worker，Node.js 里有 Worker Threads。它们和主线程通过消息通信，避免共享内存带来的竞态。

这部分属于进阶内容，这里先记住一个原则：**能不共享就不共享**。

## 练习

* 修改上面的银行例子，让它在并发情况下仍然得到正确结果。
* 写一个 `delay(ms)`，然后用 `async/await` 顺序打印 1、2、3（每秒一个）。
* 写一个“任务队列”，保证多个异步任务按顺序执行。

## 延伸阅读

* [事件循环 Event Loop](../reference/event-loop.md)
* [竞态条件 Race Condition](../reference/race-condition.md)
* [死锁 Deadlock](../reference/deadlock.md)
