// 首页 - 消息
define(function(require, exports, module) {
    exports.init = function(page) {
        var $page = $(page);

        require("../../component/search/search").init(page); //初始化搜索模块

        var myScroll = new IScroll(".content", iScroll_config);

        myScroll.on('scroll', function() {
            if (this.y > 5) {
                //下拉刷新效果  
                // $(".j-pullDown").show();
            }
        });

        myScroll.on('scrollEnd', function() {
        	if((this.y-10) <= this.maxScrollY){
        		$page.find(".j-pullDown").css("opacity",1);
        		myScroll.refresh();
        	}
        });

        //切换消息和通话tab
        $(".header .j-msgTab").click(function() {
            var panel = $(this).data("panel");
            $(this).addClass("active").siblings(".j-msgTab").removeClass("active");
            $page.find(".content .j-msgTabPn").each(function() {
                if ($(this).hasClass(panel)) $(this).show().siblings(".j-msgTabPn").hide();
            })

            //刷新滚动容器
            setTimeout(function() {
                myScroll.refresh();
            }, 0);
        });
    };
});
