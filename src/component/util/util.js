/*通用工具*/
define(function(require,exports,module){
	require("./util.css");//加载样式

	var Util={};

	//弱提示
	Util.hint=function(msg){
		console.log(msg)
	};

	//loading
	Util.loading={};

	Util.loading.show=function(){
		console.log("show loading")
	};

	Util.loading.hide=function(){
		console.log("hide loading")
	};

	module.exports=Util;
});