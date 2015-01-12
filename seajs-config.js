//development environment
seajs.ISDEV=false;

//seajs config
seajs.config({
	base:seajs.ISDEV ? "./src/" : "./dist/",
	alias:{
		// gallery
		"zepto":"gallery/zepto/zepto-min.js",
		"mobilebone":"gallery/mobilebone/mobilebone.js",
		"underscore":"gallery/underscore/1.6.0/underscore.js",
		"iscroll":"gallery/iscroll/iscroll-probe.js",
		"LoadCss":"seajs/seajs-css/1.0.4/seajs-css.js",
		//module
		"app":"js/app",
		"comSearch":"component/search/search",
		"comScroll":"component/scroll/scroll",
		"comUtil":"component/util/util"
	}
});