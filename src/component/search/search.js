// 搜索模块
define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page),
			$searchMask=$("#j-searchMask"),//搜索内容遮罩
			$header=$page.find(".header");//头部

			if(!$header.length) $header=$(".header");

		//自动计算遮罩真实高度
		$searchMask.height($(window).height()-48);

		//显示搜索容器
		$page.find(".j-showSearch").click(function(){
			$page.find(".j-pullDown").hide();
			$header.addClass("con-search-transition outY");
			$(this).parents(".content").addClass("top0");
			$(this).parents(".con-search").addClass("show").find(".j-conSearchIpt").focus();
			setTimeout(function(){
				$searchMask.removeClass("result").fadeIn(100);
			},200)
			return false;
		});

		//隐藏搜索容器
		var hideSearch=function(){
			$page.find(".j-pullDown").show();
			$header.removeClass("outY");
			$page.find(".content").removeClass("top0").find(".con-search").removeClass("show").find(".j-conSearchIpt").val("");
			$searchMask.hide().find(".j-noResult").hide();
			return false;
		}
		$page.find(".j-hideSearch").click(hideSearch);
		$searchMask.click(hideSearch);

		//清除文字
		$page.find(".j-clearTxt").click(function(){
			$(this).hide().siblings(".j-conSearchIpt").val("").focus().change();
		});

		//搜索响应
		$page.find(".j-conSearchIpt").on("change keyup",function(){
			var $ipt=$(this),
				val=$ipt.val();

			if(val!=""){
				$ipt.siblings(".j-clearTxt").show();
				$searchMask.addClass("result").find(".j-noResult").show();
			}else{
				$ipt.siblings(".j-clearTxt").hide();
				$searchMask.removeClass("result").find(".j-noResult").hide();
			}
		});

		//阻止搜索结果的冒泡
		$searchMask.find(".j-noResult").click(function(){
			return false;
		});
	}
});