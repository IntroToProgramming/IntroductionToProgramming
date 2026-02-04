# 对象

广义地讲，任何一个在程序中出现的元素都可以称作对象：整数对象、字符串对象、函数对象……

但在“面向对象编程”（OOP）里，**对象**通常指“带状态 + 带行为”的实体。

## 面向对象编程（Object-Oriented Programming）

面向对象的核心思想是：

* **封装**：把数据和操作放在一起。
* **抽象**：只暴露必要的接口。
* **多态**：同一接口，多个实现。

### 一个最简单的例子

不同的“车”（Vehicle）都可以跑（run）：汽车、卡车、推车……

```javascript
class Vehicle {
    run() {
        console.log('vehicle running');
    }
}

class Car extends Vehicle {
    run() {
        console.log('car running');
    }
}

class Truck extends Vehicle {
    run() {
        console.log('truck running');
    }
}

let v = new Car();
v.run(); // car running
```

这里 `Vehicle` 提供了统一接口 `run()`，不同子类各自实现。

### 多态：同一个接口，不同表现

```javascript
function start(vehicle) {
    vehicle.run();
}

start(new Car());
start(new Truck());
```

只要对象“能 run”，就能被 `start` 使用。这种风格叫 **鸭子类型**（Duck Typing）。

## JavaScript 的对象模型（极简版）

JavaScript 的对象本质上是“键值对 + 原型链”。

`class` 只是语法糖，本质还是函数和原型：

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.say = function () {
    console.log('hi, ' + this.name);
};
```

使用 `class` 只是更直观：

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log('hi, ' + this.name);
    }
}
```

## 封装与私有数据

对象常常需要“只读公开，内部私有”。在 JavaScript 里有两种常见写法：

```javascript
// 写法一：用闭包
function createCounter() {
    let count = 0;
    return {
        inc() { count += 1; return count; }
    };
}
```

```javascript
// 写法二：用私有字段（#）
class Counter {
    #count = 0;
    inc() { this.#count += 1; return this.#count; }
}
```

封装的意义在于：外部只能通过“方法”访问内部状态，避免随意修改。

## 继承与组合

继承很方便，但容易让结构变复杂。很多时候，我们用**组合**来代替继承：

```javascript
let canRun = {
    run() { console.log('run'); }
};

let canFly = {
    fly() { console.log('fly'); }
};

let bird = Object.assign({}, canRun, canFly);
bird.run();
bird.fly();
```

简单理解：**继承是一棵树，组合是积木**。

## 小结

对象能把“数据 + 行为”放在一起，是程序建模最常用的方法之一。

下一章我们会看到：当对象和并发混在一起时，会出现新的问题。

## 练习

* 定义一个 `Animal` 类，包含 `speak()` 方法，再派生 `Dog`、`Cat`。
* 写一个 `feed(animal)` 函数，只依赖 `animal.eat()`，不要检查类型。
* 用组合的方式，让一个对象同时具备 `move` 和 `draw` 两种能力。

## 延伸阅读

* [原型链 Prototype Chain](../reference/prototype-chain.md)
