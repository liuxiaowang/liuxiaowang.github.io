$(function(){
    //判断和限制字数
    $("#text").on("keydown keyup",function(){
        var l=$(this).val().length;
        if(l>40){
            l=40;
            $(this).val(function(i,val){
                alert("字数超过限制");
                return val.slice(0,40);

            })
        }
        $(".notice span").text(function(){
            return l<10?"0"+l:l;
        });
    })
//点击提交
    $("#submit").click(function(){

        var val=$("#text").val();
        if(val==""){
            alert("请输入内容");
            return;
        }
        $.get("insert.php",{val:val,isDone:false,isStar:false,isDel:false},function(r){
            if(r==1){
                alert("添加成功");
                select();$("#text").val("");
            }
        })

    });

    function select(){
        $.get("select.php",function(r){
            write(r);
            console.log(r);
        },"json");
    }
    select();
    function write(r){
        var str1="",str2="";
        $.each(r,function(index,val){
            if(val.isDone=='false'){
                str1+=`<li id="${val.id}">
                    <input type="checkbox">
                    <p>${val.text}</p>
                    <time><i>&#xe602;</i>${val.time}</time>
                `;
                if(val.isStar=="1"){
                    str1+=`<i class="active">&#xe601</i></li>`;
                }else{
                    str1+=`<i>&#xe601</i></li>`;
                }
            }else if(val.isDone=='true'){
                str2+=`<li id="${val.id}">
                    <input type="checkbox">
                    <p>${val.text}</p>
                    <time><i>&#xe602;</i>${val.time}</time>
                    `;
                if(val.isStar==='0'){
                    str2+=`<i>&#xe601</i></li>`;
                }else{
                   str2+=`<i class="active">&#xe601</i></li>`;
                }
            }
        })
        $(".wait ul").html(str1);
        $(".done ul").html(str2);
    }
    //关闭添加界面
    $(".close").click(function(){
        $(".add").slideUp(300);
        $(".wait").delay(200).slideDown(300);
    })
    //选项卡
    $(".leftbar ul li").click(function(){
        var index=$(this).index();
        $(".item").hide().eq(index+1).show();
    })
    //跳转到添加页面
    $(".addbtn").click(function(){
        $(".item").hide().siblings(".add").slideDown(500);
    })

    $(".movebtn").click(function(){
        $(".wait ul li").each(function(index,val){
            if($(this).find("input").prop("checked")){
                // alert(1);
                var index=$(this).attr("id");
                console.log(index);
                $.get("update.php",{id:index,attr:'isDone',val:true},function(r){
                    select();
                });

            }
        })
    });
    $(".clearbtn").click(function(){
        $(".done ul li").each(function(index,ele){
            if($(this).find("input").prop("checked")){
                var index=$(this).attr("id");
                $.get("delete.php",{id:index,attr:'isDel',val:true},function(r){
                    select();
                });
            }
        })

    })
    $(".wait ul").on("click","i",function(){

        console.log($(this).context.className);
        var index=$(this).parent().attr("id");
        console.log(index);
        if($(this).context.className){
            $.get("update.php",{id:index,attr:'isStar',val:'0'},function(){
                select();
            })
        }else{
            $.get("star.php",{id:index,attr:'isStar',val:'1'},function(){
                select();
            })
        }


    })

})