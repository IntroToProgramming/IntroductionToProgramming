# 引用

> 注：本文中提到的“引用”是广义概念，不仅仅指 JavaScript 里的“引用类型”。

在程序里，我们有两种常见的“东西”：

* **值**（Value）：比如数字、布尔值、字符串。
* **引用**（Reference）：指向某块数据的“地址”。

## 内存里发生了什么（极简版）

可以把内存想成一个大仓库：

* 小而简单的数据（例如数字）可以直接放在变量里。
* 复杂对象通常放在“仓库里”，变量里只放一个“门牌号”（引用）。

在 JavaScript 里，基本类型是“值语义”，对象/数组/函数是“引用语义”。

## 值语义 vs. 引用语义

看一个最简单的例子：

```javascript
let a = 1;
let b = a;

b = 2;
a; // 1
```

`a` 和 `b` 是两个独立的值，互不影响。

再看对象：

```javascript
let obj1 = { x: 1 };
let obj2 = obj1;

obj2.x = 2;
obj1.x; // 2
```

`obj1` 和 `obj2` 实际上指向同一份数据，这就叫“引用语义”。当两条变量指向同一块数据时，它们就成了**别名**（alias）。

## 引用的作用

引用让我们可以**共享大型结构**，避免频繁复制。例如一个很大的数组：

```javascript
let big = new Array(1000000).fill(0);
let shared = big; // 共享引用，几乎不占额外内存
```

如果每次都复制一份，性能和内存都会受影响。

## 引用与数据结构

链表、树、图等复杂结构都离不开引用。

以链表为例：每个节点保存“下一个节点”的引用：

```javascript
function node(value, next = null) {
    return { value, next };
}

let list = node(1, node(2, node(3)));
```

树和图也是一样：通过引用把节点连接起来。

更进一步：**同一个节点也可以被多个父节点引用**，这样就形成了“有向无环图”（DAG）。这在编译器、缓存结构里很常见。

## 函数参数里的引用

JavaScript 函数传参时，传递的是“值”，但对于对象来说，这个“值”是引用：

```javascript
function addOne(point) {
    point.x += 1;
}

let p = { x: 0 };
addOne(p);
p.x; // 1
```

这也是很多“状态被意外修改”的来源。

## 相等与同一

两个对象长得一样，不代表它们是“同一个”：

```javascript
let a = { x: 1 };
let b = { x: 1 };

(a === b); // false
```

`===` 对对象比较的是**引用是否相同**。如果你需要比较内容是否相同，就要写深度比较（或用库）。

## 拷贝：浅拷贝与深拷贝

避免“别名问题”的一种方式是复制：

```javascript
let user = { name: 'Kimmy', age: 18 };
let copy = { ...user }; // 浅拷贝
```

浅拷贝只复制“第一层”。如果有嵌套对象，还是共享引用：

```javascript
let u1 = { profile: { city: 'SH' } };
let u2 = { ...u1 };

u2.profile.city = 'BJ';
u1.profile.city; // 'BJ'
```

深拷贝更彻底，但实现更复杂。一个常见（但有局限）的方法是：

```javascript
let deep = JSON.parse(JSON.stringify(u1));
```

> 提醒：这种方式会丢失函数、`Date`、`Map` 等复杂类型。

## 引用与对象生命周期（内存管理）

在某些语言里（如 C/C++），你需要手动申请和释放内存。释放不当就会造成“内存泄漏”或“野指针”。

JavaScript 有自动垃圾回收（GC），但这并不等于“不会泄漏”。

### 引用计数（概念）

一种常见的内存管理方式叫“引用计数”：

* 每个对象有一个计数。
* 有一个新的引用指向它，计数 +1。
* 引用消失，计数 -1。
* 计数为 0 时释放。

问题是：**循环引用**会让计数永远不为 0：

```javascript
let a = {};
let b = {};
a.other = b;
b.other = a;
```

引用计数在这种情况下可能无法回收。现代 JS 引擎通常使用“可达性分析”而不是纯引用计数，所以可以处理循环引用。

### 常见的内存泄漏场景（JS）

* **全局变量**：全局对象引用一直存在。
* **事件监听未移除**：DOM 结点被移除，但监听还在。
* **缓存无限增长**：数组/Map 只增不减。
* **闭包长时间持有大对象**：函数引用了一个很大的结构。

例如：

```javascript
let cache = [];
function remember(data) {
    cache.push(data); // cache 不断变大
}
```

### 如何避免

* 及时清理不用的引用（设为 `null`）。
* 给缓存设置上限。
* 事件监听记得 `removeEventListener`。
* 临时映射用 `WeakMap` / `WeakSet`。

## 小结

引用让我们能够构建复杂结构、提高效率，但也带来共享状态、别名、生命周期等问题。理解引用是理解“程序行为”的关键一步。

## 练习

* 解释下面代码的输出：

```javascript
let a = [1, 2];
let b = a;
let c = a.slice();

b.push(3);

console.log(a, b, c);
```

* 写一个 `cloneUser(user)`，返回一个“只做浅拷贝”的函数。
* 写一个 `freeze` 的例子，说明不可变对象能减少引用带来的副作用。
* 设计一个链表结构，让两个链表共享同一个尾部节点，并解释这样做的好处与风险。

## 延伸阅读

* [值语义与引用语义 Value vs. Reference](../reference/value-reference.md)
* [垃圾回收 Garbage Collection](../reference/garbage-collection.md)
* [栈与堆 Stack & Heap](../reference/stack-and-heap.md)
