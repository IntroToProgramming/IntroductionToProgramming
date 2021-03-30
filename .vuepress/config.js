module.exports = {
    title: '编程导引',
    themeConfig: {
        nav: [
            {text: "编程导引", link: '/book/'},
        ],

        sidebar: [
            '/book/',
            '/book/ch.01.environment',
            '/book/ch.02.computation',
            '/book/ch.03.procedure',
            '/book/ch.04.encoding',
            '/book/ch.05.sequence',
            '/book/ch.06.data',
            '/book/ch.07.state',
            '/book/ch.08.reference',
            '/book/ch.09.closure',
            '/book/ch.10.object',
            '/book/ch.11.concurrency',
        ],
    },
    markdown: {
        extendMarkdown: md => {
            md.use(require('@area403/markdown-it-mathjax'));
        },
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