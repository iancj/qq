/*
 * 页面原生滚动、下拉刷新、加载更多
 * @Author  chenjie
 * @param options.page 当前的page
 * @param options.selector 当前的page
 * @param options.refreshUrl 刷新页面的url
 * @param options.enableRefresh 禁用下拉刷新
 * @param options.enableLoadmore 禁用加载更多
*/
define(function(require,exports,module){
	exports.init=function(options){
		var IScroll=require("iscroll"),
			myScroll,
			defaults,
			opts,
            finalScrollY,//最后滚动的位置
			$page,
            $loadMore,
            $pullDown,
            $pullDownHelper,
            hasData;//是否有更多数据

		defaults={
			page:null,
            selector:"",
            refreshUrl:"",
			enableRefresh:true,
			enableLoadmore:true
		};

		opts=$.extend(true,{},defaults,options);

		$page=$(opts.selector);
        $loadMore=$page.find(".j-loadmore");
        $pullDown=$page.find(".j-pullDown");
        $pullDownHelper=$page.find(".j-pullDown-helper");
        hasData=parseInt($page.find(".j-hasData").val());

        myScroll = new IScroll(opts.selector, {
            click:true,
            tap:true,
            mouseWheel: true,
            scrollbars: true,
            probeType:2
        });

        if(!opts.enableRefresh && !opts.enableLoadmore) return;

        var finalScrollY=0;

        if(opts.enableRefresh){
            myScroll.on('scroll', function() {
                if(this.y < 50){
                    $pullDownHelper.height(this.y);
                }

                finalScrollY=this.y;

                if (this.y > 50 && !$pullDown.hasClass('flip')) {
                    $pullDown.addClass("flip");
                    $pullDown.text('释放立即刷新...');
                } else if (this.y < 50 && $pullDown.hasClass('flip')) {
                    $pullDown.removeClass("flip");
                    $pullDown.text('下拉刷新...');
                }
            });
        }

        myScroll.on('scrollEnd', function() {
            //加载更多
            if(opts.enableLoadmore && hasData && (this.y-50) <= this.maxScrollY && this.y!=0){
                $loadMore.css("opacity",1);
                setTimeout(function(){
                    var tmp='<li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li>';
                    $page.find(".comm-list").empty().append(tmp);
                    myScroll.refresh();
                    $loadMore.css("opacity",0);
                },1000);
            }

            if(finalScrollY<50){
                $pullDownHelper.animate({"height":0},100);
            }

            if(opts.enableRefresh && $pullDown.hasClass('flip')){
                $pullDown.addClass("pulldown-loading");
                $pullDown.text("正在刷新...");
                $page.find(".j-refreshPanel").load(opts.refreshUrl+"?v="+_.random(1,1000)+" .comm-list",function(data,status,xhr){
                    var msg="";

                    if(status=="success"){
                        msg="刷新成功";
                    }
                    else{
                        msg="刷新失败，请重试";
                    }

                    $pullDown.text(msg);

                    setTimeout(function(){
                        $pullDownHelper.animate({"height":0},100);
                        $pullDown.removeClass("pulldown-loading");
                        myScroll.refresh();
                    },600);
                });
            }
        });

        return myScroll;
	};
});