// 通话详情
define(function(require,exports,module){
	exports.init=function(page){
		require("LoadCss");
		seajs.use((seajs.ISDEV ? "./" : "")+"src/css/module/msg_call_makecall.css");
	};
});