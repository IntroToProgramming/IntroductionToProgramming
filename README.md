# 引言

## 编程

编程（Programming）是一项创造性的活动，如同创作（Composing）、绘画（Painting）等一样。我们常常会通过一系列的步骤把所需要的部件进行组合，得到另一个期望的结构，或者是解决一个实际性的问题。表达和构建这些步骤的过程，就是编程（当然，在脱离程序语言以后，也可以把它叫做**规划**（Programme））。

我们会简单地把一件件小事按**顺序**做，这样一件件小事的组合以后就可以完成一件更大的事情。比如我们会切菜，生火，炒菜，煮饭，这样我们就能够做出一顿午餐。

当然在这个过程中可能会设计一些**计算**。我们会考虑，需要放几勺盐和几把米，以适合最后吃午餐的人的营养均衡。在特殊的时候，甚至需要精确到毫克级别的营养规划，以及不同人的营养结构的差异等。我们会在第二节探讨关于计算，以及计算的**组合**等相关问题。

在规划和解决问题的时候可能并不是一帆风顺的，有时候我们会面临各种抉择。比如，考虑明天下午吃素还是吃荤，吃鸡肉和还是鱼肉，吃宫保鸡丁还是鱼香肉丝等等。有比如，在我们准备吃鱼香肉丝的时候发现没有鱼了，又该怎么办。

在任何需要做选择的时候，作为一个程序员（**规划师**），你不应该出现选择困难症。因为任何一个涵待解决的问题都必须得到解决之后才能让这个程序正常地执行。所以，我们在第三章中会探讨关于过程设计，以及如何利用循环和选择等手法来设计一个完善的程序的相关问题。

但是做饭的时候你是怎么区分盐和砂糖、醋和酱油的呢？当然你会说每个都尝一遍，但是这样既有可能浪费，又不卫生。所以习惯性地我们会关注这些材料瓶上面的标签，从上面知道我们用的是什么东西。当然对于读不懂标签的计算机来说，这些材料作为商品的时候都会有固定的条形码，这个条形码也能够让计算机知道一个被它看到的东西代表着什么。因为它知道这些条码是如何**编码**（Encoding）的。

当你遇到大量具有相同组件的时候，可以考虑用**序列**（Sequence）或者列表（List）来安排这些组件。比如做一道菜的每一个步骤对应在菜谱上的每一项。或者是在处理具有层级结构以及更复杂的关联的结构的时候采用树和图来组织。比如六度关系理论，实际上就是一张非常大的图（Graph）。

有时候会考虑到一部分组件是可变的。比如时间总是流逝的，人总会长大的。当我们尝试描述一个组件改变的时候，就引入了状态。这种时候我们更希望能够把改变的数据和相应的操作做一个绑定，这样子绑定了组件的操作就可以看成一个闭包。简单地比如一个计数器。当在组件上面绑定更多操作的时候，就可以把它看作一个**对象**。

可变的状态可能会带来的一个问题就是，如果有多个人尝试同时去修改这个状态的时候，会造成结果的不一致性。比如，一个没有加入事务处理的银行账户，两个人同时在进行操作，账户中原有1000元，甲存入了200块，但在甲存入200块还未完成的同时乙取出了200块。这种时候会有几种可能的结果，第一种就是甲先于乙完成操作，结果就是账户余额变成了800块，凭空损失了200块；另外一种就是乙先于甲完成了操作，结果账户余额就变成了甲操作的结果，1200块，凭空多出来400块。这种问题就属于**并发**（Concurrency）。

  ## C++

本书选择使用C++来讲述编程中的各种思想和概念。

我们并不是在讲述C++这门编程语言，只是通过C++和其提供的丰富的方便特性，来讲述关于“程序设计”的内容。任何与C++细节相关的东西，可以参考[C++ Reference](http://en.cppreference.com/w/)或者Bjarne Stroustrup的《The C++ Programming Language(4th Edition)》，对于特定的主题，我也会专门列出可以参阅的链接。[StackOverflow](http://stackoverflow.com/questions/tagged/c%2b%2b)上也有丰富的资源来解答你的疑惑。如果要深入学习C++，推荐你去看我的私货：[C++: From Novice to Professional](http://www.douban.com/doulist/4041785/)。

任何一个编程语言需要特定的运行环境，如果你已经拥有Visual Studio 2013(update 4)以及以上的版本，或者拥有一个支持 gcc4.8+ / clang3.1+ 编译套件的环境，我们需要改环境至少支持[C++11（ISO/IEC 14882:2011）](https://en.wikipedia.org/wiki/C%2B%2B11)。如果你还没有，或者不确定是否拥有符合条件的编译环境，我们推荐你去下载[Visual Studio 2015 Community Edition](https://www.visualstudio.com/products/visual-studio-community-vs)或者[Code::Blocks](http://www.codeblocks.org/downloads/binaries)，对于Mac用户，建议你可以使用Xcode IDE。当然如果您更偏好使用心爱的编辑器写代码然后在终端编译的话，也是值得一试的。

## 更新状态

 * 第一章 环境搭建 (done)
 * 第二章 计算 Computation (done)
 * 第三章 过程 Procedural (done)
 * 第四章 编码 Encoding (done)
 * 第五章 序列 Sequence (done)
 * 第六章 引用 Reference
 * 第七章 数据 Data (done)
 * 第八章 状态 State (prepared)
 * 第九章 闭包
 * 第十章 对象 Object (prepared)
 * 第十一章
 * 第十二章
 * more...

## 参与贡献

本书的源码托管在[github:kenpusney/i2p-the-book](https://github.com/kenpusney/i2p-the-book)仓库，你可以提交issue或者pull request贡献和改进本书。

## 支持我

#### 关注我的公众号获取更新：

<img alt="微信公众号" src="http://wiki.kimleo.net/images/qrcode_for_gh_5d5d484e7445_430.jpg" width="256"/>

#### 通过支付宝资助我创作：

![支付宝](https://mobilecodec.alipay.com/show.htm?code=ap69z5d4uik0zvec89&picSize=S)

或点击<script data-gratipay-username="kenpusney"
        data-gratipay-widget="button"
        src="//grtp.co/v1.js"></script>给予帮助。

###### 特别感谢以下朋友的资助
  - [esrever10](https://github.com/esrever10)
  - [karakapi](https://github.com/karakapi)
  - [负一的平方根](http://sqrt-1.me)
  - [linkgod](http://www.linkgod.net)
