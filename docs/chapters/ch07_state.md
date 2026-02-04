# 状态

程序中的很多数据是在不停变化的，比如时间、用户输入、网络请求结果、游戏中的位置和生命值。当一个可变对象发生变化时，我们就说它的**状态**发生了改变。

简单说：**数据是静态的，状态是“随时间变化的数据”。**

## 可变状态

最典型的状态就是变量：

```javascript
let count = 0;
count = count + 1; // 现在 count 的状态变了
```

`count` 在不同的时刻有不同的值，这就是状态的变化。

### 状态与副作用

如果一个函数会改变外部状态，我们就说它有“副作用”：

```javascript
let total = 0;
function add(x) {
    total += x; // 修改了外部状态
}
```

副作用并不“坏”，但它会让程序更难预测。所以很多设计会尽量把“计算逻辑”和“状态修改”分开。

## 共享状态与冲突

当多人（或多个任务）同时修改同一份状态，就会出现“冲突”。

例如一个账户余额：

```javascript
let balance = 1000;

function deposit(amount) {
    let current = balance;
    balance = current + amount;
}

function withdraw(amount) {
    let current = balance;
    balance = current - amount;
}
```

如果两个操作“交错执行”，可能出现意外结果：

```
balance = 1000
A: 读到 1000
B: 读到 1000
A: 写回 1200
B: 写回 800
最终：800（丢失了一次更新）
```

这类问题叫**竞态条件**。它很难排查，因为结果依赖“执行顺序”。

> 提醒：即使 JavaScript 是单线程，只要出现异步切换（`await` / 回调），也会发生类似“交错执行”。

### 为什么尽量避免共享状态？

* 结果依赖时序，难测试、难复现。
* 一个地方的修改，会影响所有“别名”。
* 并发或异步时容易出现竞态。
* 代码读起来不清楚“谁在改”。

## 不可变更新

一种常见的对策是**不直接修改原对象**，而是创建一个新对象：

```javascript
let user = { name: 'Kimmy', age: 18 };
let updated = { ...user, age: 19 }; // 不修改原对象
```

这种方式叫“不可变更新”（Immutable Update）。它更安全，但会多创建一些对象。

> 提醒：`const` 只保证变量不变，不保证对象内容不变。

## 迭代器也是状态

迭代器之所以能“往前走”，就是因为它内部保存了当前位置：

```javascript
let iterator = {
    index: 0,
    next(arr) {
        if (this.index >= arr.length) return { done: true };
        return { value: arr[this.index++], done: false };
    }
};
```

这个 `index` 就是状态。每次 `next()` 都在改变它。

## 状态机

当一个系统只有有限种状态，并且可以在状态之间切换，我们就称它是**状态机**。

例如红绿灯：

```
红 -> 绿 -> 黄 -> 红 ...
```

用代码可以这样表达：

```javascript
let light = {
    state: 'red',
    next() {
        if (this.state === 'red') this.state = 'green';
        else if (this.state === 'green') this.state = 'yellow';
        else this.state = 'red';
    }
};
```

状态机特别适合描述“流程有明显阶段”的问题，比如登录流程、订单流程、游戏关卡等。

## 练习

* 写一个计数器对象 `counter`，包含 `inc()` 和 `dec()` 方法，并维护内部状态。
* 用状态机描述“电梯”的状态转换（例如：停靠、上行、下行、开门）。
* 设计一个函数 `move(point, dx, dy)`，返回移动后的新坐标，要求不修改原对象。
* 写一个“库存扣减”示例，说明共享状态在并发时可能出现负库存。

## 延伸阅读

* [不可变性 Immutability](../reference/immutability.md)
* [竞态条件 Race Condition](../reference/race-condition.md)
