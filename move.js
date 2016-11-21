/**
 * Created by Administrator on 2016/9/29.
 */
function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
    clearInterval(obj.timer);
    options = options || {};
    options.easing = options.easing || 'linear';
    options.duration = options.duration || 800;
    var start = {};
    //{width:200,height:200}
    var dis = {};
    //准备一些东西
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        //总距离
        dis[name] = json[name]-start[name];
    }

    //总次数
    var count = Math.floor(options.duration/30);

    //当前走了多少次
    var n=0;
    obj.timer=setInterval(function(){
        n++;

        //判断name是不是 opacity
        //是opacity 不能加px 所以单独拿出来赋值
        for(var name in json){
            switch (options.easing){
                case 'linear':
                    var a = n/count;
                    var cur = start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a = 1-n/count;
                    var cur = start[name]+dis[name]*(1-a*a*a);
                    break;
            }

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+(cur*100)+')';
            }else{
                obj.style[name]=cur+'px';

            }
        }
        if(n==count){
            clearInterval(obj.timer);
            options.complete&&options.complete();
        }
    },30);
}