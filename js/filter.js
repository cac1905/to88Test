// JavaScript Document
$(document).ready(function(){
	//鎺ㄨ崘宸﹁竟鐨勬晥鏋�
	$(".filter li").each(function(index, element) {
		$(this).hover(function(){
			$(this).addClass("rem_left");
		},function(){
			$(this).removeClass("rem_left")
		}).click(function(){
			var it=$(this).attr('rel')
			$(".filter li").removeClass("rem_left1")
			$(this).addClass("rem_left1")
			if(it!='all'){
				//alert(it)
				$(".gameList li[rel="+it+"]").stop(false,true).show(1000);
				$('.gameList li[rel!='+it+']').stop(false,true).hide(1000);
				//$('.remgameList li').animate({'opacity':1})
			}else{
				$('.gameList li').stop(false,true).show(1000);
			}
		})
	});
	//鎺ㄨ崘鍙宠竟鐨勬晥鏋�
	
	$(".gameList li").each(function(index, element) {
		$(this).on("mouseover",function(){
			$(this).addClass("movie_scroll_hov")
		}).on("mouseout",function(){
			$(this).removeClass("movie_scroll_hov")
		}) 
	});
})