/*{
    const bannerlist=document.querySelectorAll(".bannerbox li");
    const btnlist=document.querySelectorAll(".banner-btn li");
    const bannertu=document.querySelector(".banner-tu1");
    var colorarr=["#84CEF1","#6A31D6","#339FFE","#F9F3F3","#04157D","#90152A"]
    console.log(bannerlist);
    console.log(btnlist);
    btnlist.forEach(function(ele,index){
        ele.onmouseover=function(){
            for(var i=0;i<bannerlist.length;i++){
                bannerlist[i].classList.remove("active");
                btnlist[i].classList.remove("active");
            }
            this.classList.add("active");
            bannerlist[index].classList.add("active");
            bannertu.style.background=colorarr[index];
            num=index;
        }
    })
    let num=0;
    let time=function(){
        num++;
        if(num==bannerlist.length){
            num=0;
        }
        for(var i=0;i<bannerlist.length;i++){
            bannerlist[i].classList.remove("active");
            btnlist[i].classList.remove("active");
        }
        bannerlist[num].classList.add("active");
        btnlist[num].classList.add("active");
        bannertu.style.background=colorarr[num];
    };

    let st=setInterval(time,2000);

    bannertu.onmouseover=function () {
        clearInterval(st);
    }
    bannertu.onmouseout=function () {
        st=setInterval(time,2000);
    }

}*/
//topbar
{

}




var imgs=document.querySelectorAll(".img");
var masks=document.querySelectorAll(".mask");
let conSmall=document.querySelector(".con-one-s");
let rowLeft=document.querySelector(".con-row-left");
let rowRight=document.querySelector(".con-row-right");
let zbList=document.querySelector(".zb-list");
let zbLength=document.querySelectorAll(".zb-list li").length;


imgs.forEach(function (ele,index) {
    ele.onmouseover=function () {
        masks[index].style.opacity=1;
    }
    ele.onmouseout=function () {
        masks[index].style.opacity=0;
    }
})
var big=document.querySelectorAll(".con-one-big>div");
var mao=document.querySelectorAll(".con-one-big>div>a");
var small=document.querySelectorAll(".con-one-s>div");
var masks1=document.querySelectorAll(".mask1");
console.log(small);
console.log(big);
small.forEach(function(ele,index){
    ele.onmouseover=function(){
        big.forEach(function(ele,index){
            ele.style.zIndex=2;
            ele.style.display="none";
            masks1[index].style.display="none";
            mao[index].style.display="none";
        })
        big[index].style.zIndex=10;
        big[index].style.display="block";
        masks1[index].style.display="block";
        mao[index].style.display="block";
    }
    // big[index].onmouseover=function () {
    //     mao[index].style.animation="scale 0.5s";
    // }
})
rowRight.onclick=function(){
    conSmall.style.marginLeft="-492px";
    rowLeft.style.opacity=1;
    this.style.opacity=0;
}
rowLeft.onclick=function(){
    conSmall.style.marginLeft=0;
    rowRight.style.opacity=1;
    this.style.opacity=0;
}
let num=0;
let st=setInterval(function(){
    num++;
    zbList.style.marginTop=-num*40+"px";
    if(num==zbLength){
        zbList.style.marginTop=0;
        num=0;
    }
},2000)
// {
//     const left=document.querySelector(".left");
//     const totop=document.querySelector(".dingbu");
//     const topbar=document.querySelector(".topbar");
//
//     window.onscroll=function(){
//         let obj=document.body.scrollTop==0?document.documentElement:document.body;
//         if(obj.scrollTop>500){
//             console.log(1);
//             left.style.display="block";
//         }if(obj.scrollTop>800){
//             topbar.style.top=0;
//           left.style.display="block";
//         }else if(obj.scrollTop<500){
//             left.style.display="none";
//            // topbar.style.top="-50px";
//         }
//         else if(obj.scrollTop<800){
//             topbar.style.top="-50px";
//             //left.style.display="block";
//         }
//
//     }
//     totop.onclick=function () {
//         let obj=document.body.scrollTop==0?document.documentElement:document.body;
//         let scrollt=obj.scrollTop;
//         let time=500;
//         let speed=scrollt/time*50;
//         let st = setInterval(function () {
//             scrollt -= speed;
//             obj.scrollTop = scrollt;
//             if (scrollt <= 0) {
//                 obj.scrollTop = 0;
//                 clearInterval(st);
//             }
//         }, 50)
//     }
//
// }

{
    let imgs=document.images;
    console.log(imgs);
    Array.from(imgs).forEach(function(ele){
        if(window.innerHeight>getPosition(ele)){
            ele.src=ele.getAttribute("data-src");
        }
    });


    window.addEventListener("scroll",function(){
        let st=document.body.scrollTop;
        Array.from(imgs).forEach(function(ele){
            if(st+window.innerHeight>getPosition(ele)){
                ele.src=ele.getAttribute("data-src");
            }
        })
    });
    function getPosition(obj){
        let ot=obj.offsetTop;
        let parent=obj.offsetParent;
        while(parent!==null&&parent.nodeName!=="BODY"){
            ot+=parent.offsetTop;
            parent=parent.offsetParent;
        }
        return ot;
    }
}