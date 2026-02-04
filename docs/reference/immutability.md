# 不可变性（Immutability）

不可变性指的是：对象一旦创建，就不再被修改。如果需要变化，就创建一个新的对象。

## 为什么有用

* **减少共享状态冲突**：不修改原对象，减少别名带来的副作用。
* **更容易推理**：同一输入得到同一输出。
* **更容易做回滚/撤销**：旧对象仍然保留。

## 成本

* 会产生更多对象，可能增加内存占用。
* 需要垃圾回收器回收旧对象。

## JavaScript 中的常见做法

```javascript
let user = { name: 'Kimmy', age: 18 };
let updated = { ...user, age: 19 };
```

数组也可以用 `slice()` / `concat()` / `map()` 生成新数组。

## Object.freeze

`Object.freeze` 可以阻止修改，但它是浅层冻结：

```javascript
let obj = Object.freeze({ profile: { city: 'SH' } });
obj.profile.city = 'BJ'; // 仍然能改
```

如果需要深度冻结，需要递归处理。

## 进一步阅读

不可变性和函数式编程关系紧密，也是很多现代框架的设计基础。
