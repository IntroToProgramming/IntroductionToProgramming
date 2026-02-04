# 练习答案与提示

> 说明：以下为参考答案/提示，不是唯一解。为了保持可读性，示例代码尽量短，省略了异常处理。

## 第二章 计算

**练习 1：懒求值下的乘法次数**

`pow5(x)` 展开是 `x*x*x*x*x`，需要 4 次乘法。如果参数不先求值，每一次出现都会重新计算。

设 `M(n)` 表示 `pow5` 嵌套 n 次的乘法次数：

* `M(1) = 4`
* `M(n) = 4 + 5 * M(n-1)`

因此：`M(2)=24`，`M(3)=124`，`M(4)=624`。

**练习 2：强制求值的问题**

* 可能做很多无用计算（性能浪费）。
* 不能处理“无穷序列/无穷结构”。
* 即使分支不会被用到，也提前执行（丢失短路优势）。
* 如果参数包含副作用，提前执行会改变行为。

## 第三章 过程

**阶乘（循环/递归/尾递归）**

```javascript
function fact(n) {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}

function factRec(n) {
    return n <= 1 ? 1 : n * factRec(n - 1);
}

function factTail(n, acc = 1) {
    return n <= 1 ? acc : factTail(n - 1, acc * n);
}
```

**斐波那契（循环/递归/尾递归）**

```javascript
function fib(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}

function fibRec(n) {
    return n <= 1 ? n : fibRec(n - 1) + fibRec(n - 2);
}

function fibTail(n, a = 0, b = 1) {
    return n === 0 ? a : fibTail(n - 1, b, a + b);
}
```

**短路求值说明**

`condition ? expr1 : expr2` 只会计算其中一个分支。
所以当 `y == 1` 时，`pow(x, y-1) * x` 不会被执行。

**顺序/分支/循环的现实过程**

示例：

* 顺序：起床 → 洗漱 → 早餐。
* 分支：是否下雨？下雨带伞，否则不带。
* 循环：刷牙 2 分钟（重复动作）。

## 第四章 编码

**小数的表示**

`1/3` 在十进制是无限循环小数，到了二进制依然是无限循环。IEEE 754 用“符号位 + 指数 + 尾数”近似表示，所以会出现精度误差。

可以用 `0.1 + 0.2` 观察误差：

```javascript
0.1 + 0.2; // 0.30000000000000004
```

## 第五章 序列

**LCS 提示**

经典解法是动态规划：

```
if a[i-1] == b[j-1] => dp[i][j] = dp[i-1][j-1] + 1
else => dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

这要求你能“多次访问任意位置”，所以在 C++ 中至少需要 Random Access 迭代器。

## 第六章 数据

**sumList**

```javascript
function sumList(list) {
    let sum = 0;
    for (let p = list; p !== null; p = p.next) sum += p.value;
    return sum;
}
```

**filterList**

```javascript
function filterList(list, pred) {
    if (list === null) return null;
    if (pred(list.value)) {
        return { value: list.value, next: filterList(list.next, pred) };
    }
    return filterList(list.next, pred);
}
```

**树遍历**

参考正文中的 `preorder/inorder/postorder`。

**DFS/BFS**

参考正文中的 `dfs/bfs`，DFS 使用栈，BFS 使用队列。

## 第七章 状态

**计数器**

```javascript
let counter = {
    value: 0,
    inc() { this.value += 1; },
    dec() { this.value -= 1; }
};
```

**电梯状态机**

状态示例：`idle / up / down / open`，转移规则取决于请求队列。

**move**

```javascript
function move(point, dx, dy) {
    return { x: point.x + dx, y: point.y + dy };
}
```

**共享状态与库存示例（提示）**

把“读库存 + 减库存”拆成两步，再用 `await` 人为制造切换点，就能看到负库存或丢失更新的情况：

```javascript
let stock = 1;
async function buy() {
    let current = stock;
    await Promise.resolve();
    stock = current - 1;
}
```

## 第八章 引用

**数组输出**

`a` 和 `b` 指向同一数组，`c` 是浅拷贝：

```javascript
// 输出：
// a: [1, 2, 3]
// b: [1, 2, 3]
// c: [1, 2]
```

**cloneUser（浅拷贝）**

```javascript
const cloneUser = user => ({ ...user });
```

**freeze 示例**

```javascript
let obj = Object.freeze({ x: 1 });
obj.x = 2;
obj.x; // 1
```

**共享尾部链表（提示）**

两个链表可以共用同一个尾节点：

```javascript
let tail = node(3, null);
let listA = node(1, node(2, tail));
let listB = node(9, tail);
```

优点：节省内存；风险：修改共享节点会影响两条链表。

## 第九章 闭包

**makeOnce**

```javascript
function makeOnce(fn) {
    let called = false;
    return function (...args) {
        if (called) return;
        called = true;
        return fn(...args);
    };
}
```

**makeTimer**

```javascript
function makeTimer() {
    const start = Date.now();
    return () => Date.now() - start;
}
```

**outer()() 为什么能输出**

因为返回的函数闭包捕获了 `msg`，即使 `outer` 结束了，`msg` 仍然可访问。

## 第十章 对象

**Animal / Dog / Cat**

```javascript
class Animal {
    speak() { console.log('...'); }
}
class Dog extends Animal {
    speak() { console.log('woof'); }
}
class Cat extends Animal {
    speak() { console.log('meow'); }
}
```

**feed**

```javascript
function feed(animal) {
    animal.eat();
}
```

**组合 move + draw**

```javascript
let canMove = { move() { console.log('move'); } };
let canDraw = { draw() { console.log('draw'); } };
let sprite = Object.assign({}, canMove, canDraw);
```

## 第十一章 并发

**修复银行竞态（队列化）**

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

**顺序打印 1/2/3**

```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function () {
    for (let i = 1; i <= 3; i++) {
        await delay(1000);
        console.log(i);
    }
})();
```

**任务队列（提示）**

把每个任务包装成返回 Promise 的函数，然后用一个“串行链”依次执行。
