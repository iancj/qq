define(function(require,exports,module){
	exports.init=function(page){
		var $page=$(page);

		$page.find("#j-test").click(function(){
			alert("asd")
		});
	}
});