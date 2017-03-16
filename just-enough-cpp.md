# 一点点C++入门知识

在开始之前，我们期望读者是有一定的编程基础的，了解基本的结构化程序设计思想，比如基本的执行结构和数据类型等。本书使用C++作为主要的编程语言，如果未曾有过相关学习经历，或者对C++的一些细节并不熟悉，这一章我们会对所用到的内容进行一些简短的介绍，以便于读者能够更好地理解后文的内容。如果你想了解关于更多的C++的知识，请参考Bjane Stroustrup的《The C++ Programming Language》或者Stanly Lipman的《C++ Primer》。

## 基本结构

让我们来看一个基本的C++程序。

```c++
#include <iostream>
#include <string>

int main() {
    std::string name = "Kimmy Leo";
    std::cout << "hello " << name;
}
```

