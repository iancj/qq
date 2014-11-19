// 通话详情
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		//清除全部通话记录
		$page.find("#j-clearAll").click(function(){
			$("#j-noHistory").show().siblings(".clc-msg-call-title").hide();
			$("#j-historyList").hide();
			return false;
		});
	};
});