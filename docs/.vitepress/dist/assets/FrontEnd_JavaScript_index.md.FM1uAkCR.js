import{_ as e,o as a,c as i,R as d}from"./chunks/framework.geGBmoNB.js";const f=JSON.parse('{"title":"js基础知识","description":"","frontmatter":{},"headers":[],"relativePath":"FrontEnd/JavaScript/index.md","filePath":"FrontEnd/JavaScript/index.md"}'),s={name:"FrontEnd/JavaScript/index.md"},n=d(`<h1 id="js基础知识" tabindex="-1">js基础知识 <a class="header-anchor" href="#js基础知识" aria-label="Permalink to &quot;js基础知识&quot;">​</a></h1><h2 id="js中的数据类型" tabindex="-1">js中的数据类型 <a class="header-anchor" href="#js中的数据类型" aria-label="Permalink to &quot;js中的数据类型&quot;">​</a></h2><h3 id="基本数据类型" tabindex="-1">基本数据类型 <a class="header-anchor" href="#基本数据类型" aria-label="Permalink to &quot;基本数据类型&quot;">​</a></h3><p>es5之前有五种：<code>Null</code>、<code>Undefined</code>、<code>Boolean</code>、<code>Number</code>、<code>String</code></p><p>es6之后新增两种：<code>Symbol</code>（独一无二的值）、<code>BigInt</code>（任意大的整数）</p><h3 id="引用数据类型" tabindex="-1">引用数据类型 <a class="header-anchor" href="#引用数据类型" aria-label="Permalink to &quot;引用数据类型&quot;">​</a></h3><p><code>Object</code>类型, 包含<code>Object</code>、<code>Array</code>、<code>Function</code>、<code>Date</code>、<code>RegExp</code>、<code>Map</code>、<code>Set</code>等。</p><h2 id="null和undefined的区别" tabindex="-1">null和undefined的区别 <a class="header-anchor" href="#null和undefined的区别" aria-label="Permalink to &quot;null和undefined的区别&quot;">​</a></h2><h3 id="相同点" tabindex="-1">相同点 <a class="header-anchor" href="#相同点" aria-label="Permalink to &quot;相同点&quot;">​</a></h3><ul><li><p><code>null</code>和<code>undefined</code>都是基本数据类型，都分别只有一个值<code>null</code>和<code>undefined</code></p></li><li><p>在<code>if</code>语句中，<code>null</code>和<code>undefined</code>都会转换为<code>false</code></p></li><li><p>两者在<code>==</code>运算中也相等，即:</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> undefined</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 但是两者都不等于false</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // false</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">undefined</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // false</span></span></code></pre></div><h3 id="不同点" tabindex="-1">不同点 <a class="header-anchor" href="#不同点" aria-label="Permalink to &quot;不同点&quot;">​</a></h3><ul><li><p><code>null</code>表示空对象，也作为<strong>对象原型的终点</strong>，主要用于给一些变量赋初始值</p></li><li><p><code>undefined</code>表示未定义，一下情况下为<code>undefined</code>:</p><ul><li><p>定义了形参，未传递实参，则参数为<code>undefined</code></p></li><li><p>定义了变量，但未赋值，则变量为<code>undefined</code></p></li><li><p>对象属性名不存在，返回值为<code>undefined</code></p></li><li><p>函数没有返回值，则返回<code>undefined</code></p></li></ul></li></ul>`,13),l=[n];function o(c,t,h,p,r,u){return a(),i("div",null,l)}const _=e(s,[["render",o]]);export{f as __pageData,_ as default};
