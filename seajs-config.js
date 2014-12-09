//seajs config
seajs.config({
	base:"./sea-modules/",
	alias:{
		// gallery
		"zepto":"gallery/zepto/zepto-min.js",
		"mobilebone":"gallery/mobilebone/mobilebone-min.js",
		"underscore":"gallery/underscore/1.6.0/underscore.js",
		"iscroll":"gallery/iscroll/iscroll-probe.js",
		"LoadCss":"seajs/seajs-css/1.0.4/seajs-css.js"
	}
});

//development environment
seajs.ISDEV=true;