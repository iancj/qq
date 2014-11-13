// 联系人
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		require("module/comm_search").init(page);//初始化搜索模块
		
		//折叠列表
		$page.find(".j-friendList dt").click(function(){
			var $parent=$(this).parent("dl");
			$parent.siblings("dl").removeClass("open");
			$parent.toggleClass("open");
		});
	}
});