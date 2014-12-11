// 首页 - 消息
define(function(require, exports, module) {
    exports.init = function(page) {
        var $page = $(page),
            comScroll=require("comScroll");

        require("comSearch").init(page); //搜索模块

        var scroll_pn1=comScroll.init({
            page:page,
            refreshUrl:"refresh_message.html",
            selector:"#"+page.id+" .j-msgTabPn.pn1"
        });

        var scroll_pn2;

        //切换消息和通话tab
        $(".header .j-msgTab").click(function() {
            var panel = $(this).data("panel");

            $(this).addClass("active").siblings(".j-msgTab").removeClass("active");
            $page.find(".j-msgTabPn").each(function() {
                if ($(this).hasClass(panel)) $(this).show().siblings(".j-msgTabPn").hide();
            });

            if(!scroll_pn2 && panel=="pn2"){
                scroll_pn2=comScroll.init({
                    page:page,
                    refreshUrl:"refresh_message2.html",
                    selector:".j-msgTabPn.pn2"
                });
            }
        });
    };
});
