for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
        $("<div></div>").addClass("block").attr("id",j+"-"+i).appendTo(".scene");
    }
}
var snackArr=[{x:0,y:0},{x:1,y:0},{x:2,y:0}];
var snackHead=snackArr[snackArr.length-1];

function drawSnack(){
    $(".snackbody").removeClass("snackbody");
    $(".snackhead").removeClass("snackhead");
    $.each(snackArr,function(index,val){
        $("#"+val.x+"-"+val.y).addClass("snackbody");
    })
    $("#"+snackHead.x+"-"+snackHead.y).addClass("snackhead");
    /*switch(dir){
        case "l":$(".snackhead").css({transform:"rotateY(-180deg)"});
        case "b":$(".snackhead").css({transform:"rotateX(-90deg)"});
    }*/
}
drawSnack();
var dir="r";
function move(){
    switch (dir){
        case "r": snackHead={x:snackHead.x+1,y:snackHead.y};break;
        case "l": snackHead={x:snackHead.x-1,y:snackHead.y};break;
        case "t": snackHead={x:snackHead.x,y:snackHead.y-1};break;
        case "b": snackHead={x:snackHead.x,y:snackHead.y+1};break;
    }

    var head=$("#"+snackHead.x+"-"+snackHead.y);
    if(head.hasClass("snackbody")||head.length===0){
        alert("游戏结束");
        location.reload();
    }
    if(head.hasClass("food")){
        head.removeClass("food");
        createFood();
    }else{
        snackArr.shift();
    }
    snackArr.push(snackHead);

//        snackArr.shift();
    drawSnack();
}
var st;
$(document).keydown(function(e){
    switch (e.keyCode){
        case 65:
        case 37: dir="l";break;
        case 87:
        case 38: dir="t";break;
        case 68:
        case 39: dir="r";break;
        case 83:
        case 40: dir="b";break;
    }


})
function createFood(){
    do {
        var rx = Math.floor(Math.random() * 20);
        var ry = Math.floor(Math.random() * 20);
    }while ($("#"+rx+"-"+ry).hasClass("snackbody"));
    $("#"+rx+"-"+ry).addClass("food");

}
createFood();

var flag=true;
$("#start").click(function(){
    if(flag){
        flag=false;
        st=setInterval(move,500);
        $(this).css("color","#ccc");
    }
})
$("#zan").click(function(){
    if($(this).attr("value")==="暂停"){
        clearInterval(st);
        /*$("<div></div>").append($(".scene")).addClass("mask")*/;
        $(this).attr("value","继续");
    }else if($(this).attr("value")==="继续"){
        st=setInterval(move,500);
        $(this).attr("value","暂停");
    }
});