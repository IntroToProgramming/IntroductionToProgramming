# 闭包

闭包（Closure）是 JavaScript 里最重要、也最容易被误解的概念之一。

一句话定义：**闭包是“函数 + 它捕获的外部变量”**。

## 词法作用域

JavaScript 采用词法作用域（Lexical Scope）：变量的可见范围由“写代码的位置”决定，而不是“运行时的位置”。

这意味着：内部函数可以访问外部函数里的变量。

```javascript
function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

let add10 = makeAdder(10);
add10(3); // 13
```

这里 `add10` 这个函数里，依然能访问 `x`，即使 `makeAdder` 已经执行完毕。

这个“仍然能访问”的能力，就是闭包。

### 扩展阅读：用闭包模拟对象（可跳过）

只用函数也可以模拟“对象 + 方法 + 封装”。比如构造一个“有序对”：

```javascript
function pair(left, right) {
    return fn => fn(left, right);
}

function left(a, b) {
    return a;
}

function right(a, b) {
    return b;
}

let p = pair(1, 2);
p(left);  // 1
p(right); // 2
```

`pair` 的内部数据并没有直接暴露出来，只能通过 `left` / `right` 访问，这就是“封装”的味道。

## 用闭包保存状态

闭包最常见的用法是“封装状态”：

```javascript
function makeCounter() {
    let count = 0;
    return function () {
        count += 1;
        return count;
    };
}

let counter = makeCounter();
counter(); // 1
counter(); // 2
```

`count` 是私有变量，只能通过闭包访问，这就是“私有状态”的来源。

## 闭包与回调

很多回调函数依赖外部变量，这也是闭包的体现：

```javascript
function repeat(message) {
    setTimeout(function () {
        console.log(message);
    }, 1000);
}
```

`setTimeout` 执行时，`repeat` 已经结束了，但 `message` 仍然可用。

## 闭包与模块

闭包可以用来“封装私有变量”，形成简单的模块：

```javascript
function createStore() {
    let data = {};
    return {
        set(key, value) { data[key] = value; },
        get(key) { return data[key]; }
    };
}

let store = createStore();
store.set('x', 10);
store.get('x'); // 10
```

这里的 `data` 只有 `set/get` 能访问，这就是“私有状态”。

## 闭包与生命周期

闭包会“延长”被捕获变量的生命周期：只要闭包还存在，这些变量就不会被回收。

这通常很有用，但也可能造成内存占用：

```javascript
function holdBigData() {
    let big = new Array(1000000).fill(0);
    return () => big.length;
}

let f = holdBigData(); // big 被一直保留
```

因此，闭包不是问题本身，**不释放的引用**才是问题。

## 常见陷阱：循环与 var

```javascript
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(function () {
        console.log(i);
    });
}

funcs[0](); // 3
funcs[1](); // 3
funcs[2](); // 3
```

因为 `var` 没有块级作用域，三个函数共享同一个 `i`。

解决方式有两种：

```javascript
// 方式一：用 let
for (let i = 0; i < 3; i++) {
    funcs.push(function () { console.log(i); });
}

// 方式二：用立即执行函数
for (var i = 0; i < 3; i++) {
    (function (x) {
        funcs.push(function () { console.log(x); });
    })(i);
}
```

## 小结

闭包让函数具有“记忆”，也是对象、模块、异步回调的基础。

下一章的“对象”，很多时候可以看作“闭包 + 约定”。

## 练习

* 写一个 `makeOnce(fn)`，让 `fn` 只能执行一次。
* 写一个 `makeTimer()`，返回一个函数，每次调用返回距离创建时的毫秒数。
* 解释为什么下面的代码能正常输出 `hello`：

```javascript
function outer() {
    let msg = 'hello';
    return function () { console.log(msg); };
}

outer()();
```

## 延伸阅读

* [词法作用域 Lexical Scope](../reference/lexical-scope.md)
* [垃圾回收 Garbage Collection](../reference/garbage-collection.md)
