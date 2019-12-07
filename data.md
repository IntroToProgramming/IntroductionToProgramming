# 数据

很多时候我们要处理的东西并不只是一个简单的数据，或者是一个由多个数据组成的简单序列。比如，当我们要考虑一间房子，关注的是户型、面积和位置等，考虑一辆汽车，关注的是性价比、能耗和易用性等，考虑一个学生，关注的是他的学号、姓名、各科成绩等。

很多时候我们也需要考虑一系列的符号，比如房屋的户型、汽车的品牌，这些在一定程度上固定的内容，并不需要专门去用字符串处理。

这种时候，序列、引用和各种标量（Scalar）类型都不能很好的满足我们的需要。

我们来做一个简单的示范吧。

## 结构

比如，我们要表示一辆车，其中包括他的品牌、价格和最高时速。在当前的情况下，最合适的方式就是采用长度为3的array，约定好第0位表示品牌，第1位表示价格，第2位表示最高时速。于是我们可以得到以下的设计：

```javascript
let car = [1, 500000, 180]
```

于是我们就能够很轻松地（并丑陋地）表示汽车了。

这种写法虽然算是比较方便，但是还是有很多问题的。

比如，每次我们都需要多写很多个函数，比如所有的元素都必须是同一个类型的。

所以大多数编程语言都提供结构（Structure）或者记录（Record）类型，来简化我们实现这个的过程。

比如，在JavaScript中我们可以很简单的把Car表示如下：

```javascript
let car = {
    brand: 'Nissan',
    price: 500000, // USD
    speed: 180 // MPH
}
```

这是一个结构（struct），其中包含了三个域（field，也叫字段）。比起还要反复地写各种函数来，要简单和方便很多。 而且，各个字段的类型可以不同。

这样子我们就能通过Car来表示一辆汽车了：

```javascript
car.brand
```

很简单吧。

那么，结构的本质到底是什么呢？

回到本章开始我们的讨论。房子、汽车、学生，这些概念性的实体（Entity）都有一些自己本身的属性（Property），以及与其他实体之间的关系（Relation）。 我们可以给这些实体的属性和关系贴上一个个标签，把他们与所属的实体之间关联起来。这样就组成了我们现在看到的结构。

当然，他还是数据，但是这些数据通过我们贴上不同的标签以及把他们关联组合，就变成了更加具有实际意义的内容。换句话说，我们给一块二进制内存区赋予了语义（Semantics）。

来让我们看一下其他的许多结构吧。

复数，

```cpp
let complex = {
    real: 1,
    image: 1
};
```

分数，

```cpp
let frac = {
    numerator: 1,
    denominator: 2
};
```

甚至是，用数据代替表达式，

```cpp
let arith = {
    optr: '+'
    leftOperand: 1,
    rightOperand: 2
};
```

以及，更多复杂的结构。

## 递归数据类型

看到这里也许你开始担忧了。什么是递归数据结构（Recursive Data Type）？

这里我们要拿前面提到的一个例子来说事儿了。

![list](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cons-cells.svg/320px-Cons-cells.svg.png)

看这张图，去掉这个list的第一个节点，结果得到的还是一个list。同样地，在这个节点上面再加一个节点，得到的也依然还是一个list。

也就是说，这个list的每一个节点大概对应到下面的结构：

```cpp
struct ListNode{
    int value;
    ListNode* next;
};
```

我们试着用这个结构建立一个列表。

```cpp
ListNode a{1, nullptr};
ListNode b{2, &a};
ListNode c{3, &b};
```

从`c`出发，我们就能够依次遍历完`b`、`a`，而且对于每一个节点，处理的方式基本一致。

```cpp
void printList(ListNode* list) {
    if(list == nullptr) return;
    std::cout << list->value;
    printList(list->next);
}
```

没错，list就是递归的。每一个list节点都包含一个list的引用。这样我们就能够利用递归来对其进行操作了。

比如我们想要构造一个新的list，也可以把他做成递归的。

```cpp
struct List{
    int value;
    shared_ptr<List> next;
}

shared_ptr<List> make_cell(int value, shared_ptr<List> next) {
    auto cell = make_shared<List>();
    cell->value = value;
    cell->next = next;
    return cell;
}

template<class ...Args>
shared_ptr<List> make_list(int value, Args... args) {
    return make_cell(value, make_list(args...));
}

template<>
shared_ptr<List> make_list(int value) {
    return make_cell(value, nullptr);
}
```

## 构造器（Constructor）

看我们的`make_cell`函数，其实就是创建了一个`shared_ptr`，然后再利用传入的参数来对cell中的数据进行初始化。当然这意思其实已经很明确了，`make_cell`作为创建一个新的cell结构的函数而存在。

但是这样未免太罗嗦，每次我创建一个struct的时候都要再去考虑怎么设计一个用来专门创建实例的函数。JavaScript提供了一种叫做构造器的函数，可以简化这个过程。加入了构造器的List定义如下：

```cpp
struct {
    int value;
    shared_ptr<List> next;

    List(int _value, shared_ptr<List> _next):
        value(_value), next(_next) {}
}
```

这里的构造器是说，我接受两个参数（`_next`, `_value`），然后用这两个参数去初始化JavaScript结构（struct）中的字段。

然后我们可以把整个make\_cell函数改成

```cpp
make_shared<List>(value, next);
```

构造器能够让我们以一种很直观的方式来创建和使用数据。 比如:

```cpp
struct User {
    std::string name;
    int age;
    double height;

    User(std::string _name, int _age, double _height):
        name(_name), age(_age), height(_height) {}
};

auto user = User{"Kimmy", 18, 178.0};
```

没错，这样看上去跟前面定义的Car类型没有什么区别。但是当结合上默认值参数以及需要在数据初始化的时候做一些其他操作的时候，构造器给提供了很直接的方案。后面我们会进一步地看到这种方案的优点。（当然你也可以去看一看什么是RAII。）

## 递归结构上的操作

好的我们回到刚刚的List上来。

我们已经可以通过make\_list来创建一个整数的列表了，那么，作为一个递归的结构，我们当然也可以通过递归来对齐定义一些操作。

比如把List里面的每一个元素做一个转换。

```cpp
shared_ptr<List> 
transform(shared_ptr<List> list, std::function<int(int)> transformer) {
    if(list == nullptr) return nullptr;
    return make_shared<List>(transformer(list->value), transform(list->next, tranformer))
}


// => {-1, -2, -3, -4, -5}
transform(make_list(1,2,3,4,5), [](int i) -> int { return -i; });
```

### 作为数据的过程（Procedure as data）

当然，看到上面那段代码你会是满头雾水。`std::function<int(int)>`是什么，`[](){}`放在一起又是什么。

回过头去想想，我们是不是可以定义一些过程，然后对这个过程进行调用，去做一些复杂的计算？同时，当我们需要进一步利用这些过程的时候，可以把它们直接当成数据拿来用的。于是我们可以约束他们的类型，然后根据这些约束再进一步地做抽象。

比如第三章中的pow，类型就是`std::function<int(int, int)>`，接收两个整数，返回他们的乘方，结果也是整数。

而有些时候我们可能并不只是需要拿已经就有的过程来简单地做抽象，所以更有必要提供一种方式让我们随时都能够创建一个过程。于是JavaScript给我们提供了Lambda表达式（Lambda Expression，在其他语言里面也可能叫做匿名函数/过程，Anonymous Function/Procedure），比如

```cpp
auto negate=[](int i) -> int{ return -i; };
```

我们就地创建了一个lambda表达式，然后把它赋值给了negate。这个lambda表达式所表示的就是一个匿名过程，它会接收一个整数，然后返回这个数的相反数。

于是当我们再去回过头看transform的时候，就不会觉得太突兀了。

```cpp
shared_ptr<List> 
transform(shared_ptr<List> list, std::function<int(int)> transformer) {
    if(list == nullptr) return nullptr;
    return make_shared<List>(transformer(list->value), transform(list->next, tranformer))
}
```

transform接收一个List和一个`int(int)`类型的transformer，然后在这个List上递归地对每一个元素执行transformer，得到一个新的结果，然后组成一个新的List。

## 树

好的我们来看另外一种递归数据类型，树。更确切地说，是二叉树（Binary Tree）。

```text
struct Tree {
    int value;
    shared_ptr<Tree> left;
    shared_ptr<Tree> right;

    Tree(int _v, shared_ptr<Tree> _l, shared_ptr<Tree> _r): 
        value(_v), left(_l), right(_r) {}
};
```

也就是说，Tree是这种结构，他的左侧是Tree，右侧也是Tree。而且Tree的每个节点都会带有一个value。

当然你还是会怀疑说这种无聊的结构拿来有什么用。那我们看下面的内容：

```text
             *
           /   \
          +     4
        /   \ 
       1     -
           /   \
          2     3
```

这个就是把 $$(1+(2-3))\times4$$作为一种树行结构来表示。

### 遍历（Traverse）

对于前面那个树形结构，我们可以试着从最顶端的节点写出他的value，然后再分别访问他的左右子树，按照这样的方式把所有的内容写出来，就能得到下面的结果：

```text
* + 1 - 2 3 4
```

这种表示方式又叫做该二叉树的先序遍历，又叫前序遍历。

然后我们可以把属于同一个树的部分用括号包起来，就得到了：

```scheme
(* (+ 1 (- 2 3)) 4)
```

没错这就是Lisp。

同样地，我们可以选择先一次访问一棵树的左右子树，然后再写出器对应的value，这样一层层递进下去。我们能够得到如下的结果：

```text
1 2 3 - + 4 *
```

如果你有了解过的话，就能看得出来这跟forth或者PostScript很像，当然他也叫上面那个二叉树的后序遍历。

当然还有一种叫做中序遍历的过程，得到的结果是：

```text
1 + 2 - 3 * 4
```

跟最初的算术表达式的区别就在于没有了括号。当然，本来表示的意思也丧失了。

对于前序遍历和后序遍历的结果，并不会改变整个表达式的语义，只是重新定义了这个表达式的解析方式。

> #### 练习
>
> 请尝试用代码实现先序、中序和后序遍历。

### 深度优先（Depth-First）和广度优先（Breath-First）

前面我们提到的遍历，是对整个树进行访问的过程。如果我们只需要从根节点出发，然后去寻找某个指定元素的话，可以有这样两种选择。

第一种是遇到有分支，我们就选择一个方向继续往前走，直到走到不能再继续，然后再一步步返回，同时在返回的过程中尝试其他的分支。

这种首先走到最底端然后再慢慢回来的过程叫做深度优先查找（Depth-First Search）。

比如前文中的那个表达式树，整个过程就是

```cpp
* + 1 <后退> - 2 <后退> 3 <后退> <后退> <后退> 4
```

也就是说，我们需要访问整个树才能查找到4。

另外一种方式是，遇到分支，我们先把对应的分支的每一个第一层先访问一遍，再一步步走到下一层。

这样的过程叫做广度优先查找（Breath-First Search）。比如

```cpp
* <下一层> + 4 <下一层> 1 - <下一层> 2 3
```

这个时候我们如果要查找4的话，只要在第一层就可以了。

### 栈（stack）与队列（queue）

我们仔细思考一下怎么实现DFS和BFS。

对于DFS，我们需要考虑如果找不到如何返回，所以我们可以先试着模拟一下DFS查找4的流程。

```cpp
path            description
==========      ==========
*               //step 1
* +             //step 2
* + 1           //step 3 and 1 has no childs
* +             //get back to +
* + -           //step 4
* + - 2         //step 5 and no childs
* + -           //get back to -
* + - 3         //step 6 and no childs
* + -           //get back to - and no more childs to visit
* +             //get back to + and no more childs to visit
*               //get back to *
* 4             //step 7 found!
```

可以看到，每次当遇到无法继续的节点，都会有一步回退操作，其实就是把path中加入进去内容的再取出来，这种一般最后进入但是最先退出（Last In First Out，LIFO）的结构我们常常称作是栈（stack）。栈通常会用来辅助实现一些拥有LIFO特性的过程，比如过程调用，也有一个对应的调用栈（call stack）。

比如当我们调用递归函数pow\(2, 5\)，对应的调用栈展开如下：

```cpp
pow(2, 5)                 => 2 * 2 * 2 * 2 * 2
    pow(2, 4)             => 2 * 2 * 2 * 2
        pow(2, 3)         => 2 * 2 * 2
            pow(2, 2)     => 2 * 2
                pow(2, 1) => 2
```

这也就是在第三章我提到“栈溢出”中的“栈”的含义。当一个调用栈太大而超出了当前系统规定的范围以后，就会造成这种问题。

我们接下来看BFS，模拟一下它查找3的流程：

```cpp
path            description
==========      ========== 
*               //step 1
* + 4           //push childs and move to next
+ 4             //step 2
+ 4 1 -         //push childs and move to next
4 1 -           //step 3 no childs move to next
1 -             //step 4 no childs move to next
-               //step 5
- 2 3           //push childs and move to next
2 3             //step 6 no childs move to next
3               //step 7 found!
```

与DFS的后进先出不同的是，BFS会把先放入的东西给拿出去，也就是先进先出（First In First Out，FIFO）。用于实现FIFO的结构我们一般叫做队列（queue）。当然队列的应用也很广泛，特别是需要考虑进入的先后顺序，通常都是作为一种特殊的队列来处理。

### 树

树反应了具有某种特定结构的层级关系。当然这种结构并不一定是只有两个分支的，也并不一定非得是考虑顺序的。当我们在建模的时候，遇到层级结构，就可以考虑设计成一棵树。另外，递归。

> #### 练习
>
> 尝试用代码实现DFS和BFS。

