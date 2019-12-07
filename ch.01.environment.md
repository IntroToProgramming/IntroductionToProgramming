---
description: 简单介绍下JavaScript编程语言，以及对应的环境准备工作。
---

# 环境

## JavaScript

JavaScript是目前使用最广泛的编程语言之一。作为互联网和移动计算时代的基础支撑语言，它活跃在每一次你浏览网站、App的过程中，提供基本的运算和流程保障。JavaScript的环境触手可及。在电脑端你可以随时打开一个现代的浏览器，页面上右键菜单中选择“Inspect”或者“查看/检查元素”，选择“控制台（Console）”标签。如果你是在移动端或者浏览器不支持，也可以通过一些工具比如[移动端Console](http://code.hnldesign.nl/demo/hnl.MobileConsole.html)来体验JavaScript控制台。

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