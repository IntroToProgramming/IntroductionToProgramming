# 值语义与引用语义（Value vs. Reference）

## 值语义

“值语义”表示：变量存的是数据本身，拷贝会得到独立的值。

```javascript
let a = 1;
let b = a;
b = 2;
a; // 1
```

## 引用语义

“引用语义”表示：变量存的是对象地址，拷贝只复制地址。

```javascript
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
obj1.x; // 2
```

## 浅拷贝与深拷贝

* **浅拷贝**：只复制第一层。
* **深拷贝**：递归复制所有层。

```javascript
let u1 = { profile: { city: 'SH' } };
let u2 = { ...u1 }; // 浅拷贝
u2.profile.city = 'BJ';
u1.profile.city; // 'BJ'
```

## 进一步阅读

理解值语义/引用语义是理解“共享状态”和“意外修改”的基础。
