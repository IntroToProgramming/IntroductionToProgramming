# 数据

很多时候我们要处理的东西并不只是一个简单的数据，或者是一个由多个数据组成的简单序列。比如，当我们要考虑一间房子，关注的是户型、面积和位置等，考虑一辆汽车，关注的是性价比、能耗和易用性等，考虑一个学生，关注的是他的学号、姓名、各科成绩等。

很多时候我们也需要考虑一系列的符号，比如房屋的户型、汽车的品牌，这些在一定程度上固定的内容，并不需要专门去用字符串处理。

这种时候，序列、引用和各种标量（Scalar）类型都不能很好的满足我们的需要。

我们来做一个简单的示范吧。

## 结构

比如，我们要表示一辆车，其中包括他的品牌、价格和最高时速。在当前的情况下，最合适的方式就是采用长度为3的array，约定好第0位表示品牌，第1位表示价格，第2位表示最高时速。于是我们可以得到以下的设计：

```c++
using Car=std::array<int, 3>;  // make type alias

Car make_car(int brand, int price, int speed) {
    return Car {brand, price, speed};
}

int brand(const Car& car) {
    return car[0];
}

int price(const Car& car) {
    return car[1];
}

int speed(const Car& car) {
    return car[2];
}
```
于是我们就能够很轻松地（并丑陋地）表示汽车了。

这种写法虽然算是比较方便，但是还是有很多问题的。

比如，每次我们都需要多写很多个函数，比如所有的元素都必须是同一个类型的。

所以大多数编程语言都提供结构（Structure）或者记录（Record）类型，来简化我们实现这个的过程。

比如，在C++中我们可以很简单的把Car表示如下：
```c++
struct Car {
    string brand;
    int price;
    int speed;
}; // 不要忘了这里的分号
```
这是一个结构（struct），其中包含了三个域（field，也叫字段）。比起还要反复地写各种函数来，要简单和方便很多。
而且，各个字段的类型可以不同。

这样子我们就能通过Car来表示一辆汽车了：
```c++
Car car = {"TOYOTA", 120000, 180};

std::cout << car.brand;
```
很简单吧。

那么，结构的本质到底是什么呢？

回到本章开始我们的讨论。房子、汽车、学生，这些概念性的实体（Entity）都有一些自己本身的属性（Property），以及与其他实体之间的关系（Relation）。
我们可以给这些实体的属性和关系贴上一个个标签，把他们与所属的实体之间关联起来。这样就组成了我们现在看到的结构。

当然，他还是数据，但是这些数据通过我们贴上不同的标签以及把他们关联组合，就变成了更加具有实际意义的内容。换句话说，我们给一块二进制内存区赋予了语义（Semantics）。

来让我们看一下其他的许多结构吧。

复数，
```c++
struct Complex {
    int real;
    int imag;
};
```
分数，
```c++
struct Fractional {
    int numerator;
    int denominator;
};
```
甚至是，用数据代替表达式，
```c++
struct ArithmaticExpression {
    Operator optr;
    int leftOperand;
    int rightOperand;
};
```
以及，更多复杂的结构。

## 递归数据类型

看到这里也许你开始担忧了。什么是递归数据结构（Recursive Data Type）？

这里我们要拿前面提到的一个例子来说事儿了。

![list](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cons-cells.svg/320px-Cons-cells.svg.png)

看这张图，去掉这个list的第一个节点，结果得到的还是一个list。同样地，在这个节点上面再加一个节点，得到的也依然还是一个list。

也就是说，这个list的每一个节点大概对应到下面的结构：
```c++
struct ListNode{
    int value;
    ListNode* next;
};
```

我们试着用这个结构建立一个列表。
```c++
ListNode a{1, nullptr};
ListNode b{2, &a};
ListNode c{3, &b};
```
从`c`出发，我们就能够依次遍历完`b`、`a`，而且对于每一个节点，处理的方式基本一致。
```c++
void printList(ListNode* list) {
    if(list == nullptr) return;
    std::cout << list->value;
    printList(list->next);
}
```
没错，list就是递归的。每一个list节点都包含一个list的引用。这样我们就能够利用递归来对其进行操作了。

比如我们想要构造一个新的list，也可以把他做成递归的。

```c++
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

但是这样未免太罗嗦，每次我创建一个struct的时候都要再去考虑怎么设计一个用来专门创建实例的函数。C++提供了一种叫做构造器的函数，可以简化这个过程。加入了构造器的List定义如下：
```c++
struct {
    int value;
    shared_ptr<List> next;
    
    List(int _value, shared_ptr<List> _next):
        value(_value), next(_next) {}
}
```
这里的构造器是说，我接受两个参数（`_next`, `_value`），然后用这两个参数去初始化C++结构（struct）中的字段。

然后我们可以把整个make_cell函数改成
```c++
make_shared<List>(value, next);
```
构造器能够让我们以一种很直观的方式来创建和使用数据。
比如:
```c++
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

## Fold

好的我们回到刚刚的List上来。

我们已经可以通过make_list来创建一个整数的列表了，那么，作为一个递归的结构，我们当然也可以通过递归来对齐定义一些操作。

比如把List里面的每一个元素做一个转换。
```c++
shared_ptr<List> 
transform(shared_ptr<List> list, std::function<int(int)> transformer) {
    if(list == nullptr) return nullptr;
    return make_shared<List>(transformer(list->value), transform(list->next, tranformer))
}


// => {-1, -2, -3, -4, -5}
transform(make_list(1,2,3,4,5), [](int i){ return -i; });
```

#### 作为数据的过程（Procedure as data）
当然，看到上面那段代码你会是满头雾水。`std::function<int(int)>`是什么，`[](){}`放在一起又是什么。

回过头去想想，我们是不是可以定义一些过程，然后对这个过程进行调用，去做一些复杂的计算？同时，当我们需要进一步利用这些过程的时候，可以把它们直接当成数据拿来用的。