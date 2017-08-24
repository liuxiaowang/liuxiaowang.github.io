$(function(){
    $(window).scroll(function(){
        var st=$(window).scrollTop();
        if(st>500){
            $(".left").show(500);
        }else{
            $(".left").hide(500);
        }
    });
    var carr=["","#F15453","#19C8A9","#64C333","#F7A945","#19C8A9","#0AA6E8"]
    $(".left .btnitem").click(function(){
        var index=$(this).index();
        var ft=$(".flooritem").eq(index).offset().top;

        $(".left .btnitem").css("background","");
        $(this).css("background",carr[index]);
        $("body,html").animate({scrollTop:ft});
        console.log(ft);
    })


    var dians=$(".banner-btn li");
    var imgs=$(".bannerbox li");
    var bannertu=$(".banner-tu1");
    var colorarr=["#84CEF1","#6A31D6","#339FFE","#F9F3F3","#04157D","#90152A"]
    console.log(dians);
    console.log(imgs);
    dians.click(function(){
        var index=$(this).index();
        dians.filter(".active").removeClass("active");
        dians.eq(index).addClass("active");
        imgs.filter(".active").removeClass("active").fadeOut(300).end().eq(index).addClass("active").fadeIn(500);
        bannertu.css("background",colorarr[index]);
        
    })

    var num=0;
    var st=setInterval(move,2000);
    function move(){
        num++;
        if(num<0){
            num=dians.length-1;
        }
        if(num>=dians.length){
            num=0;
        }
        dians.filter(".active").removeClass("active").end().eq(num).addClass("active");
        imgs.filter(".active").removeClass("active").fadeOut(200).end().eq(num).addClass("active").fadeIn(500);
        bannertu.css("background",colorarr[num]);
    }
    $(".banner-img").hover(function(){
        clearInterval(st);
    },function(){
        st=setInterval(move,2000);
    });
    
    
    
})
