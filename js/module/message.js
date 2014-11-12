// 首页 - 消息
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		//切换消息和通话tab
		$(".header .j-msgTab").click(function(){
			var panel=$(this).data("panel");
			$(this).addClass("active").siblings(".j-msgTab").removeClass("active");
			$page.find(".content .j-msgTabPn").each(function(){
				if($(this).hasClass(panel)) $(this).show().siblings(".j-msgTabPn").hide();
			})
		});
	};
});