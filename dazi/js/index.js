class Game{
    constructor(left,scor,state,life,startbtn,phb){   //构造函数
        this.left=left;
        this.num=5;
        this.obj={};
        this.scor=scor;
        this.scornum=0;
        this.state=state;
        this.statenum=1;
        this.speed=5;
        this.height=window.innerHeight;
        this.life=life;
        this.lifenum=5;
        this.st=null;
        this.startbtn=startbtn;
        this.flag=true;
        this.phb=phb;
        this.bestScor=localStorage.scor?JSON.parse(localStorage.scor):[];
        this.updatephb();
        /* this.pause=pause;
         this.pause.innerHTML="暂停";*/
    }
    start(){       //原型对象
        for(let i=0;i<this.num;i++){
            this._createLetter();
        }
        this._move();
        this._keydown();
        console.log(this.life);

    }
    _createLetter(){   //内部使用
        let newdiv=document.createElement("div");
        newdiv.className="letter";
        do{
            let randomNum=Math.floor(Math.random()*26)+65;
            var randomLetter=String.fromCharCode(randomNum);
        }while(this.obj[randomLetter]);


        this.obj[randomLetter]=1;

        do{
            var randomLeft=Math.floor(Math.random()*720);
        }while(this._checkLeft(randomLeft));

        newdiv.style.left=randomLeft+"px";

        this.obj[randomLetter]={left:randomLeft,ele:newdiv};
        let randomTop=Math.floor(Math.random()*50);
        newdiv.style.top=randomTop+"px";
        newdiv.innerHTML=randomLetter;

        this.left.appendChild(newdiv);
    }

    _checkLeft(left){
        for(let i in this.obj){
            if(left>this.obj[i].left-80&&left<this.obj[i].left+80){
                return true;
            }
        }
    }
    _move(){
        this.st=setInterval(function(){
            for(let i in this.obj){
                let top=this.obj[i].ele.offsetTop;
                top+=this.speed;
                this.obj[i].ele.style.top=top+"px";
                if(top>this.height){
                    this.lifenum--;
                    console.log(this.life);
                    this.life.innerHTML=this.lifenum;
                    this.left.removeChild(this.obj[i].ele);
                    delete this.obj[i];
                    this._createLetter();
                    if(this.lifenum===0){
                        this._gameover();
                    }
                }
            }
        }.bind(this),60)
    }
    _keydown(){
        this.keydownHander=function(e){
            let kc=e.keyCode;
            let letter=String.fromCharCode(kc);
            if(this.obj[letter]){
                this.left.removeChild(this.obj[letter].ele);
                delete this.obj[letter];
                this._createLetter();
                this.scornum++;
                this.scor.innerHTML=this.scornum;
                if(this.scornum%10==0){
                    this._upstate();
                }
            }
        }.bind(this);
        document.addEventListener("keydown",this.keydownHander);
    }
    _upstate(){
        this.statenum++;
        this.state.innerHTML=this.statenum;
        if(this.statenum<4){
            this._createLetter();
        }else{
            this.speed++;
        }

    }
    _gameover(){
        alert(`游戏结束，当前得分为${this.scornum}`);
        this.left.innerHTML="";
        this.obj={};

        this.scor.innerHTML=0;
        this.state.innerHTML=1;
        this.statenum=0;
        this.lifenum=5;
        this.life.innerHTML=5;
        this.startbtn.style.color="#000";

        if(this.bestScor.length<3||this.scornum>this.bestScor[2].scor){
            let name;
            do{
                name=prompt("请输入你的姓名");
            }while(name==="");
            this.bestScor.push({name,scor:this.scornum});
            this.bestScor.sort(function(a,b){
                if(a.scor>b.scor){
                    return -1;
                }else{
                    return 1;
                }
            });
            if(this.bestScor.length>3){
                this.bestScor.pop();
            }

            localStorage.scor=JSON.stringify(this.bestScor);
            this.updatephb();
        }
        clearInterval(this.st);
        this.flag=true;
        this.scornum=0;
    }
    _pause(){
        clearInterval(this.st);
        document.removeEventListener("keydown",this.keydownHander);
    }
    run(){
        this._move();
        this._keydown();

    }
    updatephb(){
        this.bestScor.forEach(function(v,i){
            this.phb[i].innerHTML=v.name+"-"+v.scor;
        }.bind(this))
    }
}
let scor=document.querySelector("#scor");
let life=document.querySelector("#life");
console.log(life);
let state=document.querySelector("#state");
let left=document.querySelector(".left");
let pauseBtn=document.querySelector("#pause");

let startbtn=document.querySelector("#start");
let phb=document.querySelectorAll(".phb>li>span");
let game=new Game(left,scor,state,life,startbtn,phb);
let flag=true;
startbtn.onclick=function(){
    if(game.flag){
        game.flag=false;
        game.start();
        this.style.color="#ccc";
    }

}
pauseBtn.onclick=function () {
    if(flag){
        game._pause();
        this.innerHTML="继续";
    }else{
        game.run();
        this.innerHTML="暂停";
    }
    flag=!flag;

}
//    let phb=document.querySelectorAll(".phb>li>span");
//    let best=game.bestScor;
//    best.forEach(function(v,i){
//        phb[i].innerHTML=v.name+"-"+v.scor;
//    })

console.log(startbtn);