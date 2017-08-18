$(function(){
    var num=0;
    // setInterval(move,2000);
    function move(){
        num++;
        if(num==$(".bannerbox").length){
            num=0;
        }
        // $(".bannerbox").fadeOut().eq(num).fadeIn();
        // $(".bannerbox").hide().eq(num).show("slow","linear");
        $(".bannerbox").hide().eq(num).animate({opacity:"toggle"},"slow");
    }
    $(".info").each(function(){
        $(this).hover(function(){
            $(this).find(".mask").fadeIn();
            $(this).find(".mask p:first-child").slideDown(500);
            $(this).find(".mask p:last-child").slideUp(500);
            // console.log($(this).find(".mask"));
        }, function(){
            $(this).find(".mask").fadeOut();
            $(this).find(".mask p:last-child").slideDown(500);
            $(this).find(".mask p:first-child").slideUp(500);
        })
    })
    /*$(".info").each(function(){
        $(this).hover(function(){
            $(".mask").show();
        },function(){
            $(".mask").hide();
        })
        var index=$(this);
        // $(".mask").eq(index).show();
        /!*$(".mask>p").slideDown();
        console.log(11);*!/
    })*/


    let canvas1=document.querySelector("#can1");
    let angle=0;
    let percent=80;
//    let maxangle=360*percent/100;
    function progress(canvas,percent,color="red"){
        if(!(canvas&&canvas.nodeName=="CANVAS"&&percent>=0&&percent<=100)){
            console.error("参数传递有误！");
            return;
        }
        let [width,height]=[canvas.width,canvas.height];
        let cobj=canvas.getContext("2d");
        cobj.translate(width/2,height/2);
        //cobj.rotate(-Math.PI/2);
        let maxAngle=percent*360/100;
        cobj.strokeStyle=color;
        cobj.lineWidth=10;
        cobj.font="20px 微软雅黑";
        cobj.textAlign="center";
        cobj.textBaseline="middle";
        function fn(){
            angle++;
            cobj.clearRect(-width/2,-height/2,width,height);
            cobj.beginPath();
            cobj.arc(0,0,width*0.4,-Math.PI/2,angle*Math.PI/180-Math.PI/2);
            cobj.fillText(Math.round(angle/360*100)+"%",0,0)
            cobj.stroke();
            if(angle>=maxAngle){
                return;
            }
            requestAnimationFrame(fn);
        }
        fn();
    }
    //接收一个canvas对象  接收一个百分比  接收颜色
    progress(canvas1,80,"red");

})
$(function(){
    $("#main").fullpage({
        anchors:["p1","p2","p3"],
        sectionsColor:["#f99","#99f","#f3f"],
        scrollingSpeed:1500,
        easing:"easeOutBounce",
        navigation:true,
        navigationPosition:"left",
        navigationColor:"#fff",
        slidesNavigation:true,
        continuousVertical:true,
        fixedElements:"#menu",
        menu:"#menu",
        controlArrowColor:"rgba(255,255,255,0.5)",
        afterLoad:function(anchor,index){
            if(index==2){
                $(".item1").removeClass("itemleftOut").addClass("itemleft");
                $(".item4").removeClass("itemrightOut").addClass("itemright");
                $(".item2").removeClass("itemtopOut").addClass("itemtop");
                $(".item3").removeClass("itembottomOut").addClass("itembottom");
            }
            if(index==1){
                $(".text1").fadeIn(500);
            }
        },
        onLeave:function(index){
            if(index==2){
                $(".item1").removeClass("itemleft").addClass("itemleftOut");
                $(".item4").removeClass("itemright").addClass("itemrightOut");
                $(".item2").removeClass("itemtop").addClass("itemtopOut");
                $(".item3").removeClass("itembottom").addClass("itembottomOut");
            }
            if(index==1){
                $(".text1").fadeOut();
            }
        }
    });
    $(".text1").fadeIn(500);
})