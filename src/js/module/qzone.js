// qzone
define(function(require,exports,module){
	exports.init=function(page){
		require("comScroll").init({
            page:page,
            selector:"#"+page.id+" .content",
            enableRefresh:false,
            enableLoadmore:false
        });
	}
});