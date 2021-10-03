module.exports = {
    title: '编程导引',
    themeConfig: {
        nav: [
            {text: "编程导引", link: '/intro'},
        ],

        sidebar: [
            { text: "引言", link: "/intro" },
            { text: "环境", link: '/ch01_environment' },
            { text: "计算", link: '/ch02_computation' },
            { text: "过程", link: '/ch03_procedure' },
            { text: "编码", link: '/ch04_encoding' },
            { text: "序列", link: '/ch05_sequence' },
            { text: "数据", link: '/ch06_data' },
            { text: "状态", link: '/ch07_state' },
            { text: "引用", link: '/ch08_reference' },
            { text: "闭包", link: '/ch09_closure' },
            { text: "对象", link: '/ch10_object' },
            { text: "并发", link: '/ch11_concurrency' },
        ],
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
        ],
        [
            "script",
            {},

            `
window.MathJax = {
    tex: {
        inlineMath: [['$', '$']]
    },
    svg: {
        fontCache: 'global'
    }
};

(function () {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    document.head.appendChild(script);
})();
setInterval(() => window.MathJax.typeset(), 700);
`
        ],
    ]
}