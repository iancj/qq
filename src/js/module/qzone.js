// qzone
define(function(require,exports,module){
	exports.init=function(page){
		require("comScroll").init({
            page:page,
            selector:".content",
            enableRefresh:false,
            enableLoadmore:false
        });
	}
});