---
description: 简单介绍下JavaScript编程语言，以及对应的环境准备工作。
---

# 环境

## JavaScript

JavaScript是目前使用最广泛的编程语言之一。作为互联网和移动计算时代的基础支撑语言，从基本的生产力工具，到日常的泛娱乐平台，它活跃在每一次你浏览网站、使用App的过程中，提供基本的运算和流程保障。

JavaScript的诞生和发展也颇具传奇色彩，Brendan Eich在几天的时间内设计并实现了这门编程语言，影响了后面几十年的软件和技术的发展。如今几乎每一个设备都接入了JavaScript，深入到了我们生活的方方面面。作为一门工业级的编程语言，JavaScript由欧洲计算机制造商协会（ECMA）制定标准化的行为和定义，来规范这个语言的使用和发展方向。TC39技术委员会也一直在更新JavaScript的功能，让这个有二十多年历史的旧技术不断焕发新的活力。

JavaScript的环境触手可及。在电脑端你可以随时打开一个现代的浏览器，页面上右键菜单中选择“Inspect”或者“查看/检查元素”，选择“控制台（Console）”标签。如果你是在移动端或者浏览器不支持，也可以通过一些工具比如[移动端Console](http://code.hnldesign.nl/demo/hnl.MobileConsole.html)来体验JavaScript控制台。

## 编写代码

当需要写大量代码组合使用的时候，你可以通过本地编辑Web页面的方式来编写JavaScript代码。JavaScript是Web端的基本编程语言，可以稳定地运行在大多数现代浏览器中。

通过文件编辑器创建下面的代码，命名为`index.html`

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>Introduction to Programming</title>
</head>
<body>
    <script type="text/javascript">
        console.log("hello world");
    </script>
</body>
</html>
```

在`<script ...>`和`</script>`之间，就是你编写JavaScript代码的地方。编写完成后，用浏览器打开（或者刷新）这个文件，就能看到对应的效果和执行内容。

比如上面的代码，就是在控制台打印“hello world”。

本书推荐使用[Visual Studio Code](https://code.visualstudio.com/)作为基本的代码编辑工具。你可以在官网进行下载和安装。官网也有详细的使用教程。

MDN 中对[浏览器开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Discover_browser_developer_tools)和[基本的工具软件](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Installing_basic_software)有更为完整的介绍，可以参考。如果你想了解更多关于Web设计和开发的知识，MDN也有完备的文档供参考。

一切准备就绪的话，我们就开始吧。
