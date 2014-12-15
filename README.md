# Web手Q

最近公司一直在做Hybird app项目，app端无法给我们提供多个webview切换的js api，不同页面间的场景切换是个蛋疼的事情。偶然间读到了 @张鑫旭 的博文[《mobilebone.js-mobile移动web APP单页切换骨架》](http://www.zhangxinxu.com/wordpress/2014/10/mobilebone-js-mobile-web-app-core/)。在这万事具备只差场景切换的时候，希望出现了——Mobilebone.js，一款专注于web app单页切换的骨架。怀着感极涕零的心情，写了这个手Q小demo，希望这个骨架能够顶得住公司项目的摧残和折腾。

真的，饿妹子因~~~~

<a href="http://iancj.github.io/qq/index.html" target="_blank">[戳我预览]</a> 或 <a href="http://webqq.coding.io/index.html" target="_blank">[戳我预览]</a>(速度快)

或通过手机扫描二维码访问：

<img src="qrcode_github.png" width="160"> <img src="qrcode_coding.png" width="160">

#####2014-12-12 更新内容
* 增加了Iscroll5插件，用来模拟原生APP的顺滑滚动体验，满足下拉刷新当前模块的需求
* 对目录重新进行了调整，将gallery目录放入了src中，便于修改了源码后的插件同时进行打包压缩

#####2014-11-24 更新内容
移动端的webapp为了达到更好的效果，确实需要提前加载样式，尤其是单页应用这尤为重要。删除了`dev-async-css`和`dev-sync-css`这两个分支。

#####2014-11-19 更新内容
* 1.整理了文件
* 2.将相关的模块进行了构建打包
* 3.增加了两个分支:
	* `dev-async-css` 该分支采用异步加载模块样式
	* `dev-sync-css` 该分支采用同步加载模块样式
 
~~现在碰到的问题：~~

~~部分场景使用了seajs-css异步加载样式文件，在移动端上不太合适。虽然demo的每个模块样式文件就那么几KB，但是由于延迟加载的问题，会出现模块初始化时候页面乱掉的情况。如果是单页应用的话，在移动端项目上最好还是提前同步加载好所有的样式，但是这样用户第一次加载时间会过长，好蛋疼。~~