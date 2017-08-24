$(function(){
    var dians=$(".dian li");
    var imgs=$(".banner li");
    dians.click(function(){
        var index=$(this).index();
//        dians.removeClass("active").filter(this).addClass("active");
//        $(this).addClass("active").siblings().removeClass("active");
        $(this).addClass("active").siblings().filter(".active").removeClass("active");
//        imgs.hide(500).eq(index).show(500);
        imgs.fadeOut().eq(index).fadeIn();
    })
    var num=0;
    var st=setInterval(move,2000);
    function move(){
        num++;
        if(num==dians.length){
            num=0;
        }
        if(num==-1){
            num=dians.length-1;
        }
        dians.removeClass("active").eq(num).addClass("active");
        imgs.fadeOut().eq(num).fadeIn();
        // num=index;
    }
    dians.hover(function(){
        clearInterval(st);
    },function(){
        st=setInterval(move,2000);
    })

    $(".rightbox li a").each(function(index,ele){
        $(this).on("mouseover",function(){
            $(this).find("img").addClass("active")
        })
        $(this).on("mouseout",function(){
            $(this).find("img").removeClass("active");
        })
    })
    $(".leftbox a").on("mouseover",function(){
        $(this).find("img").addClass("active");
    })
    $(".leftbox a").on("mouseout",function(){
        $(this).find("img").removeClass("active");
    })




})