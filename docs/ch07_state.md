# 状态

程序中的很多数据往往是在不停地变化的，比如时间，比如与用户的交互，又比如，一些程序运行中产生和保存的数据。当一些可变的数据或者对象是发生改变的时候，我们就可以说它们从一个状态转换到了另一个状态。

一个简单的例子就是迭代器（iterator）。这个JavaScript里面非常重要的概念，就是一个典型的可变对象。每一次需要向前或者向后访问一个序列的元素的时候，都需要改变一下迭代器的状态。
