/**
 * Created by Administrator on 2017/2/21 0021.
 */
/*
    //选中上次选中的 ‘发票信息’和‘地址信息’
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain');
    document.body.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
window.confirm = function(str){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain');
    document.body.appendChild(iframe);
    //window.frames[0].window.confirm(str);
    var result = window.frames[0].window.confirm(str);
    iframe.parentNode.removeChild(iframe);
    return result;
};
window.prompt = function(str){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain');
    document.body.appendChild(iframe);
    //window.frames[0].window.confirm(str);
    var result = window.frames[0].window.confirm(str);
    iframe.parentNode.removeChild(iframe);
    return result;
};*/
//模拟 alert 弹窗
//myalert('我是弹窗啊');
//---------------------------------------------------- myalert(str)  ----------------------------------------------------------------------------
function myalert(str){
    //获取可视区域的 尺寸
    var str=str||'';
    $('body')[0].style.overflowY='hidden';
    _width=document.documentElement.clientWidth;
    _height=document.documentElement.clientHeight;
    //alert(_width);alert(_height)
    console.log(_height)
    console.log(_width)
    //遮罩层 和弹窗 的样式
    var mask='<div class="alertMask" style="background:#666;position:absolute;z-index=999;top:0;left:0;right:0;bottom:0;opacity=0.3;width:100%;height:'+_height+'px"></div>';
    var alertDiv='<div class="alertDiv" style="border-radius:8px;overflow:hidden;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;background-color: #fff;opacity:0.2;position: absolute;z-index=1000;top:'+_height/2+'px;margin-top:-40px;left:20%;width:60%;max-width:300px;text-align: center;transform:0.6"><div class="alertDiv-msg" style="line-height:20px;padding:15px;border-bottom:1px solid #efefef;color:#333">'+str+'</div><div class="alertDiv-ok" style="height:40px;line-height: 35px;-webkit-tap-highlight-color: rgb(220,220,220);color:#417ae2">好</div></div>';
    $('body').append(mask);
    $('body').append(alertDiv);
    var num=0.1;
    var num2=0.6;
    //遮罩层 和弹窗 的进入动画
    var id=setInterval(function(){
        num+=0.02;
        num2+=0.02;
        $('.alertMask').css({'opacity':num});
        $('.alertDiv').css({'opacity':num*2});
        $('.alertDiv')[0].style.transform='scale('+num2+')';
        if(num>=0.5){
            clearInterval(id);
        }
    },10)
};
$('.alertDiv-ok').click(function(){
    $('.alertMask').remove();
    $('.alertDiv').remove();
    $('body')[0].style.overflowY='auto';
});
//myprompt('我是弹窗啊1','我是弹窗啊2','我是弹窗啊3');
//---------------------------------------------------- myprompt(str1,str2,str3)  ----------------------------------------------------------------------------
function myprompt(str1,str2,str3){
    var str1=str1||'提示';
    var str2=str2||"请输入";
    var str3=str3||"";
    //获取可视区域的 尺寸
    $('body')[0].style.overflowY='hidden';
    _width=document.documentElement.clientWidth;
    _height=document.documentElement.clientHeight;
    //alert(_width);alert(_height)
    console.log(_height);
    console.log(_width);
    //遮罩层 和弹窗 的样式
    var mask='<div class="alertMask" style="background:#666;position:absolute;z-index=999;top:0;left:0;right:0;bottom:0;opacity=0.3;width:100%;height:'+_height+'px"></div>';
    var alertDiv='<div class="alertDiv" style="border-radius:8px;overflow:hidden;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;background-color: #fff;opacity:0.2;position: absolute;z-index=1000;top:'+_height/2+'px;margin-top:-60px;left:16%;width:68%;max-width:320px;text-align: center;transform:0.6">'
        +'<div style="padding:6px 4%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;border-bottom:1px solid #efefef">'
        +'<div style=" color:#2a2a2a;font-weight: 600;line-height: 22px;">'+str1+'</div>'
        +'<div style="line-height:20px;color:#2a2a2a;font-size:12px;">'+str2+'</div>'
        +'<input name="myprompt" type="text" placeholder="'+str3+'" style="width:92%;height:20px;color:#2a2a2a;outline:none;-webkit-appearance: none;-moz-appearance: none;appearance: none;border:1px solid #2a2a2a;box-sizing:border-box;padding-left:5px;"/>'
        +'</div>'
        +'<div class="alertDiv-cancel" style="height:40px;line-height:40px;-webkit-tap-highlight-color: rgb(220,220,220);color:#417ae2;width:50%;float:left;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;border-right:1px solid #efefef">取消</div>'
        +'<div class="alertDiv-sure" style="height:40px;line-height:40px;-webkit-tap-highlight-color: rgb(220,220,220);color:#6391e6;width:50%;float:left;font-weight: 600">确定</div>'
        +'</div>';
    $('body').append(mask);
    $('body').append(alertDiv);
    var num=0.1;
    var num2=0.6;
    //遮罩层 和弹窗 的进入动画
    var id=setInterval(function(){
        num+=0.02;
        num2+=0.02;
        $('.alertMask').css({'opacity':num});
        $('.alertDiv').css({'opacity':num*2});
        $('.alertDiv')[0].style.transform='scale('+num2+')';
        if(num>=0.5){
            clearInterval(id);
        }
    },10)
};
//点击 myprompt->‘取消’
$('body').delegate('.alertDiv-cancel','click',function(){
    hidePrompt();
});
function hidePrompt(){
    $('.alertMask').remove();
    $('.alertDiv').remove();
    $('body')[0].style.overflowY='auto';
};

//点击 myprompt->‘确定’
$('body').delegate('.alertDiv-sure','click',function(){
    promptCallback();
    hidePrompt();
});

//---------------------------------------------------- myRemaind(str)  ----------------------------------------------------------------------------
function myRemaind(str) {
    var str=str||'';
    var _remaind = '<div id="remaind" style="width:183px;border-radius: 5px;overflow: hidden;position: fixed;bottom:80px;left:50%;margin-left:-92px;;padding:55px 10px 10px 10px;text-align: center;color:#fff;background: url(\'./images/ok.png\') center 13px no-repeat #3d3d3d;background-size: 31px 31px;opacity: 0.5">'+str+'</div>';
    $('body').append(_remaind);
    var num = 0.5;
    var a= 0.02;
    var id = setInterval(function () {
        num += a;
        if (num >= 1) {
            a= -0.02;
            clearInterval(id);
            //移除提示;
            setTimeout(function(){$('#remaind').remove()},500);
        }
        ;
        $('#remaind').css({opacity: num});
    }, 20);
}
