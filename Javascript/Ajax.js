/**
 * Created by Computer on 2016/6/20. 兼容性写法
 */
function createHTTPRequest(){
    try{
        return new window.XMLHttpRequest();
    }catch (e){
        try{
            return new ActiveXObject("MSXML2.XMLHTTP.6.0");
        }catch (e){
            try{
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            }catch (e){
                try{
                    return new ActiveXObject("MSXML2.XMLHTTP");
                }catch (e){
                    throw Error("this browser is not supported");
                    return;
                }
            }
        }
    }
}
function ajaxRequest(_method,_url,_async,_parameter,_function){
    var _ajax=createHTTPRequest();
    if(_ajax){
        _ajax.onreadystatechange=function(){
            if(_ajax.readyState==4 && _ajax.status==200){				
                _function(_ajax.responseText);
            }
        }
        _ajax.open(_method,_url,_async);
        _ajax.setRequestHeader("Content-Type","Application/x-www-form-urlencoded;charset=utf-8");
        _ajax.send(_parameter);
    }
}


