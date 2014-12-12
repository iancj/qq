// 人脉圈
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		require("comSearch").init(page); //搜索模块

		var $menu=$page.find("#j-menuMask");//菜单

		//显示人脉圈按钮
		$page.find("#j-showMenu").click(function(){
			$menu.fadeIn(100);
			$menu.find(".menuActions").addClass("inY");
		});

		//隐藏人脉圈按钮
		$menu.click(function(){
			$menu.find(".menuActions").removeClass("inY");
			setTimeout(function(){
				$menu.fadeOut(100);
			},200)
		});
	};
});