module.exports = {
    title: '编程导引',
    themeConfig: {
        nav: [
            {text: "编程导引", link: '/chapters/intro'},
            {text: "参考", link: '/reference/glossary'},
        ],

        sidebar: {
            "/chapters/": [
                { text: "引言", link: "/chapters/intro" },
                { text: "环境", link: '/chapters/ch01_environment' },
                { text: "计算", link: '/chapters/ch02_computation' },
                { text: "过程", link: '/chapters/ch03_procedure' },
                { text: "编码", link: '/chapters/ch04_encoding' },
                { text: "序列", link: '/chapters/ch05_sequence' },
                { text: "数据", link: '/chapters/ch06_data' },
                { text: "状态", link: '/chapters/ch07_state' },
                { text: "引用", link: '/chapters/ch08_reference' },
                { text: "闭包", link: '/chapters/ch09_closure' },
                { text: "对象", link: '/chapters/ch10_object' },
                { text: "并发", link: '/chapters/ch11_concurrency' }    
            ],
            "/reference/": [
                { text: "概念解释", link: "/reference/glossary"}
            ]
        },
        footer: {
            copyright: "CC-BY 4.0 Licensed | Copyright © 2015-present Kimmy Leo"
        },
    },
    
    markdown: {
        math: true
    },

    
    head: [
        [
            "script",
            {},

            `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?c522f795b036ecc6e5446ce20e40ae9f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
            `
        ]
    ]
}