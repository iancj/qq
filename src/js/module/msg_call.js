// 通话详情
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		require("LoadCss");
		seajs.use((seajs.ISDEV ? "./" : "")+"src/css/module/msg_call.css");

		//清除全部通话记录
		$page.find("#j-clearAll").click(function(){
			$("#j-noHistory").show().siblings(".clc-msg-call-title").hide();
			$("#j-historyList").hide();
			return false;
		});
	};
});