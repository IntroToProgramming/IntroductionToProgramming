# 环境搭建

## 什么是“环境”

这是给编程新手的教程，所以主要还是讲跟编程相关的事情。然而，所谓的编程，或者说程序设计（Programming），是一个很讲究的活动。不是随随便便就能进行的。就像做礼拜要沐浴斋戒一样，编程这活动也要一套仪式，和一些特殊的环境。

嗯，首先，去**洗手**。

然后[点击这里](http://sourceforge.net/projects/codeblocks/files/Binaries/13.12/Windows/codeblocks-13.12mingw-setup-TDM-GCC-481.exe)下载一个用来写代码的工具，然后安装。

> 人与人之间交互需要通过语言，人与计算机之间也是。按照目前的尿性，
> 作为程序员跟计算机交流的最直接的方式就是使用编程语言来说写代码（coding）。
>
> 这个“写”代码的笔和纸，对应到软件上来说就是一个`编辑器（Editor）`。
> 而要让计算机理解你写的代码，所需要的就是`编译器（Compiler）`[^1]。
>
> 刚刚让你下载的那个工具就是把这两者，以及更多的工具集成起来了。
> 它还有一个学名，叫`集成开发环境（Integrated Development Environment）`[^2]


## 测试搭建的环境

嗯，简单来说到这一步就已经完成了。但还是有太多的人不知道该怎么继续了。因为接下来是要接触一个全新的软件，不知所措。

好吧，让我们简单的来做些事情，测试一下这个环境是否能玩。

#### 新建项目

打开刚才下载的软件。

然后，点击
`File -> New -> Project -> Empty project-> Go -> Next`，然后输入Project title，随便一个你觉的靠谱的单词就好，比如`shit`，选择保存位置。接下来保持该有的选项不变，点击`Finish`。

> **刚刚发生了什么？**
>
> 其实没什么很奇怪的事情，就是你亲手新建了一个`project`（项目，也有些叫做工程），听起来是不是觉得很屌，你也是做过项目的人了。嗯，就是这样
> *****
> **那有什么用呢？**
>
> 项目是用来管理代码的一个基本单位。比如你刚刚新建的这个项目，就用来管理这套教程中的所有代码。当然需要注意的是，我们并不需要你死记或者是保存所有的代码，只要你在这个项目中一直按照我们的要求进行练习就好。

#### 添加代码

嗯，接下来我们需要一个写代码的空间。

点击`File -> New -> Empty File -> Yes`，输入一个`cpp`为后缀的文件名（比如`shit.cpp`），点击`OK`，然后再把下面的代码复制粘贴进去，按下`F9`键就可以玩了。

```c
#include <stdio.h>

int main()
{
    printf("Hello fresh shit!");
}
```

#### 这是什么鬼？

方今，你暂且不用知道这到底是干嘛用的。

也不用惊奇于为什么会有一个黑色的框框显示在电脑那儿。如果你英文功底好的话，就知道`print`是打印的意思，后面那个`f`其实是表示的`format`，至今我们还不需要了解这具体的意思。

又或者你可以去看[这里](https://en.wikipedia.org/wiki/C_%28programming_language%29)。

好的，接下来我们就要开始真正的编程了。

*******

#### 练习

请试着让下面这段代码[编译通过](http://stackoverflow.com/questions/18174988/how-can-i-add-c11-support-to-codeblocks-compiler)，并指出与原文中代码的不同：

```c++
#include <cstdio>

using namespace std;

auto main() -> int
{
    printf("Hello fresh shit!");
}
```

[^1]: https://en.wikipedia.org/wiki/Compiler
[^2]: https://en.wikipedia.org/wiki/Integrated_development_environment
