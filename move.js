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
    //׼��һЩ����
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        //�ܾ���
        dis[name] = json[name]-start[name];
    }

    //�ܴ���
    var count = Math.floor(options.duration/30);

    //��ǰ���˶��ٴ�
    var n=0;
    obj.timer=setInterval(function(){
        n++;

        //�ж�name�ǲ��� opacity
        //��opacity ���ܼ�px ���Ե����ó�����ֵ
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