 
$(function(){ 
    /*backTop返回顶部*/
    $(function () {
        $(window).scroll(function(){
            if ($(window).scrollTop()>100){
                $("#back-to-top").fadeIn(1500);
            }
            else
            {
                $("#back-to-top").fadeOut(1500);
            }
        });
 
        $("#back-to-top").click(function(){
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
    });

    /*silder right mobile games*/
    $('#sideRight').hover(function(){
        $('#sideRight').stop().animate({right:'0px'},200);
    },function(){
        $('#sideRight').stop().animate({right:'-88px'},200);
    });
    /*silder right live help*/
    $('#sideRight2').hover(function(){
        $('#sideRight2').stop().animate({right:'0px'},200);
    },function(){
        $('#sideRight2').stop().animate({right:'-88px'},200);
    });

     /** top wineers 大赢家 **/
     var adMarquee;
    $(function(){
        Marquee("topList",3000)
    })
    function Marquee(obj,speed){
        $("#"+obj).hover(function(){
            clearInterval(adMarquee);
        },function(){
            adMarquee=setInterval(function(){
                $("#"+obj).prepend($("#"+obj+" li").last().hide().detach());
                $("#"+obj+" li").eq(1).hide();
                $("#"+obj+" li").first().slideDown(1000);
                $("#"+obj+" li").eq(1).fadeIn(1500);
            },speed);
        }).trigger("mouseleave");
    }

 
     /*promo page tab */
    $(document).ready(function() { 
        (function ($) { 
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
            
            $('.tab ul.tabs li a').click(function (g) { 
                var tab = $(this).closest('.tab'), 
                    index = $(this).closest('li').index();
                
                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');
                
                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
                
                g.preventDefault();
            } );
        })(jQuery);

    });

     /* more information*/
    $(".btn-more").click(function(){
        if ($(this).html().indexOf("查看详情")>-1) {
            $(this).html("关闭详情");                
        }
        else{
            $(this).html("查看详情");
        }                
        $(this).parent().parent().siblings(".promo-detail").slideToggle();
    });

     /*loadmore-*/ 
    size_li = $("#myList li").size();
    x=18;
    $('#myList li:lt('+x+')').show();
    $('#loadMore').click(function () {
        x= (x+5 <= size_li) ? x+5 : size_li;
        $('#myList li:lt('+x+')').show();
    });
    $('#showLess').click(function () {
        x=(x-5<0) ? 3 : x-5;
        $('#myList li').not(':lt('+x+')').hide();
    });
 
    /*文字滚动*/
     $("#scrollDiv").Scroll({line:1,speed:1000,timer:2000,up:"but_up",down:"but_down"});
     $("#hotGmes").Scroll({line:1,speed:500,timer:3000});
 
     /*header after login account*/
     $(".account span").click(function(){
        $(".account ul").slideToggle();
        $(".account ul").css("opacity","100"); 
        $(".account ul").css("filter","alpha(opacity=100)"); 
    });

     /* nav fixed top 顶部导航固定*/
     $.extend($.fn, {
        posfixed: function(configSettings){
            var settings = {
                direction:"top",
                type:"while",
                hide:false,
                distance:0
            };          
            $.extend(settings, configSettings);

            //initial
            if($.browser.msie&&$.browser.version==6.0){
                $("html").css("overflow","hidden");
                $("body").css({
                    height:"100%",
                    overflow:"auto"
                });
            }
            
            var obj = this;
            var initPos = $(obj).offset().top;
            var initPosLeft = $(obj).offset().left;
            var anchoredPos = settings.distance;

            if(settings.type=="while"){
                if($.browser.msie&&$.browser.version==6.0){
                    $("body").scroll(function(event) {
                        var objTop = $(obj).offset().top - $("body").scrollTop();
                        if(objTop<=settings.distance){
                            $(obj).css("position","absolute");
                            $(obj).css("top",settings.distance+"px");
                            $(obj).css("left",initPosLeft+"px");
                        }
                        if($(obj).offset().top<=initPos){                       
                            $(obj).css("position","static");
                        }
                    });
                    
                }else{
                    $(window).scroll(function(event) {

                        if(settings.direction == "top"){
                            var objTop = $(obj).offset().top - $(window).scrollTop();
                        
                            if(objTop<=settings.distance){
                                $(obj).css("position","fixed");
                                $(obj).css(settings.direction,settings.distance+"px");
                                
                            }
                            if($(obj).offset().top<=initPos){
                                $(obj).css("position","static");
                            }
                        }else{
                            var objBottom = $(window).height() - $(obj).offset().top + $(window).scrollTop() - $(obj).outerHeight() ;
                            
                            if(objBottom<=settings.distance){
                                
                                $(obj).css("position","fixed");
                                $(obj).css(settings.direction,settings.distance+"px");
                                
                            }
                            if($(obj).offset().top>=initPos){
                                $(obj).css("position","static");
                            }
                        }
                        


                    });
                }
            } 
        } 
    });



}); /** jquery end **/


/*js*/
/*轮播图 slider js */
var glume = function(banners_id, focus_id){
    this.$ctn = $('#' + banners_id);
    this.$focus = $('#' + focus_id);
    this.$adLis = null;
    this.$btns = null;
    this.switchSpeed = 5;//自动播放间隔(s)
    this.defOpacity = 1;
    this.crtIndex = 0;
    this.adLength = 0;
    this.timerSwitch = null;
    this.init();
};
glume.prototype = {
    fnNextIndex:function(){
        return (this.crtIndex >= this.adLength-1)?0:this.crtIndex+1;
    },
    //动画切换
    fnSwitch:function(toIndex){
        if(this.crtIndex==toIndex){return;}
        this.$adLis.css('zIndex', 0);
        this.$adLis.filter(':eq('+this.crtIndex+')').css('zIndex', 2);
        this.$adLis.filter(':eq('+toIndex+')').css('zIndex', 1);
        this.$btns.removeClass('on');
        this.$btns.filter(':eq('+toIndex+')').addClass('on');
        var me = this;

        $(this.$adLis[this.crtIndex]).animate({
            opacity: 0
        }, 1000, function() {
            me.crtIndex = toIndex;
            $(this).css({
                opacity: me.defOpacity,
                zIndex: 0
            });
        });
    },
    fnAutoPlay:function(){
        this.fnSwitch(this.fnNextIndex());
    },
    fnPlay:function(){
        var me = this;
        me.timerSwitch = window.setInterval(function() {
            me.fnAutoPlay();
        },me.switchSpeed*1000);
    },
    fnStopPlay:function(){
        window.clearTimeout(this.timerSwitch);
        this.timerSwitch = null;
    },

    init:function(){
        this.$adLis = this.$ctn.children();
        this.$btns = this.$focus.children();
        this.adLength = this.$adLis.length;

        var me = this;
        //点击切换
        this.$focus.on('click', 'a', function(e) {
            e.preventDefault();
            var index = parseInt($(this).attr('data-index'), 10)
            me.fnSwitch(index);
        });
        this.$adLis.filter(':eq('+ this.crtIndex +')').css('zIndex', 2);
        this.fnPlay();

        //hover时暂停动画
        this.$ctn.hover(function() {
            me.fnStopPlay();
        }, function() {
            me.fnPlay();
        });

        if($.browser.msie && $.browser.version < 7) {
            this.$btns.hover(function() {
                $(this).addClass('hover');
            },function() {
                $(this).removeClass('hover');
            });
        }
    }
};
var player1 = new glume('_banners', '_focus');    
 


