/*
 * 页面原生滚动、下拉刷新、加载更多
 * @Author  chenjie
 * @param options.page 当前的page
 * @param options.enableRefresh 禁用下拉刷新
 * @param options.enableLoadmore 禁用加载更多
*/
define(function(require,exports,module){
	exports.init=function(options){
		var IScroll=require("iscroll"),
			myScroll,
			defaults,
			opts,
			$page,
            $loadMore,
            $pullDown,
            hasData;

        myScroll = new IScroll(".content", {
            preventDefault:false,
			mouseWheel: true,
			scrollbars: true,
			probeType:2
		});

		defaults={
			page:null,
			enableRefresh:true,
			enableLoadmore:true
		};

		opts=$.extend(true,{},defaults,options);

		$page=$(opts.page);
        $loadMore=$page.find(".j-loadmore");
        $pullDown=$page.find(".j-pullDown");
        hasData=parseInt($page.find(".j-hasData").val());

        if(!opts.enableRefresh && !opts.enableLoadmore) return;

        if(opts.enableRefresh){
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
        }

        myScroll.on('scrollEnd', function() {
            console.log(hasData)
            //加载更多
            if(opts.enableLoadmore && hasData && (this.y-50) <= this.maxScrollY && this.y!=0){
                $loadMore.css("opacity",1);
                setTimeout(function(){
                    var tmp='<li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li><li>新增内容</li>';
                    $page.find(".j-msgTabPn.pn1 ul").append(tmp);
                    myScroll.refresh();
                    $loadMore.css("opacity",0);
                },1000);
            }

            if(opts.enableRefresh && $pullDown.hasClass('flip')){
                $pullDown.addClass("pulldown-loading");
                $pullDown.text("正在刷新...");
                $page.find(".j-msgTabPn.pn1").load("test.html?v="+_.random(1,1000)+" #j-msg-detail-list",function(data,status,xhr){
                    if(status=="success"){
                        $pullDown.text("刷新成功");
                    }
                    else{
                        $pullDown.text("刷新失败，请重试");
                    }
                    setTimeout(function(){
                        $pullDown.css("paddingTop",0);
                        $pullDown.removeClass("pulldown-loading");
                        myScroll.refresh();
                    },600);
                });
            }
        });

        return myScroll;
	};
});