//主程序入口模块
define(function(require,exports,module){
	var Mobilebone=require("mobilebone"),
		$=require("zepto"),
		FUN={};

	FUN.message=require("module/message");
	FUN.contact=require("module/contact");
	FUN.msg_detail=require("module/msg_detail");
	FUN.msg_call=require("module/msg_call");
	FUN.ctt_contacts=require("module/ctt_contacts");
	FUN.ctt_contacts_list=require("module/ctt_contacts_list");
	
	//页面初始化
	Mobilebone.onpagefirstinto = function(page_in) {
		FUN[page_in.id] && FUN[page_in.id].init(page_in)
	};

	//页面回调
	Mobilebone.callback = function(pageinto, pageout) {
		var header = document.querySelector("body > .header"),
			footer = document.querySelector("body > .footer");

		// element of link at bottom
		var ele_link_in = null,
			ele_link_out = null;

		// element of header
		var ele_header_in = null,
			ele_header_out = null;

		var link;

		if (pageinto) {
			ele_link_in = footer.querySelector("a[href$="+ pageinto.id +"]");
			ele_header_in = pageinto.querySelector(".header");
			link=pageinto.id;

			$(header).find("> div[data-link]").hide();
			$(header).find("> div[data-link='"+link+"']").show();

			if (pageout) {
				ele_link_out = footer.querySelector("a[href$="+ pageout.id +"]");
				ele_header_out = pageout.querySelector(".header");

			} else if (ele_header_in == null) {
				header.className = "header in";	
				footer.className = "footer in";
			}

			if (ele_header_in == null) {
				ele_link_in && ele_link_in.classList.add("active");
				ele_link_out && ele_link_out.classList.remove("active");
				
				if (ele_header_out != null) {
					header.className = "header slide reverse in";	
					footer.className = "footer slide reverse in";		
				}
			} else if (pageout && ele_header_out == null) {
				// include header, slide-out fixed header
				header.className = "header slide out";	
				footer.className = "footer slide out";	
			}
		}
	};

	Mobilebone.init();
});