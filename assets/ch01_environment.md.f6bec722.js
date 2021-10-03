import{_ as a,c as n,o as s,d as t}from"./app.2fe5d9c1.js";const h='{"title":"\u73AF\u5883","description":"\u7B80\u5355\u4ECB\u7ECD\u4E0BJavaScript\u7F16\u7A0B\u8BED\u8A00\uFF0C\u4EE5\u53CA\u5BF9\u5E94\u7684\u73AF\u5883\u51C6\u5907\u5DE5\u4F5C\u3002","frontmatter":{"description":"\u7B80\u5355\u4ECB\u7ECD\u4E0BJavaScript\u7F16\u7A0B\u8BED\u8A00\uFF0C\u4EE5\u53CA\u5BF9\u5E94\u7684\u73AF\u5883\u51C6\u5907\u5DE5\u4F5C\u3002"},"headers":[{"level":2,"title":"JavaScript","slug":"javascript"},{"level":2,"title":"\u7F16\u5199\u4EE3\u7801","slug":"\u7F16\u5199\u4EE3\u7801"}],"relativePath":"ch01_environment.md","lastUpdated":1633282284489}',p={},e=t(`<h1 id="\u73AF\u5883" tabindex="-1">\u73AF\u5883 <a class="header-anchor" href="#\u73AF\u5883" aria-hidden="true">#</a></h1><h2 id="javascript" tabindex="-1">JavaScript <a class="header-anchor" href="#javascript" aria-hidden="true">#</a></h2><p>JavaScript\u662F\u76EE\u524D\u4F7F\u7528\u6700\u5E7F\u6CDB\u7684\u7F16\u7A0B\u8BED\u8A00\u4E4B\u4E00\u3002\u4F5C\u4E3A\u4E92\u8054\u7F51\u548C\u79FB\u52A8\u8BA1\u7B97\u65F6\u4EE3\u7684\u57FA\u7840\u652F\u6491\u8BED\u8A00\uFF0C\u4ECE\u57FA\u672C\u7684\u751F\u4EA7\u529B\u5DE5\u5177\uFF0C\u5230\u65E5\u5E38\u7684\u6CDB\u5A31\u4E50\u5E73\u53F0\uFF0C\u5B83\u6D3B\u8DC3\u5728\u6BCF\u4E00\u6B21\u4F60\u6D4F\u89C8\u7F51\u7AD9\u3001\u4F7F\u7528App\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u63D0\u4F9B\u57FA\u672C\u7684\u8FD0\u7B97\u548C\u6D41\u7A0B\u4FDD\u969C\u3002</p><p>JavaScript\u7684\u8BDE\u751F\u548C\u53D1\u5C55\u4E5F\u9887\u5177\u4F20\u5947\u8272\u5F69\uFF0CBrendan Eich\u5728\u51E0\u5929\u7684\u65F6\u95F4\u5185\u8BBE\u8BA1\u5E76\u5B9E\u73B0\u4E86\u8FD9\u95E8\u7F16\u7A0B\u8BED\u8A00\uFF0C\u5F71\u54CD\u4E86\u540E\u9762\u51E0\u5341\u5E74\u7684\u8F6F\u4EF6\u548C\u6280\u672F\u7684\u53D1\u5C55\u3002\u5982\u4ECA\u51E0\u4E4E\u6BCF\u4E00\u4E2A\u8BBE\u5907\u90FD\u63A5\u5165\u4E86JavaScript\uFF0C\u6DF1\u5165\u5230\u4E86\u6211\u4EEC\u751F\u6D3B\u7684\u65B9\u65B9\u9762\u9762\u3002\u4F5C\u4E3A\u4E00\u95E8\u5DE5\u4E1A\u7EA7\u7684\u7F16\u7A0B\u8BED\u8A00\uFF0CJavaScript\u7531\u6B27\u6D32\u8BA1\u7B97\u673A\u5236\u9020\u5546\u534F\u4F1A\uFF08ECMA\uFF09\u5236\u5B9A\u6807\u51C6\u5316\u7684\u884C\u4E3A\u548C\u5B9A\u4E49\uFF0C\u6765\u89C4\u8303\u8FD9\u4E2A\u8BED\u8A00\u7684\u4F7F\u7528\u548C\u53D1\u5C55\u65B9\u5411\u3002TC39\u6280\u672F\u59D4\u5458\u4F1A\u4E5F\u4E00\u76F4\u5728\u66F4\u65B0JavaScript\u7684\u529F\u80FD\uFF0C\u8BA9\u8FD9\u4E2A\u6709\u4E8C\u5341\u591A\u5E74\u5386\u53F2\u7684\u65E7\u6280\u672F\u4E0D\u65AD\u7115\u53D1\u65B0\u7684\u6D3B\u529B\u3002</p><p>JavaScript\u7684\u73AF\u5883\u89E6\u624B\u53EF\u53CA\u3002\u5728\u7535\u8111\u7AEF\u4F60\u53EF\u4EE5\u968F\u65F6\u6253\u5F00\u4E00\u4E2A\u73B0\u4EE3\u7684\u6D4F\u89C8\u5668\uFF0C\u9875\u9762\u4E0A\u53F3\u952E\u83DC\u5355\u4E2D\u9009\u62E9\u201CInspect\u201D\u6216\u8005\u201C\u67E5\u770B/\u68C0\u67E5\u5143\u7D20\u201D\uFF0C\u9009\u62E9\u201C\u63A7\u5236\u53F0\uFF08Console\uFF09\u201D\u6807\u7B7E\u3002\u5982\u679C\u4F60\u662F\u5728\u79FB\u52A8\u7AEF\u6216\u8005\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u4E00\u4E9B\u5DE5\u5177\u6BD4\u5982<a href="http://code.hnldesign.nl/demo/hnl.MobileConsole.html" target="_blank" rel="noopener noreferrer">\u79FB\u52A8\u7AEFConsole</a>\u6765\u4F53\u9A8CJavaScript\u63A7\u5236\u53F0\u3002</p><h2 id="\u7F16\u5199\u4EE3\u7801" tabindex="-1">\u7F16\u5199\u4EE3\u7801 <a class="header-anchor" href="#\u7F16\u5199\u4EE3\u7801" aria-hidden="true">#</a></h2><p>\u5F53\u9700\u8981\u5199\u5927\u91CF\u4EE3\u7801\u7EC4\u5408\u4F7F\u7528\u7684\u65F6\u5019\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u672C\u5730\u7F16\u8F91Web\u9875\u9762\u7684\u65B9\u5F0F\u6765\u7F16\u5199JavaScript\u4EE3\u7801\u3002JavaScript\u662FWeb\u7AEF\u7684\u57FA\u672C\u7F16\u7A0B\u8BED\u8A00\uFF0C\u53EF\u4EE5\u7A33\u5B9A\u5730\u8FD0\u884C\u5728\u5927\u591A\u6570\u73B0\u4EE3\u6D4F\u89C8\u5668\u4E2D\u3002</p><p>\u901A\u8FC7\u6587\u4EF6\u7F16\u8F91\u5668\u521B\u5EFA\u4E0B\u9762\u7684\u4EE3\u7801\uFF0C\u547D\u540D\u4E3A<code>index.html</code></p><div class="language-html"><pre><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-cn<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Introduction to Programming<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/javascript<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>\u5728<code>&lt;script ...&gt;</code>\u548C<code>&lt;/script&gt;</code>\u4E4B\u95F4\uFF0C\u5C31\u662F\u4F60\u7F16\u5199JavaScript\u4EE3\u7801\u7684\u5730\u65B9\u3002\u7F16\u5199\u5B8C\u6210\u540E\uFF0C\u7528\u6D4F\u89C8\u5668\u6253\u5F00\uFF08\u6216\u8005\u5237\u65B0\uFF09\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u5C31\u80FD\u770B\u5230\u5BF9\u5E94\u7684\u6548\u679C\u548C\u6267\u884C\u5185\u5BB9\u3002</p><p>\u6BD4\u5982\u4E0A\u9762\u7684\u4EE3\u7801\uFF0C\u5C31\u662F\u5728\u63A7\u5236\u53F0\u6253\u5370\u201Chello world\u201D\u3002</p><p>\u672C\u4E66\u63A8\u8350\u4F7F\u7528<a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">Visual Studio Code</a>\u4F5C\u4E3A\u57FA\u672C\u7684\u4EE3\u7801\u7F16\u8F91\u5DE5\u5177\u3002\u4F60\u53EF\u4EE5\u5728\u5B98\u7F51\u8FDB\u884C\u4E0B\u8F7D\u548C\u5B89\u88C5\u3002\u5B98\u7F51\u4E5F\u6709\u8BE6\u7EC6\u7684\u4F7F\u7528\u6559\u7A0B\u3002</p><p>MDN \u4E2D\u5BF9<a href="https://developer.mozilla.org/zh-CN/docs/Learn/Discover_browser_developer_tools" target="_blank" rel="noopener noreferrer">\u6D4F\u89C8\u5668\u5F00\u53D1\u8005\u5DE5\u5177</a>\u548C<a href="https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/Installing_basic_software" target="_blank" rel="noopener noreferrer">\u57FA\u672C\u7684\u5DE5\u5177\u8F6F\u4EF6</a>\u6709\u66F4\u4E3A\u5B8C\u6574\u7684\u4ECB\u7ECD\uFF0C\u53EF\u4EE5\u53C2\u8003\u3002\u5982\u679C\u4F60\u60F3\u4E86\u89E3\u66F4\u591A\u5173\u4E8EWeb\u8BBE\u8BA1\u548C\u5F00\u53D1\u7684\u77E5\u8BC6\uFF0CMDN\u4E5F\u6709\u5B8C\u5907\u7684\u6587\u6863\u4F9B\u53C2\u8003\u3002</p><p>\u4E00\u5207\u51C6\u5907\u5C31\u7EEA\u7684\u8BDD\uFF0C\u6211\u4EEC\u5C31\u5F00\u59CB\u5427\u3002</p>`,14),o=[e];function c(l,r,i,u,k,d){return s(),n("div",null,o)}var _=a(p,[["render",c]]);export{h as __pageData,_ as default};
