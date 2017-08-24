$(function(){
    $(window).on("scroll",function(){
        var st=$(this).scrollTop();
        var aa=$(".whybox").offset().top;
        console.log(aa);
        console.log(st);
        if(st>aa-400){
            $(".yuan").addClass("rotate");
        }
    })





})