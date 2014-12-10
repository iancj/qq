// 首页 - 消息
define(function(require, exports, module) {
    exports.init = function(page) {
        var $page = $(page);

        require("../../component/search/search").init(page); //初始化搜索模块

        var myScroll = new IScroll(".content", iScroll_config),
            $loadMore=$page.find(".j-loadmore"),
            $pullDown=$page.find(".j-pullDown");

        myScroll.on('scroll', function() {
            if (this.y > 50 && !$pullDown.hasClass('flip')) {
                $pullDown.addClass("flip");
                $pullDown.text('释放立即刷新...');
                $pullDown.css("paddingTop",this.y);
            } else if (this.y < 50 && $pullDown.hasClass('flip')) {
                $pullDown.removeClass("flip");
                $pullDown.text('下拉刷新...');
                $pullDown.css("paddingTop",0);
            }
        });

        myScroll.on('scrollEnd', function() {
            //加载更多
            if((this.y-50) <= this.maxScrollY && this.y!=0){
                $loadMore.css("opacity",1);
                setTimeout(function(){
                    var tmp='<li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li>';
                    $page.find(".j-msgTabPn.pn1 ul").append(tmp);
                    myScroll.refresh();
                    $loadMore.css("opacity",0);
                },1000);
            }

            if($pullDown.hasClass('flip')){
                $pullDown.addClass("pulldown-loading");
                $pullDown.text("正在刷新...");
                setTimeout(function(){
                    $pullDown.text("刷新成功");
                    setTimeout(function(){
                        $pullDown.css("paddingTop",0);
                        $pullDown.removeClass("pulldown-loading");
                        //refresh data
                        myScroll.refresh();
                    },1000);
                },1000)
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
