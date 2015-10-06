# 对象

广义地讲，任何一个在程序中出现的元素都被称作对象。于是对象也拥有自己的类型，比如整数对象、类型对象（对象的类型也算是类型，first-class type）以及函数对象等。

但是对象在另外一个编程流派也有着特殊的含义。

## 面向对象编程（Object-Oriented Programming）

面向对象编程是当前比较热门的一个编程范式（Programming Paradigm）。主要涉及通过抽象（abstraction）和多态（polymorphism）来进行程序建模和设计，以达到组件（Component）复用的目的。

简单地讲，就是面向对象会通过一种方式来定义一些共有的接口和符合接口的操作，然后通过对这些接口的实现来完成一些具有公共特性但细节上略有不一致的行为。

先看一个简单的例子。

不同的车（Vehicle）都可以走（Run），包括汽车（Car）、卡车（Truck）、推车（Wagon）等等。

我们可以简单地描述这种关系：
```c++
// Pseudo code
interface Vehicle {
    void Run();
}

class Car is Vehicle {
    void Run() override { ... }
}

class Truck is Vehicle {
    void Run() override { ... }
}

class Wagon is Vehicle {
    void Run() override { ... }
}


Vehicle v = new Car{} // or new Wagon/Truck

v->Run(); // run specific Run prodeure
```

## 基于继承（Inheritance）的多态



## 基于泛型（Generics）的多态

