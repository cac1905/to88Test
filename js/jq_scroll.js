/*
jQå‘ä¸Šæ»šåŠ¨å¸¦ä¸Šä¸‹ç¿»é¡µæŒ‰é’®
*/
(function($){
$.fn.extend({
        Scroll:function(opt,callback){
                //å‚æ•°åˆå§‹åŒ–
                if(!opt) var opt={};
                var _btnUp = $("#"+ opt.up);//Shawphy:å‘ä¸ŠæŒ‰é’®
                var _btnDown = $("#"+ opt.down);//Shawphy:å‘ä¸‹æŒ‰é’®
                var timerID;
                var _this=this.eq(0).find("ul:first");
                var     lineH=_this.find("li:first").height(), //èŽ·å–è¡Œé«˜
                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //æ¯æ¬¡æ»šåŠ¨çš„è¡Œæ•°ï¼Œé»˜è®¤ä¸ºä¸€å±ï¼Œå³çˆ¶å®¹å™¨é«˜åº¦
                        speed=opt.speed?parseInt(opt.speed,10):500; //å·åŠ¨é€Ÿåº¦ï¼Œæ•°å€¼è¶Šå¤§ï¼Œé€Ÿåº¦è¶Šæ…¢ï¼ˆæ¯«ç§’ï¼‰
                        timer=opt.timer //?parseInt(opt.timer,10):3000; //æ»šåŠ¨çš„æ—¶é—´é—´éš”ï¼ˆæ¯«ç§’ï¼‰
                if(line==0) line=1;
                var upHeight=0-line*lineH;
                //æ»šåŠ¨å‡½æ•°
                var scrollUp=function(){
                        _btnUp.unbind("click",scrollUp); //Shawphy:å–æ¶ˆå‘ä¸ŠæŒ‰é’®çš„å‡½æ•°ç»‘å®š
                        _this.animate({
                                marginTop:upHeight
                        },speed,function(){
                                for(i=1;i<=line;i++){
                                        _this.find("li:first").appendTo(_this);
                                }
                                _this.css({marginTop:0});
                                _btnUp.bind("click",scrollUp); //Shawphy:ç»‘å®šå‘ä¸ŠæŒ‰é’®çš„ç‚¹å‡»äº‹ä»¶
                        });

                }
                //Shawphy:å‘ä¸‹ç¿»é¡µå‡½æ•°
                var scrollDown=function(){
                        _btnDown.unbind("click",scrollDown);
                        for(i=1;i<=line;i++){
                                _this.find("li:last").show().prependTo(_this);
                        }
                        _this.css({marginTop:upHeight});
                        _this.animate({
                                marginTop:0
                        },speed,function(){
                                _btnDown.bind("click",scrollDown);
                        });
                }
               //Shawphy:è‡ªåŠ¨æ’­æ”¾
                var autoPlay = function(){
                        if(timer)timerID = window.setInterval(scrollUp,timer);
                };
                var autoStop = function(){
                        if(timer)window.clearInterval(timerID);
                };
                 //é¼ æ ‡äº‹ä»¶ç»‘å®š
                _this.hover(autoStop,autoPlay).mouseout();
                _btnUp.css("cursor","pointer").click( scrollUp ).hover(autoStop,autoPlay);//Shawphy:å‘ä¸Šå‘ä¸‹é¼ æ ‡äº‹ä»¶ç»‘å®š
                _btnDown.css("cursor","pointer").click( scrollDown ).hover(autoStop,autoPlay);

        }       
})
})(jQuery);
