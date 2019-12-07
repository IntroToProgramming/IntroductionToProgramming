---
description: 程序的基本控制结构有哪几种？递归和循环的区别是什么？短路求值的作用是什么？
---

# 过程

什么是过程呢？

凭经验我们就能知道，实际的问题并不是像理想中那么简单，不是一个表达式就能描述的清楚的，而且也并不一定能通过组合来直接解决。

甚至是简单的数学问题，也不能用他们来解决。比如：

$$
|x|
 = abs(x) = \begin{cases}
x, &x\ge0\cr
-x, &x\lt0\cr
\end{cases}
$$

求绝对值，或者

$$
pow(x,y) = \prod_{1}^{y}{x}
$$

求积。

其中一个需要我们根据参数的值，来选择不同的计算方式，返回不同的结果；另外一个则是通过对特定的表达式做一个累乘（没错其实行为跟乘方是一样的，所以我把它叫pow）。

我们先看累乘。

## 累乘

如果我们已知指数的话，要写起来是很简单的：

```javascript
function pow1(x) { return x; }
function pow2(x) { return pow1(x) * x; }
function pow3(x) { return pow2(x) * x; }
function pow4(x) { return pow3(x) * x; }
function pow5(x) { return pow4(x) * x; }
```

这样写其实是符合pow的定义的。

然后其实我们可以把它变换一下：

```javascript
// 伪代码，无法正确运行
function pow(x, 1) { return x; }
function pow(x, 2) { return pow(x, 1) * x; }
function pow(x, 3) { return pow(x, 2) * x; }
function pow(x, 4) { return pow(x, 3) * x; }
function pow(x, 5) { return pow(x, 4) * x; }
```

所以我们得到了pow函数的另一个形式：

$$
pow(x, y) = \begin{cases}
x, &y=1\cr
pow(x, y -1)\times x, &y>1\cr
\end{cases}
$$

没错我们又归结到了选择结构上。后面我们会拿这个来讨论。现在只是简单提一提。

哦对了，现在pow的这个形式叫做递归定义，数学上叫递推关系式（好像又叫归纳定义？）。

好的，我们回到$$\prod$$运算符上来。

根据前面的分析，我们可以知道，如果能够拿到前面一个乘积，然后和第y个相乘，，就可以得到我们要的结果。

于是我们假设那第`y-1`个乘积是`prod`，最终的结果就是`prod*x`。再往前推`prod`，这个关系是基本上不变的。

那么，我们只要有一个东西来保存前面的结果，再跟后面的相乘之后更新保存的结果就可以了。

这个能保存数据的东西我们把它叫做变量（Variable）。

比如最开始`prod = 1`，然后`prod = prod * x`，会把`prod`与`x`相乘的结果计算出来，再保存进`prod`里面。

所以我们可以简单地把这个计算看成

```javascript
let prod=1
prod=prod*x;
prod=prod*x;
prod=prod*x;
...
prod=prod*x; // 执行y次
```

那么怎么让他能够只执行`y`次呢？

## 循环

JavaScript提供了一种东西叫做循环语句。

大概是长这个样子的

```javascript
let prod=1;
for(let i = 1; i <= y; i = i+1) {
    prod = prod*x;
}
```

这个叫循环语句，意思就是，在满足指定条件的情况下，会一直去执行语句体（花括号之间）的内容。

上面那段代码的意思是，让`prod`初值为1，让`i`从1开始，每次增加1，如果`i`小于等于`y`的话，执行`prod = prod*x`，否则跳出循环。

确实很复杂，特别是比起上面那个递归定义来。

我们对它进行一个简单的改写。

一般来说，程序员是从0开始计数的。于是从`1～y`，就变成了从`0～y-1`，进一步地`i <= y-1`又可以进一步地写成`i < y`（反正都是整数，证明我就不给了），这样条件就简化掉了一个符号。

另外，但凡类似`x=x+y`这种的，都可以写成`x+=y`，特别地，当运算符为`+`和`-`，同时`y`为1的时候，可以直接写成`x++`或者`x--`；

于是一个典型的循环就出来了：

```javascript
let prod=1;
for(let i = 0; i < y; i++) {
    prod *= x;
}
```

那么我们的pow函数也有了：

```javascript
function pow(x, y) {
    let prod=1;
    for(let i = 0; i < y; i++) {
        prod *= x;
    }
    return prod;
}
```

## 选择

好的，回头来看我们的abs函数。

我们要根据x的符号来决定时返回x还是他的相反数。

JavaScript让我们能通过选择语句`if...else...`做这件事。

```javascript
function abs(x) {
    if(x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```

当然`if/else`还有一种简单的形式，可以让我们写起来更省力。

```javascript
function abs(x) {
    return (x >= 0) ? x : -x;
}
```

`?:`运算符共有三部分，问好前面是判断条件，问号后面由冒号分成两部分，如果判断条件为真，那么返回冒号与问号之间的，否则返回冒号之后的。

## 递归

好的，这样子我们就能完善我们前面写的递归定义的pow了。

```javascript
function pow(x, y) {
    return (y == 1) ? x : pow(x, y-1) * x;
}
```

不能比循环的明白更多。

### 尾递归

尾递归这个概念可以简单做个了解。主要是因为如果有了尾递归，编译器就可以更好的优化程序的执行过程。而且更重要的一点是，尾递归跟循环几乎是一一对应的关系。

我们先简单的把这个实现写出来吧。

```javascript
function pow(x, y, prod = 1) {
    return (y == 0) ? prod : pow(x, y-1, prod*x);
}
```

怎么转换到循环的呢？

首先我们提取出变量来。

```javascript
function pow(x, y, prod = 1) {
    if (y == 0) {
        return prod;
    }
    y = y - 1;
    prod*=x;
    return prow(x, y, prod);
}
```

正式写成循环

```javascript
function pow(x, y, prod = 1) {
    for(;y != 0;) { // or while(y != 0)
        y = y - 1;
        prod*=x;
    }
    return prod;
}
```

改写成递增的变量

```javascript
function pow(x, y) {
    let prod = 1;
    for(let i = 0; i < y; i++) {
        prod *= x;
    }
    return prod;
}
```

## 短路求值

试想一下我们的递归版pow代码

```javascript
function pow(x, y) {
    return (y == 1) ? x : pow(x, y-1) * x;
}
```

如果这里你把函数自身的调用写成了`pow(x, y) * x`，结果会是怎么样的呢？

如果这样写，y作为一个计数器并没有递减，那么每回调用都会跟当前调用一样传递相同的参数进去。

于是会一在重复递归地调用`pow(x, y)`，直到不能再调用导致栈溢出。

然而一定是这样吗？你可以调用一下`pow(4, 1)`试试，会正常输出`4`。

为什么会有这种不同呢？

上一讲，我们提到了组合的概念，说，通过组合会强制求值每一个传递给函数的参数，但是当我们把这个东西忘`?:`操作符上套的时候，并没有效果。

这种特性叫做短路求值（short-circuit evaluation），对于`?:`来说，只有当条件为真的时候才去求值真分支，为假的时候才去求值假分支。

所以如果写错的那个pow，当`y == 1`的时候，还是能够正常执行的。

## 过程

一个再复杂的流程，最终都会由这样的三部分组成：

* 顺序
* 分支（选择）
* 循环

根据我们前面提到的组合的思想，再复杂的过程都能通过这些来组合解决。

## 练习

* 试写出求阶乘、求斐波那契数等函数的循环、递归和尾递归版本的实现。
* 用以上代码解释短路求值
* 请使用顺序、分支、循环来描述现实中的一些过程。

