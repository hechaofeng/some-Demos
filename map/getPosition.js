/**
 * Created by Administrator on 2016/12/19 0019.
 */
var getPosition;
if(location.href.match(/map\.html/)){//辨识是否是 在地图页面（map.html）获取位置信息！
    getPosition=function(getMyPosition){
        var doc = document;
        var msg=document.getElementById("msg");
        var map = new BMap.Map("allmap");
        var myPosition={};
        function lodeSupport(){
            if(navigator.geolocation){
                //msg.innerHTML = '注：使用第三方地图，可能会和实际情况有所偏移，均属于正常情况。';
                //showDiv.style.display = 'block';
                navigator.geolocation.getCurrentPosition(updataPosition);
            }else{
                msg.innerHTML = '您的浏览器已禁止获取您的位置信息~';
            }
        };
        function updataPosition(position){
            var latitudeP = position.coords.latitude,
                longitudeP = position.coords.longitude,
                accuracyP = position.coords.accuracy;
            //在百度 map中显示地址
            var point = new BMap.Point(longitudeP , latitudeP);  // 创建点坐标
            BMap.Convertor.translate(point,0,translateCallback);     //真实经纬度转成百度坐标

        };
        //坐标转换完之后的回调函数
        function translateCallback(point1){
            var marker1 = new BMap.Marker(point1);
            console.log(point1);
            myPosition.Latitude=point1.lat;
            myPosition.Longitude=point1.lng;
            console.log(myPosition);
            getMyPosition(myPosition)
           // map.addOverlay(marker1);
           // var label = new BMap.Label("您的位置",{offset:new BMap.Size(20,-10)});
           // marker1.setLabel(label); //添加百度label
            //map.setCenter(point1);
           // getPosition(point1);
        };
        window.addEventListener('load', lodeSupport , true);
        (function(){        //闭包
            function load_script(xyUrl, callback){
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = xyUrl;
                //借鉴了jQuery的script跨域方法
                script.onload = script.onreadystatechange = function(){
                    if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
                        callback && callback();
                        // Handle memory leak in IE
                        script.onload = script.onreadystatechange = null;
                        if ( head && script.parentNode ) {
                            head.removeChild( script );
                        }
                    }
                };
                // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
                head.insertBefore( script, head.firstChild );
            }
            function translate(point,type,callback){
                console.log('point:'+point)
                var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
                var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
                //动态创建script标签
                load_script(xyUrl);
                BMap.Convertor[callbackName] = function(xyResult){
                    delete BMap.Convertor[callbackName];    //调用完需要删除改函数
                    var point = new BMap.Point(xyResult.x, xyResult.y);
                    callback && callback(point);
                }
            };
            window.BMap = window.BMap || {};
            //var navigationControl = new BMap.NavigationControl({
            //    // 靠左上角位置
            //    anchor: BMAP_ANCHOR_TOP_LEFT,
            //    // LARGE类型
            //    type: BMAP_NAVIGATION_CONTROL_LARGE,
            //    // 启用显示定位
            //    enableGeolocation: true
            //});
            //BMap.Convertor = {};
            //BMap.Convertor.translate = translate;
            //map.addControl(navigationControl);
            //geolocationControl.addEventListener("locationSuccess", function(e){
            //    // 定位成功事件
            //    var address = '';
            //    address += e.addressComponent.province;
            //    address += e.addressComponent.city;
            //    address += e.addressComponent.district;
            //    address += e.addressComponent.street;
            //    address += e.addressComponent.streetNumber;
            //    alert("当前定位地址为：" + address);
            //});
        })();
    }
}else{
    getPosition=function(getMyPosition){
        var myPosition={};
        myPosition.Latitude='',
        myPosition.Longitude='';
        getMyPosition(myPosition)
    }
}





