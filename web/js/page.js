$(function(){
    $(".pageitem a").each(function(){
        $(this).hover(function(){
            $(this).addClass("active");
        },function(){
            $(this).removeClass("active");
        })

    })
})