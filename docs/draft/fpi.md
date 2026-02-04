---
title: 你所需要知道的关于函数的一切
date: 2020-07-17
---

> 本文源自于我在 2012 ～ 2013 年写的 Meta Functions 系列文章，以及知乎专栏的《map 四种》。通过细致地讲解和练习函数相关的内容来让大家了解**函数**、**闭包**、**延迟计算**和**流**。
>
> 你可以把它看成一个 SICP 前三章的超级简化版，不过这其中我不会讨论过多的细节。文中所有的代码都在浏览器控制台执行通过，你也可以简单地对着浏览器或者任意实现了 ES6 特性的 JavaScript REPL 试验其中的代码。

# 函数

这里的函数我比较倾向于集合论中的定义，即是两个集合之间的映射关系。也就是那种非常**纯**（pure）的函数。后文也会涉及一些带有状态的函数，不过绝大多数情况下我所期待的是对于一个函数 $f$ ，给定其参数 $x$ ，那么 $f(x)$ 的结果一定是**确定的**（deterministic）。

我们先来实现一个简单的函数，比如**斐波那契（fibonacci）数列**的定义。

$$
fib(0) = \begin{cases}
    1, &x = 0, or &x = 1\cr
    fib(n-1) + fib(n-2), &x \ge 2
\end{cases}
$$

如果你熟悉递归，可以很容易根据上面的递归定义把 `fib` 函数实现了：

```js
function fib(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}
```

我们来看求 `fib(10)` 的时候的展开图：

```
fib(10) =>
fib(9) + fib(8) =>
fib(8) + fib(7) + fib(7) + fib(6) =>
fib(7) + fib(6) + fib(6) + fib(5) + fib(6) + fib(5) + fib(5) + fib(4) =>
.....
```

最后展开会是一个深度为 10 节点非常多的**递归树**。

在我的电脑上，计算 `fib(30)` 已经需要等待一段时间，明显感觉到延迟了。

## 尾递归

对于这个操作，实际可以用另外一个办法来简化，就是通过**尾递归**，把计算的操作合并到尾调用的参数求值中去。

```js
function fib(n, a = 1, b = 1) {
    if (n == 0) {
        return a;
    }
    return fib(n-1, b, a + b);
}
```

这个时候的 `fib(10)` 的展开：

```
fib(10) =>
fib(9, 1, 2) =>
fib(8, 2, 3) =>
fib(7, 3, 5) =>
fib(6, 5, 8) =>
fib(5, 8, 13) =>
fib(4, 13, 21) =>
fib(3, 21, 34) =>
fib(2, 34, 55) =>
fib(1, 55, 89) =>
fib(0, 89, 144) =>
89
```

所有的计算通过两个额外的参数来累加，而不是通过反复的递归调用展开，这个时候只有递归层次的深度，就连计算 `fib(100)` 也都只需要递归调用 100 次就好，能够立即返回结果。

如果你曾经用**循环**的方式实现过斐波那契，那要想导出这个尾递归版本其实并不困难：

```js
function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a+b];
    }
    return a;
}
```

好的，首先我们把循环倒过来写：

```js
function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = n; i > 0; i--) {
        [a, b] = [b, a+b];
    }
    return a;
}
```

把 `for` 改成死循环：

```js
function fib(n) {
    let a = 1;
    let b = 1;
    let i = n;
    while(true) {
        if (i === 0) {
            return a;
        }
        [i, a, b] = [i-1, b, a+b];
    }
}
```

改一下参数和变量名：

```js
function fib(n, a = 1, b = 1) {
    while(true) {
        if (n === 0) {
            return a;
        }
        [n, a, b] = [n-1, b, a+b];
    }
}
```

`while(true)` 里面的内容，跟尾递归版的结构几乎一模一样，而这里直接改到参数的赋值，就可以一步替换为尾递归。

你可以对比尾递归形式和最后这个循环实现的内容。现实其实通常是反过来的，就是会通常是我们**写成尾递归的样子**，然后再由编译器**优化成循环**。这样的结果是能够省掉函数传参和压栈的过程，算是一步提效明显的优化，对时间（额外的压栈和传参操作）和空间（调用栈）的开销都能节省很多，还能避免不必要的**爆栈**（Stack Overflow）风险。

### 练习

- 请实现另外一个常用递归函数阶乘（factorial）的直接递归版和尾递归版。阶乘函数的定义如下：

$$
n! = \begin{cases}
  1, &n = 0 \cr
  (n-1)!\times n, &n \gt 0
\end{cases}
$$

# 函数进阶

我们上一节简单实现了一个函数，那么现在来认真地回顾考虑这么一个问题，函数到底是什么？

其实很简单，函数就是这么一个结构，你给他一个输入，他返回给你一个输出。而其由输入得到输出的过程，是你可以定义的。

这其实是一个非常广义的抽象，可以拿来类比各种东西，比如一个生产流水线也可以这么抽象地看，原材料作为输入，产品作为输出；而这个流水线的每一个节点又都是有自己的输入和输出。

于是我们可以看到函数的另外一个特征：可组合（Composable）。

## 可组合性

比如我们定义一个函数，去求一个数组排序后的结果：

```js
function sorted(array) {
    return array.slice().sort();
}
```

然后再定义一个函数，来求一个数组反转之后的结果：

```js
function reversed(array) {
    return array.slice().reverse();
}
```

那如果我们要求一个数组的降序排序的结果，就直接组合这两个调用就好：

```js
function sort_reversed(array) {
    return reversed(sorted(array));
}
```

正式函数的这种可组合性，让我们能通过定义有限的正交算子，来组合出无限的操作。

> 有些人可能会说，这个直接做成 Array 的方法，也是能够做成链式调用来组合的：
>
> ```javascript
> Array.prototype.sorted = function() {
>     return this.slice().sort();
> }
>
> Array.prototype.reversed() = function() {
>     return this.slice().reverse();
> }
> ```
>
> 实际这两种做法本质上是同一件事情。有些编程语言（比如 D 语言）中，`x.f(y)` 与 `f(x, y)` 是等价操作，实现的这种转换叫做**统一函数调用语法**（Uniform Function Call Syntax）。

## 函数对象

回到上面的排序函数。

JavaScript 有一个问题，就是排序默认是用的文本序，对数字也是如此，也就是说，111 是会排在 12 前面的，而 JavaScript 的 `Array.prototype.sort` 函数会让我们传递一个匿名函数进去来作为排序的比较器（Comparator），达到对数值做排序的目的。

这个比较器就是一个函数对象。

```js
[1, 111, 12].sort((x, y) => x - y)
// => [1, 12, 111]
```

**函数对象**，又叫**匿名函数**，在某些语境下面也叫 lambda 表达式（因其源自于 lambda 演算）。一个函数对象是可以赋值给某个变量、作为参数传递的；或者说，函数对象，是**第一类值**（first class value）。

比如上文中的 `(x, y) => x - y`。

## 闭包

既然函数是**第一类值**，那么我们也就能有方式来构造他了。

通常一个函数在传递过程中不只是作为一个独立的单位存在，还会包括一些**上下文**，这样组合起来的一个结构就叫闭包。

比如，我们定义以下函数，会返回一个函数对象，而这个函数对象每次调用都会累加一次，行为表现像是一个计数器：

```js
function makeCounter() {
    let count = 0;
    return () => count ++;
}
```

这里返回的函数对象，其实就捕获了 `makeCounter` 函数中的变量 `count`，并一直持有。在任何时候我们操作这个函数，都会改变这个变量的值。这个时候的变量可以被称为 **upvalue**（因为是**上层**（upper）函数中的**值**（value））。

这样看起来似乎毫无意义。

我们来看一个深入的结构：

```js
function pair(left, right) {
    return (fn) => fn(left, right);
}

function left(a, b) {
    return a;
}

function right(a, b) {
    return b;
}

let p = pair(1, 2);

p(left) // => 1;
p(right) // => 2;
```

`pair` 给我们构造了一个对象（这个时候已经不仅仅限于函数对象了），然后我们通过另外定义的两个函数来去访问这个对象的内部结构，而这个实际的内部结构并没有直接暴露给我们。

上面这段话你看到了哪些关键的东西？

- **对象**：`pair` 构造了一个有序对，这个对象可以由我们后续定义的方法来操作和访问
- **方法**：`left` 和 `right` 两个函数本身并没有实际的意义，与 `pair` 对象绑定以后，可以利用 `pair` 中的数据来实现预期的行为
- **封装**：`pair` 的内部结构在构造时确定，无法在外部获取和改变内部结构，只能通过定义 `pair` 的方法来处理

在只有“函数”这个构造的情况下我们也能做这些事情。甚至在一些编程语言（比如 Java/C++）里面，函数对象就是通过**结构/类**加上特定的**函数/方法**来实现的，也就只有这样他们才能做捕获形成闭包。

# 数据抽象

## 可变性

我们知道 OO 的一个特色是可变性来描述状态，闭包在这里也完全可以实现。当然需要借助一些额外的结构。

```js
function mutablePair(a, b) {
    return (fn) => {
        let x;
        [a, b, x] = fn(a, b)
        return x;
    }
}

function getLeft(a, b) {
    return [a, b, a];
}

function getRight(a, b) {
    return [a, b, b];
}

function setLeft(value) {
    return (a, b) => [value, b, a]
}

function setRight(value) {
    return (a, b) => [a, value, b]
}

let mp = mutablePair(1, 2);

mp(getLeft); // 1
mp(getRight); // 2
mp(setLeft(5)); // 1
mp(getLeft); // 5
```

其实可以看到，`mp` 接受的每个函数都是 `(a, b) => [a, b, x]` 这种形式。这样就是能够给传递函数充分地信息来获取结构，然后生成充分足够地信息来更新 `mp` 闭包的内部。如果我们再简化一点，把 `a` 和 `b` 作为一个对象比如 `this` 或者 `self` 来看，`mp` 接受的每个函数变成了 `(self) => result`。其中对 `self` 的改变也包括在内。

这其实就是大部分编程语言的面向对象的“方法”的实现机制，都会给这些方法绑定一个 `this` 或者 `self` 变量，让方法内部可控制。

你看，就这么简单。

### 练习

1. 给 mutablePair 实现一个方法，可以交换 pair 左右两边的值。
2. 有没有更简单地只用函数来实现 mutablePair 的方式？

## 生成器

我们回想一下上一个场景中的计数器，其实是一个非常有用的结构。

比如我们希望得到斐波那契数列，但又不希望提前获取这所有内容的时候：

```js
function fibGenerator() {
    let n = 0;
    return () => fib(n++)
}
```

进一步地我们可以抽象出来这样一个结构，就叫生成器，根据你提供的函数再来求一个结果：

```js
function generator(fn) {
    let n = 0;
    return () => fn(n++);
}

y = generator(fib);

y(); // 1
y(); // 1
y(); // 2
y(); // 3
y(); // 5
y(); // 8
```

然后，不知道你是否发现了这么一个问题，就是，这个生成器只能前向迭代，也就是说，没法倒带的。

来我们看一下怎么实现：

```js
function bidirectionalGenerator(fn) {
    let n = 0;
    return (direct) => {
        let result;
        [n, result] = direct(n, fn);
        return result;
    }
}

function backward(n, fn) {
    return [n-1, fn(n-1)];
}

function forward(n, fn) {
    return [n+1, fn(n+1)];
}

let bg = bidirectionalGenerator(fib);
bg(forward); // 1
bg(forward); // 2
bg(forward); // 3
bg(forward); // 5
bg(forward); // 8
bg(backward); // 5
bg(backward); // 3
bg(forward); // 5
bg(forward); // 8
```

思路与 `mutablePair` 类似，我们构造一个特定结构作为这个对象的`this`，所有的操作都是围绕这里所谓的 `this` 来进行操作。

### 练习

- 给 `generator` 加上范围限制，实现 `boundedGenerator`。

## 不可变性

前面的生成器中，有一个很关键的问题就是我们**改变了 `generator` 的内部状态**，才得以每次获取都拿到不同的结果。这种情况实际违背了函数其执行的**确定性**。通常我们很少会用这种繁杂的方式实现对象和状态，而是用另外一些更加直观的形式。这个话题我们以后在涉及对象的时候再去讨论。

继续看，如果我们不去改变生成器的内部状态，如何实现一个类似的结构。

一个生成器会产生一系列的值，形成一个序列结构。我们先定义一个序列结构，可以依照前面的定义来：

```js
function cons(x, y) {
    return (f) => f(x, y);
}

function head(cons) {
    return cons((x, y) => x);
}

function tail(cons) {
    return cons((x, y) => y);
}

function nil() {
    return (f) => f(nil(), nil(), true);
}

function isNil(s) {
    return s((x, y, z) => z === true);
}
```

这样一个结构中，序列的每一个节点所对应的下一个都是另外一个节点（`cons` 或者 `nil`），这样连续递归组合起来的结构就是个单链表序列，也是大多数数据结构的基础。

一个包含了前 5 个自然数的序列，可以表示成以下形式：

```js
const seq_first_5_nats = cons(0, cons(1, cons(2, cons(3, (cons(4, nil()))))));

head(seq_first_5_nats); // 0
head(tail(tail(tail(seq_first_5_nats)))); // 3
```

而生成器每次除了给我们一个值以外，还会产生一个新的状态（因为这里不能再用可变状态了，所以这个新状态肯定是新生成的）。这样一个新的状态也正是跟原本的生成器一致的结构。这有点类似上面的序列，但由于生成器是会持续构造下去的，我们不得不采用一种方式来阻断这个构造的执行。

我们可以先从重复产生同一个状态开始构造这个结构：

```js
function zeros() {
    return cons(0, () => zeros()); // 而不是 cons(0, zeros())
}

head(zeros()); // 0

head(tail(tail(zeros())())()); // 0
```

这里的 `zeros` 就是一个生成器，在这里 `cons` 所对应的 `tail` 部分不再是一个 `cons` 或者 `nil`，而变成了一个函数。这里比较明显的就是，只要你不去对一个函数尝试进行求值，那么他可以作为一个仅有的对象保持该状态，这样就暂时阻断了生成器的持续构造。而当我们需要生成器继续执行的时候，只要对其进行一次强制求值就好了。

可以看到我们每次调用 `tail` 以后都会尝试对它重新求值一次，这正是从一个状态转换到另一个状态的过程。

为了方便从生成器中取出对应的值，我们预定义一个方便的功能函数 `take`：

```js
function take(n, gen) {
    if (n == 1) {
        return [head(gen)];
    }
    return [head(gen), ...take(n - 1, tail(gen)())];
}

take(10, zeros()); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

### 练习

1. 实现 `take` 函数的非生成器（即由 `cons`/`nil` 组合而成的链表）版本。
2. 通常与 `take` 配套的函数时 `drop`，即舍去掉 `take` 所获取的的那部分结果，直接把生成器快进到某个状态。请实现 `drop` 函数。

同样的方式你也可以定义连续产生特定数字的序列：

```js
function repeat(n) {
    return cons(n, () => repeat(n));
}

take(10, repeat(10)); // [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
```

以及，持续递增的生成器：

```js
function counter(start = 0) {
    return cons(start, () => counter(start + 1));
}

take(10, counter(0)); //  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

可以看出来，这里的 `counter` 无非是在反复地应用 `+1` 这个操作，来持续的到结果。

我们把 `+1` 操作变成函数，也即：

```js
function inc(x) {
    return x + 1;
}

function counter(start = 0) {
    return cons(start, () => counter(inc(start)))
}
```

这时候我们可以考虑把这个函数作为参数抽取出来:

```js
function iterate(fn) {
    function generator(start = 0) {
        return cons(start, () => generator(fn(start)));
    }

    return generator;
}

take(10, iterate(inc)(0)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

take(10, iterate(x => x * 2)(1)); // [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
```

`iterate(fn)` 所产生的生成器对应的序列是：

```js
start, fn(start), fn(fn(start)), fn(fn(fn(start))), ...
```

但是这毕竟还是只能单项地产生结果，怎么能像前面一样生成一个 fibonacci 序列呢？

同样的，我们再来抽取一个变量。

每次我们的 `generator` 都只是直接把对应的迭代结果返回，而如果在这个迭代结果上再做一些操作会如何呢？

```js
function generate(gn, fn) {
    function generator(start = 0) {
        return cons(gn(start), () => generator(fn(start)));
    }

    return generator;
}

take(10, generate(fib, inc)()); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

同样，`generate(gn, fn)` 产生的生成器所对应生成的序列则是：

```js
gn(start), gn(fn(start)), gn(fn(fn(start))), ...
```

请思考前面`generate(fib, inc)`所实现的 fibonacci 序列生成器，获取其前 10 项时所完整展开的结构以及对 `fib` 函数的调用次数。

你会发现，`generate` 这种方式对于需要复杂迭代运算的 `gn` 并不友好。

## 通用生成器

其实根据 fibonacci 序列的递归定义，我们可以写出更合适的生成器。

```js
function generateFib() {
    function generator(a = 1, b = 1) {
        return cons(a, () => generator(b, a + b));
    }

    return generator;
}

take(10, generateFib()()); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

这样得到的就是一个每取一步进行**一步计算**的 fibonacci 序列生成器，比起来前面每一次都要**重新计算**一遍的要更容易很多。

其实这样我们仍然能够进行更进一步的抽取：

可以看到的是，`generateFib` 里的 `generator` 函数的参数是有一个相对固定的**映射关系**的，也就是我们前面推出来的迭代式 fibonacci 的映射关系，而只要把这组**映射关系**表示出来，那就可以进一步的抽象了：

```js
function generateBy(fn) {
    function generator(arg, ...args) {
        return cons(arg, () => generator(...fn(arg, ...args)));
    }

    return (...initials) => generator(...initials);
}

take(10, generateBy((a, b) => [b, a + b])(1, 1));
// [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

### 练习

- 编写与 `generateFib` 类似的阶乘函数(factorial)所对应的版本，并用 `generateBy` 进行改写。
- 把前面的 `zeros`、`repeat` 和 `counter` 用 `generateBy` 进行改写

### 发生了什么？

生成器这种构造，最主要的优势是利用函数在构造过程中捕获并保留其上下文的特性，来保持执行状态。这样每次在我们对生成器进行求值的时候，随即创建一个新的保持下一次状态的函数，就能够拿到下一个状态的生成器。

而如何生成下一个状态，存在两种场景：

- 第一，根据**反复应用特定函数**的结果转换得到，即我们的 `generate` 函数
- 第二，根据前面几个**状态组合**得到，即我们的 `generateBy` 函数

这两种场景也自然对应了许多对于实际应用场景中对于数据的复合操作。

同样，由我们导出两种类型生成器的过程可以看到，程序的演进过程就是一整个的**抽象**与**组合**的过程。每一次我们得到一个**相对直观的结果**以后，都可以进一步对其再**抽象**，获得一个**更加通用**的方案。

反过来，如果我们有一些简单函数（像 `inc`）可以做到**预期**的操作，与其他函数**组合**所构成的结构将可以解决几乎任意复杂度的问题。

你所需要知道的与函数相关的一切，绝对不会超出这两个过程的范围。

### 练习

- 请考虑为这些不可变迭代器加入倒带功能。

# 附文：《[map 四种](https://zhuanlan.zhihu.com/p/28471507 "map 四种")》

```js
// * common functions
inc = x => x + 1
double = x => x + x
square = x => x * x

compose = (f, g) => x => f(g(x))

flip = f => (x, y) => f(y, x)

id = x => x

force = f => f()

// * cons, nil and list
cons = (x, y) => f => f(x, y)

car = cons => cons((x, y) => x)

cdr = cons => cons((x, y) => y)

nil = () => nil

nilP = x => x == nil

list = (a, ...args) => args.length ? cons(a, list.apply(null, args)) : cons(a, nil)

// * helper
printList = lst => nilP(lst) || (console.log(car(lst)), printList(cdr(lst)))

tap = f => (...args) => (console.log(args), f.apply(null, args))

// # map the traditional recursive way
map = (fn, lst) => nilP(lst) ? nil : cons(fn(car(lst)), map(fn, cdr(lst)))

Y = rec => (f => f(f))(f => rec(x => (f(f))(x)))

reduce = Y(r => c => i => l => nilP(l) ? i : c(car(l), r(c)(i)(cdr(l))))
// # map by reduce
// map = (fn, l) => reduce((h, t) => cons(fn(h), t))(nil)(l)
filter = p => reduce((h, t) => p(h) ? cons(h, t) : t)(nil)

foldr = reduce

// foldl :: (a -> b -> a) -> a -> [b] -> a
foldl = Y(f => c => i => l => nilP(l) ? i : f(c)(c(i, car(l)))(cdr(l)))

reverse = foldl(flip(cons))(nil)

len = reduce((h, t) => t + 1)(0)

// * streams
// type Stream = () -> (a, Stream)
zeroP = (x) => x === 0

// zeros = () => cons(0, zeros)
// 0, 0, 0, ...
zeros = Y (z => () => cons(0, z))

// o, o, o, ...
cycle = o => Y(c => () => cons(o, c))

ones = cycle(1)

// take_lazy = n => l => n == 0 ? nil : cons(car(l), take_lazy(n-1)(force(cdr(l))))
take_lazy = Y(t => n => l => zeroP(n) ? nil : cons(car(l), t(n - 1)(force(cdr(l)))))

// n, n + 1, n + 1 + 1, ...
ints = Y(i => n => cons(n, () => i(n + 1)))

range = (off, from = 0) => take_lazy(off)(ints(from))

// n, f(n), f(f(n)), ...
iterate = f => Y(i => n => cons(n, () => i(f(n))))
// ints = iterate(inc)

// g(n), g(f(n)), g(f(f(n))), ...
generate = (g, f) => Y(i => n => cons(g(n), () => i(f(n))))
// iterates = generate(id)
// ints = generate(id, inc)
// # map by generate
// map = (fn, l) => take_lazy(len(l))(generate(compose(fn, car), cdr)(l))

squares = (from = 1) => generate(square, inc)(from)

stream = Y(s => l => nilP(l) ? nil : cons(car(l), () => s(cdr(l))))
// # map on streams
map_lazy = (f, s) => generate(compose(f, car), compose(force, cdr))(s)
```
