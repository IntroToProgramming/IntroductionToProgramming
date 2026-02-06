const chaptersAndGuides = [
  {
    text: "目录",
    collapsed: false,
    items: [
      { text: "引言", link: "/chapters/intro" },
      { text: "环境", link: "/chapters/ch01_environment" },
      { text: "计算", link: "/chapters/ch02_computation" },
      { text: "过程", link: "/chapters/ch03_procedure" },
      { text: "编码", link: "/chapters/ch04_encoding" },
      { text: "序列", link: "/chapters/ch05_sequence" },
      { text: "数据", link: "/chapters/ch06_data" },
      { text: "状态", link: "/chapters/ch07_state" },
      { text: "引用", link: "/chapters/ch08_reference" },
      { text: "闭包", link: "/chapters/ch09_closure" },
      { text: "对象", link: "/chapters/ch10_object" },
      { text: "并发", link: "/chapters/ch11_concurrency" },
      { text: "练习答案与提示", link: "/chapters/answers" },
    ],
  },
  {
    text: "附录",
    collapsed: true,
    items: [
      { text: "工具上手", link: "/guides/" },
      { text: "浏览器开发者工具与 Console", link: "/guides/browser-devtools" },
      { text: "安装与上手 VS Code", link: "/guides/vscode" },
      {
        text: "安装 Node.js 并在 VS Code 运行 JavaScript",
        link: "/guides/nodejs",
      },
      { text: "TypeScript 入门：安装、编译与运行", link: "/guides/typescript" },
    ],
  },
];

module.exports = {
  title: "编程导引",
  themeConfig: {
    nav: [
      { text: "编程导引", link: "/chapters/intro" },
      { text: "参考", link: "/reference/glossary" },
    ],

    sidebar: {
      "/chapters/": chaptersAndGuides,
      "/reference/": [{ text: "概念解释", link: "/reference/glossary" }],
      "/guides/": chaptersAndGuides,
    },
    footer: {
      message: "CC-BY 4.0 Licensed",
      copyright:"Copyright © 2015-present Kimmy Liu",
    },
  },

  markdown: {
    math: true,
  },

  head: [
    [
      "script",
      {},

      `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?bc2f9f80827718f41c02c33dc45976cb";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
            `,
    ],
  ],
};
