# 数据

很多时候我们要处理的东西并不只是一个简单的数据，或者是一个由多个数据组成的简单序列。比如，当我们要考虑一间房子，关注的是户型、面积和位置等；考虑一辆汽车，关注的是品牌、价格和最高时速等；考虑一个学生，关注的是他的学号、姓名、各科成绩等。

这时候，序列、引用和各种标量（Scalar）类型都不能很好地满足我们的需要，我们需要**把多种数据打包在一起**。

## 结构

比如我们要表示一辆车，最直接的方式是用数组：

```javascript
let car = ['Nissan', 500000, 180];
```

这种写法虽然能用，但不够清晰：谁是价格？谁是速度？一不小心就会写错。

于是我们更常用“带名字的数据”，也就是**结构**。在 JavaScript 里，这就是对象（Object）：

```javascript
let car = {
    brand: 'Nissan',
    price: 500000, // RMB
    speed: 180 // km/h
};

car.brand; // 'Nissan'
car['price']; // 500000
```

结构的好处是：

* 读起来更像人话；
* 字段有名字，语义更明确；
* 字段可以是不同类型，甚至是嵌套结构。

比如一个学生：

```javascript
let student = {
    id: 'S001',
    name: 'Kimmy',
    scores: { math: 92, english: 86 },
    hobbies: ['reading', 'music']
};
```

### 结构的本质

房子、汽车、学生这些“概念性实体”（Entity）都有一些属性（Property）以及与其他实体的关系（Relation）。

当我们给这些属性贴上标签，把它们组织起来，就形成了结构。换句话说，我们给一块数据“赋予了语义”。

## 递归数据类型

有些结构是**递归的**：它包含了它自己。

最经典的例子就是链表（List）。一个节点包含一个值和下一个节点：

```javascript
function node(value, next = null) {
    return { value, next };
}

let list = node(1, node(2, node(3, null)));
```

遍历它很简单：

```javascript
function printList(list) {
    for (let p = list; p !== null; p = p.next) {
        console.log(p.value);
    }
}
```

当然也可以用递归（注意递归层数太深会导致调用栈溢出）：

```javascript
function printList(list) {
    if (list === null) return;
    console.log(list.value);
    printList(list.next);
}
```

### 扩展阅读：C++ 中的递归结构（对比）

> 可以跳过，只是帮助理解“指针 + 递归”。

```cpp
struct ListNode {
    int value;
    ListNode* next;
};

void printList(ListNode* list) {
    if (list == nullptr) return;
    std::cout << list->value;
    printList(list->next);
}
```

## 构造器（Constructor）

当结构变复杂时，我们希望“创建时就自动把字段填好”。

JavaScript 提供了 `class` 和 `constructor`：

```javascript
class User {
    constructor(name, age, height) {
        this.name = name;
        this.age = age;
        this.height = height;
    }
}

let user = new User('Kimmy', 18, 178);
```

你也可以用工厂函数做到类似效果：

```javascript
function makeUser(name, age, height) {
    return { name, age, height };
}
```

构造器的意义在于：**统一初始化规则**，并且可以在创建时做一些必要的检查或计算。

## 递归结构上的操作

既然结构是递归的，那么操作也可以是递归的。

比如我们把链表里的每个数取反：

```javascript
function mapList(list, transformer) {
    if (list === null) return null;
    return {
        value: transformer(list.value),
        next: mapList(list.next, transformer)
    };
}

let list2 = mapList(list, x => -x);
```

## 作为数据的过程（Procedure as Data）

在 JavaScript 中，函数本身就是数据。我们可以把它传给另一个函数，或者作为返回值。

```javascript
const negate = x => -x;
mapList(list, negate);
```

这就是“高阶函数”的基础，也是之后闭包与对象封装的铺垫。

### 补充：函数对象的常见用法

JavaScript 里函数是第一类值，可以像变量一样传递。一个常见场景是“比较器”：

```javascript
[1, 111, 12].sort((x, y) => x - y); // [1, 12, 111]
```

`(x, y) => x - y` 就是一个函数对象，它告诉 `sort` 如何比较两个元素。

## 树

另一种经典的递归结构是树（Tree）。比如二叉树：

```javascript
class TreeNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
```

下面这棵树表示表达式 `(1 + (2 - 3)) * 4`：

```
             *
           /   \
          +     4
        /   \
       1     -
           /   \
          2     3
```

### 遍历（Traverse）

先序遍历（Preorder）：

```javascript
function preorder(node, visit) {
    if (!node) return;
    visit(node.value);
    preorder(node.left, visit);
    preorder(node.right, visit);
}
```

中序遍历（Inorder）：

```javascript
function inorder(node, visit) {
    if (!node) return;
    inorder(node.left, visit);
    visit(node.value);
    inorder(node.right, visit);
}
```

后序遍历（Postorder）：

```javascript
function postorder(node, visit) {
    if (!node) return;
    postorder(node.left, visit);
    postorder(node.right, visit);
    visit(node.value);
}
```

### 深度优先（Depth-First）和广度优先（Breadth-First）

如果从根节点出发，**先一路走到底再回退**，就是深度优先（DFS）。

如果**一层一层地访问**，就是广度优先（BFS）。

实现 DFS 通常用“栈”，实现 BFS 通常用“队列”。

```javascript
function dfs(root, visit) {
    if (!root) return;
    let stack = [root];
    while (stack.length) {
        let node = stack.pop();
        visit(node.value);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
}

function bfs(root, visit) {
    if (!root) return;
    let queue = [root];
    while (queue.length) {
        let node = queue.shift();
        visit(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}
```

> 提醒：`queue.shift()` 会移动数组，性能一般。生产环境里通常会用真正的队列结构。

## 练习

* 实现一个 `sumList`，返回链表所有元素的和。
* 改造 `mapList`，写出一个 `filterList`。
* 用代码实现先序、中序、后序遍历。
* 用代码实现 DFS 和 BFS，并比较它们在“查找指定节点”上的行为差异。

## 延伸阅读

* [值语义与引用语义 Value vs. Reference](../reference/value-reference.md)
* [序列化 Serialization](../reference/serialization.md)
