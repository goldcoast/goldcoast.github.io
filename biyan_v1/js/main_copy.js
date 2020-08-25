
// todo: 
// 1. fontawsome 里的两个图标替换， 再去掉fontawsome的样式文件   done
// 2. 增加websocket全局状态判断逻辑，不然页面在没有连接ws服务时，保存会失败

    /*==================================================================
    [ Validate ]*/
    // var input = $('.validate-input .input100');

    var node4wifi = document.getElementById('wifiName') 
    var node4pwd = document.getElementById('pwd')
    var node4nick = document.getElementById('nickName')

    function str_trim(node){
        return (node.value+'').trim()
    }

    function showValidate(node){
        // console.log('showValidate node', node)
        node.parentNode.className += ' alert-validate'
    }

    function validateNode(node){
        if(str_trim(node)===''){
            showValidate(node)
            return false;
        }
        return true;
    }

    function sub(){
        var isWifi = validateNode(node4wifi)
        var isPwd = validateNode(node4pwd)
        var isNick = validateNode(node4nick)

        if(isWifi && isPwd && isNick){
            console.log('send ...')
            // 处理别名接口
            var nickSetting = `10004/${node4nick.value||'笔颜小白'}`
            socketSendMsg(nickSetting)
            
            // 处理wifi设备接口
            setTimeout(function(){
                var wifiSetting = `10002/${node4wifi.value}/${node4pwd.value}`
                socketSendMsg(wifiSetting)
            }, 500)

            document.getElementById('setting').style.display='none'
            document.getElementById('done').style.display='block'
        }else{
            console.log('fail.. ')
        }
        return false;
    }

    function hideValidate(id) {
        
        var classNames = document.getElementById(id).parentNode.className 
        
        document.getElementById(id).parentNode.className = classNames.replace('alert-validate','')

        // var thisAlert = $(input).parent();

        // $(thisAlert).removeClass('alert-validate');
    }
    
    //-----------------------web socket --------------------------------------

/** msg 只能是 str, 不能发送对象信息 */
function socketSendMsg(msg){
    console.log('.. socketSendMsg ', msg)
    socket.send(msg+'');
};


var msgArray = []  // 保存接收信息
var wsUri ="ws://192.168.1.1:8000"; 
// var socket = new WebSocket(wsUri); 
var socket = ''
// 监听Socket的关闭
socket.onclose = function(event) {
	console.log('Client notified socket has closed',event); 
	// logc(event);
}; 
socket.onerror = function(event) {
	console.log('Client notified socket has error',event); 
	// logc(event);
}; 
socket.onmessage = function(event) {
	try{
        msgArray.push(event)
        localStorage.setItem('onSocketMsg', msgArray);
		console.log('Client received a message',event); 
		// logc(event);
	}catch(e){
		console.log("message: "+ e);
	}
};
// 打开Socket 
socket.onopen = function(event) {
	console.log("Connected", event);
	// logc(event);
};
