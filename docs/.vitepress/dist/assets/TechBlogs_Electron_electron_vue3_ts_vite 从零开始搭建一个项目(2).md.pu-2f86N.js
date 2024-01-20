import{_ as n,o as s,c as e,R as a}from"./chunks/framework.geGBmoNB.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(2).md","filePath":"TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(2).md"}'),t={name:"TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(2).md"},p=a(`<p><strong>上一节我们讲到了从零搭建一个<code>electron+vue+ts+vite</code>的项目，这一节我将介绍几个好用的工具，来帮助我们更好的开发electron项目。</strong></p><hr><p><strong>首先 ，我们在<code>main.ts</code>中加上这段代码：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// main.ts</span></span>
<span class="line"><span>···</span></span>
<span class="line"><span>// 判断当前环境是否为开发环境</span></span>
<span class="line"><span>if (process.env.NODE_ENV === &quot;development&quot;) {</span></span>
<span class="line"><span>  // 当处于开发环境时，页面加载本地服务，并自动打开开发者工具</span></span>
<span class="line"><span>  mainWindow.loadURL(&quot;http://localhost:5173&quot;);</span></span>
<span class="line"><span>  mainWindow.webContents.openDevTools();</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  // 否则页面加载打包后的index.html文件</span></span>
<span class="line"><span>  mainWindow.loadFile(path.join(__dirname, &quot;./index.html&quot;));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>···</span></span></code></pre></div><p><strong>这段代码中我们希望通过判断开发环境来加载不同的服务或文件，并判断是否要自动打开开发者工具，但是当我们重新启动项目时会发现页面为空白，也不能自动打开开发者工具，并且出现了以下错误：</strong></p><p><img src="https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510212920208.png" alt="image-20230510212920208"></p><p><strong>很明显，<code>process.env.NODE_ENV</code>并不等于<code>development</code>，因此页面会去加载同一层级的<code>index.html</code>，这是因为我们在运行命令时并没有把<code>NODE_ENV</code>加进来，但由于跨平台，直接在命令前添加<code>NODE_ENV=development</code>会报错，因此我们需要使用<code>cross-env</code>这个工具来解决。</strong></p><p><strong>首先安装这个工具：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm i -D cross-env</span></span></code></pre></div><p><strong>然后，我们需要修改<code>package.json</code>文件中的<code>electron:dev</code>命令：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>···</span></span>
<span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>   &quot;dev&quot;: &quot;vite&quot;,</span></span>
<span class="line"><span>   &quot;build&quot;: &quot;vue-tsc --noEmit &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span>   &quot;preview&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span>   &quot;electron:dev&quot;: &quot;tsc &amp;&amp; cross-env NODE_ENV=development electron .&quot; // 在 electron . 前增加 cross-env NODE_ENV=development</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>···</span></span></code></pre></div><p><strong>修改完之后，我们再次运行<code>npm run electron:dev</code>命令，发现页面可以正常加载，并且自动打开开发者工具。</strong></p><p><img src="https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510172801495.png" alt="image-20230510172801495"></p><hr><p><strong>在启动项目时，每次都需要先开启本地<code>vite</code>服务，等待服务开启之后，才能进行启动<code>electron</code>并加载合适的页面，但这不免有些麻烦，这时有些小伙伴可能会提出，我们把这些命令写在一行，用<code>&amp;&amp;</code>符号连接起来不就好了，这看似很合理，但其实不行，这是因为当我们运行完 <code>npm run dev</code>时，后面的命令并不会继续执行，不信的小伙伴可以尝试一下。</strong></p><p><strong>为了解决这个问题，我们需要<code>concurrently</code>和 <code>wait-on</code>这两个工具，其中：</strong></p><ul><li><strong><code>concurrently</code>可以帮助我们同时运行多个命令</strong></li><li><strong><code>wait-on</code>可以帮助我们等待某个命令执行完之后再去执行后面的命令</strong></li></ul><p><strong>因此我们来安装这两个工具：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm i -D concurrently wait-on</span></span></code></pre></div><p><strong>同时，我们需要修改<code>package.json</code>文件：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>···</span></span>
<span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>   &quot;dev&quot;: &quot;vite&quot;,</span></span>
<span class="line"><span>   &quot;build&quot;: &quot;vue-tsc --noEmit &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span>   &quot;preview&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span>   &quot;electron&quot;:&quot;wait-on tcp:5173 &amp;&amp; tsc &amp;&amp; cross-env NODE_ENV=development electron .&quot;, // 等待5173端口服务开启，再去运行之后的命令</span></span>
<span class="line"><span>   &quot;electron:dev&quot;: &quot;concurrently -k \\&quot;npm run dev\\&quot; \\&quot;npm run electron\\&quot;&quot; // 同时运行多个命令</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>···</span></span></code></pre></div><p><strong>修改好之后，再去运行<code>npm run electron:dev</code>命令，就可以一键启动<code>electron</code>项目了</strong></p><p><img src="https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510172801495.png" alt="image-20230510172801495"></p><p><strong>至此结束。</strong></p>`,24),o=[p];function c(l,i,d,r,u,g){return s(),e("div",null,o)}const h=n(t,[["render",c]]);export{m as __pageData,h as default};
