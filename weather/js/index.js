var provinces=[];
var citys=[];
var data=[];
$.ajax({
    url:"http://api.jisuapi.com/weather/city",
    data:{appkey:"1316e2f7389497dc"},
    dataType:"jsonp",
    success:function(r){
//            console.log(r);
        data=r.result;
        provinces=$.grep(r.result,function(v,index){
            if(v.parentid==="0"){
                return true;
            }
        })
        $.each(provinces,function(index,v){
            $("<option></option>").html(v.city).val(v.cityid).appendTo("#province");
        })

    }
})
var arr=[];
function Draw(arr,data){
    arr=[];
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    cobj.clearRect(0,0,684,200);
    cobj.strokeStyle="rgba(255,255,255,0.6)";
    for(var i=5;i>0;i--){
        cobj.beginPath();
        if(i==5){
            cobj.moveTo(0,199);
            cobj.lineTo(684,199);
            cobj.stroke();
        }else {
            cobj.moveTo(0, i * 40);
            cobj.lineTo(684, i * 40);
            cobj.stroke();
        }
    }


    //画折线
    cobj.beginPath();
    cobj.strokeStyle="#fff";
    cobj.moveTo(0,200/29*(43-data.hourly[23].temp))
    cobj.lineTo(38,200/29*(43-data.hourly[0].temp));
    arr.push([38,200/29*(43-data.hourly[0].temp)]);
    cobj.lineTo(114,200/29*(43-data.hourly[3].temp));
    arr.push([114,200/29*(43-data.hourly[3].temp)]);
    cobj.lineTo(190,200/29*(43-data.hourly[6].temp));
    arr.push([190,200/29*(43-data.hourly[6].temp)]);
    cobj.lineTo(266,200/29*(43-data.hourly[9].temp));
    arr.push([266,200/29*(43-data.hourly[9].temp)]);
    cobj.lineTo(342,200/29*(43-data.hourly[12].temp));
    arr.push([342,200/29*(43-data.hourly[12].temp)]);
    cobj.lineTo(418,200/29*(43-data.hourly[15].temp));
    arr.push([418,200/29*(43-data.hourly[15].temp)]);
    cobj.lineTo(494,200/29*(43-data.hourly[18].temp));
    arr.push([494,200/29*(43-data.hourly[18].temp)]);
    cobj.lineTo(570,200/29*(43-data.hourly[21].temp));
    arr.push([570,200/29*(43-data.hourly[21].temp)]);
    cobj.lineTo(646,200/29*(43-data.hourly[23].temp));
    arr.push([646,200/29*(43-data.hourly[23].temp)]);
    cobj.lineTo(684,200/29*(43-data.hourly[0].temp));
    cobj.stroke();

    //画圆点和温度
    cobj.beginPath();
    for(var i=0;i<arr.length;i++) {

        cobj.fillStyle = "#fff";
        cobj.moveTo(arr[i][0], arr[i][1]);
        cobj.arc(arr[i][0], arr[i][1], 4, 0, Math.PI * 2, true);

        cobj.font="16px 微软雅黑";
        cobj.fillText(data.hourly[i].temp+"℃",arr[i][0]-15,arr[i][1]-5);
        cobj.fill();
    }
}


$("#province").on("change blur",function(){
    var id=$(this).val();
    citys=$.grep(data,function(value){
        if(value.parentid===id){
            return true;
        }
    });
    $("#city").empty();
    $.each(citys,function(index,v){
        $("<option></option>").html(v.city).appendTo("#city");
    })
    console.log(id);
});

$("#city").on("change blur",function(){
    var city=$(this).val();
    $.ajax({
        url:"http://api.jisuapi.com/weather/query",
        data:{city:city,appkey:"1316e2f7389497dc"},
        dataType:"jsonp",
        success:function(r){
            var data=r.result;
            Draw(arr,data);
            /*Line(data);
            Circle(arr,data);*/
            $(".date").html(data.date+"&nbsp;"+data.week);
            $(".qul").html("实时空气质量："+data.aqi.aqi+data.aqi.quality);
            $("#one img").prop("src","weathercn02/"+data.img+".png");
            $("#one .status span:nth-child(1)").html(data.templow+"~"+data.temphigh);
            $("#one .status span:nth-child(2)").html(data.hourly[0].weather);
            $("#one .status span:nth-child(3)").html(data.winddirect);
            $(".tembox .tem").html(data.temp);
            $(".tembox .c").html("℃");
            $(".tembox .weather").html(data.weather+"(实时)");

            $.each($(".item"),function(index,v){
                $(this).find("img").prop("src","weathercn02/"+data.daily[index+1].day.img+".png");
                $(this).find(".day").html(data.daily[index+1].week);
                $(this).find(".date").html(data.daily[index+1].date);
                $(this).find(".status span:nth-child(1)").html(data.daily[index+1].night.templow+"~"+data.daily[index+1].day.temphigh);
                $(this).find(".status span:nth-child(2)").html(data.daily[index+1].day.weather);
                $(this).find(".status span:nth-child(3)").html(data.daily[index+1].day.winddirect+data.daily[index+1].day.windpower);
                console.log($(this));
            })
            $(".bl").find("span:nth-child(1)").html("38");
            $(".bl").find("span:nth-child(2)").html("32");
            $(".bl").find("span:nth-child(3)").html("26");
            $(".bl").find("span:nth-child(4)").html("20");
            $(".bl").find("span:nth-child(5)").html("14");

            $(".bottom span").each(function(index,v){
                if(index<8) {
                    $(this).html(data.hourly[index * 3].time);
                }
                if(index==8){
                    $(this).html(data.hourly[0].time);
                }
            })

            console.log(r);

            $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
                var city=remote_ip_info.city;
//                    city.html(data.)

            });
        }
    })
});
$(document).ajaxComplete(function(){
    $(".progress").animate({width:"100%"},function(){
        $(this).css("width",0);
    })
})