// 首页 - 消息
define(function(require, exports, module) {
    exports.init = function(page) {
        var $page = $(page);

        require("comSearch").init(page); //搜索模块
        var myScroll=require("comScroll").init({
            page:page
        }); //滚动

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
