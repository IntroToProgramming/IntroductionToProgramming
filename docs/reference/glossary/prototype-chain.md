# 原型链（Prototype Chain）

JavaScript 对象通过“原型链”实现属性查找与继承。

## 一个直观的说法

当你访问 `obj.foo` 时：

1. 先在 `obj` 自己身上找。
2. 找不到，就去 `obj.__proto__`（原型）上找。
3. 继续往上，直到 `null` 为止。

这条向上的链条就是原型链。

## `prototype` 与 `__proto__`

* `Function.prototype`：函数的原型对象（给实例用）。
* `obj.__proto__`：对象的原型引用（指向构造函数的 `prototype`）。

## `class` 的本质

`class` 只是语法糖，底层仍然是“函数 + 原型链”。

```javascript
class Person {
    say() { console.log('hi'); }
}

let p = new Person();
```

`p` 的 `__proto__` 指向 `Person.prototype`。

## 常见误区

* 原型链不是“复制”，而是“引用”。
* 修改原型会影响所有实例。

## 进一步阅读

原型链让 JavaScript 拥有灵活的继承方式，但也需要小心全局修改。
