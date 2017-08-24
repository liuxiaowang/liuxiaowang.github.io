/*
* @Author: Administrator
* @Date:   2017-05-03 22:32:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 08:45:17
*/

window.onload=function(){
	{
		let bBox=document.querySelector('.ui-viewport');
		let bannerImg=document.querySelectorAll('.ui-viewport>li');
		let imgWidth=parseInt(getComputedStyle(bBox,null).width);
		let btns=document.querySelectorAll('.banner-btn>li');
		let current=0;
		let next=0;
		let win=document.querySelector('.ui-wrapper');
		let bLeft=document.querySelector('.banner-left');
		let bRight=document.querySelector('.banner-right');
		let flag=true;
		for(let i=0;i<bannerImg.length;i++){
			if(i==0){
				continue;
			}
			bannerImg[i].style.left=imgWidth+'px';
		}
		let t=setInterval(move,2000);
		win.onmouseenter=function(){
			clearInterval(t);
		}
		win.onmouseleave=function(){
			t=setInterval(move,2000);
		}
		function move(){
			next++;
			if(next==bannerImg.length){
				next=0;
			}
			btns[current].className='';
			btns[next].className='hot';
			bannerImg[next].style.left=imgWidth+'px';
			animate(bannerImg[current],{left:-imgWidth});
			animate(bannerImg[next],{left:0},function(){
				flag=true;
			});
			current=next;
		}
		function movedown(){
			next--;
			if(next<0){
				next=bannerImg.length-1;
			}
			btns[current].className='';
			btns[next].className='hot';
			bannerImg[next].style.left=imgWidth+'px';
			animate(bannerImg[current],{left:-imgWidth});
			animate(bannerImg[next],{left:0},function(){
				flag=true;
			});
			current=next;
		}
		for(var i=0;i<btns.length;i++){
			btns[i].index=i;
			btns[i].onclick=function(){

				if(current==this.index){
					return;
				}
				btns[current].className='';
				this.className='hot';
				if(this.index>current){
					bannerImg[this.index].style.left=imgWidth+'px';
					animate(bannerImg[current],{left:-imgWidth});
					animate(bannerImg[this.index],{left:0});

				}else if(this.index<current){
					bannerImg[this.index].style.left=-imgWidth+'px';
					animate(bannerImg[current],{left:imgWidth});
					animate(bannerImg[this.index],{left:0});

				}
				current=next=this.index;
			}
		}
		bRight.onclick=function(){
			if(flag){
				flag=false;
				move();
			}

		}
		bLeft.onclick=function(){
			if(!flag){
				return;
			}
			flag=false;
			movedown();
		}
	}


	{
		let contentItem=document.querySelectorAll(".content-item");
		xiaomi(contentItem[0]);
		xiaomi(contentItem[1]);
		xiaomi(contentItem[2]);
		xiaomi(contentItem[3]);
		function xiaomi(contentItem){
			let itemList=contentItem.querySelector(".item-list-clearfix");
			let dians=contentItem.querySelectorAll(".dianbox li");
			let next=contentItem.querySelector(".con-row-right");
			let prev=contentItem.querySelector(".con-row-left");
			let now=0;
			dians.forEach(function (ele,index) {
				ele.onclick=function () {
					let left=-index*296;
					itemList.style.left=left+"px";
					dians[now].style.background="#ccc";
					this.style.background="red";
					now=index;
				}
			})
			contentItem.onmouseover=function () {
				next.style.opacity=1;
				prev.style.opacity=1;
			}
			contentItem.onmouseout=function () {
				next.style.opacity=0;
				prev.style.opacity=0;
			}
			next.onclick=function(){
				if(now===dians.length-1){
					return;
				}
				itemList.style.transition="all 1s";
				dians[now].style.background="#ccc";
				now++;
				itemList.style.left=-now*296+"px";
				dians[now].style.background="red";
			}
			prev.onclick=function(){
				if(now===0){
					return;
				}
				dians[now].style.background="#ccc";
				now--;
				itemList.style.left=-now*296+"px";
				dians[now].style.background="red";
			}
		}
	}
	
	
	{
		let forbox=document.querySelector(".foryou-list");
		let leftR=document.querySelector(".left-row");
		let rightR=document.querySelector(".right-row");
		console.log(forbox);
		console.log(leftR,rightR);
		rightR.onclick=function(){
			forbox.style.left=-1226+"px";
		}
		leftR.onclick=function(){
			forbox.style.left=0;
		}
	}

	{
		let danbox=document.querySelector(".danpin-list");
		let leftR=document.querySelector(".danL-row");
		let rightR=document.querySelector(".danR-row");
		rightR.onclick=function(){
			danbox.style.left=-1226+"px";
		}
		leftR.onclick=function(){
			danbox.style.left=0;
		}
	}

	{
		let jiadianList=document.querySelectorAll(".jiadian-list>li");
		let jiadianA=document.querySelectorAll(".jiadian-list>li>a");
		console.log(jiadianA);
		let jiadianBig=document.querySelectorAll(".jiadian-big>.span16");
		console.log(jiadianBig);
		console.log(jiadianList);
		jiadianList.forEach(function(ele,index){
			ele.onmouseover=function(){
				jiadianBig.forEach(function(ele,index){
					ele.style.zIndex=2;
					ele.style.display="none";
					jiadianA[index].style.color="#000";
					jiadianA[index].style.borderBottom="0";
				})
				jiadianBig[index].style.zIndex=10;
				jiadianBig[index].style.display="block";
				jiadianA[index].style.color="#ff6700";
				jiadianA[index].style.borderBottom="2px solid #ff6700";
			}
		})
	}

	{
		let zhinengList=document.querySelectorAll(".zhineng-list>li");
		let zhinengA=document.querySelectorAll(".zhineng-list>li>a");
		console.log(zhinengA);
		let zhinengBig=document.querySelectorAll(".zhineng-big>.span16");
		console.log(zhinengBig);
		console.log(zhinengList);
		zhinengList.forEach(function(ele,index){
			ele.onmouseover=function(){
				zhinengBig.forEach(function(ele,index){
					ele.style.zIndex=2;
					ele.style.display="none";
					zhinengA[index].style.color="#000";
					zhinengA[index].style.borderBottom="0";
				})
				zhinengBig[index].style.zIndex=10;
				zhinengBig[index].style.display="block";
				zhinengA[index].style.color="#ff6700";
				zhinengA[index].style.borderBottom="2px solid #ff6700";
			}
		})
	}

}



