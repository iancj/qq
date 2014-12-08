// 对话
define(function(require,exports,module){
	exports.init=function(page){
		var _=require("underscore"),
			reply={
				1:"嗯哼？",
				2:"然后呢？",
				3:"是啊！",
				4:"你说呢？",
				5:"对，我同意。"
			},
			$page=$(page),
			$content=$page.find(".content"),
			$msg_list=$page.find("#j-msg-detail-list"),//消息列表
			tpl_left=$page.find("#tpl_msg_left").html(),
			tpl_right=$page.find("#tpl_msg_right").html();

		//滚动容器到底部
		var scrollListPanl=function(){
			$content.scrollTop($msg_list.height())
		}

		var tpl=require("../../tpl/tpl_msg_left.tpl");
		console.log(tpl)

		//发送消息
		$page.find("#j-sendMsg").keypress(function(event){
			var key = window.event ? event.keyCode : event.which;

			if(key==13){
				var val=$(this).val(),
					html=_.template(tpl_right,{dataset:val}),
					$render=$(html);
				//发送消息
				$msg_list.append($render);
				$(this).val("").focus();
				scrollListPanl($render);

				//随机获取回复信息
				html=_.template(tpl_left,{dataset:reply[_.random(1,5)]});
				$render=$(html);
				setTimeout(function(){
					$msg_list.append($render);
					scrollListPanl($render);
				},_.random(100,1000))
			}
		});
	}
});