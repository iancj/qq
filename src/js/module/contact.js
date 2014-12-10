// 联系人
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		require("comSearch").init(page); //搜索模块
		
		//折叠列表
		$page.find(".j-friendList dt").click(function(){
			var $parent=$(this).parent("dl");
			$parent.siblings("dl").removeClass("open");
			$parent.toggleClass("open");
		});
	}
});