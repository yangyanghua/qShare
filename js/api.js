var httpService = '';
var currentHost = location.host;


if (currentHost == '127.0.0.1:8020' || currentHost == '172.16.0.59:8080' ) {
  
  httpService = 'http://pred-api.irenao.cn'; //測試/預生產
  
}else if(currentHost == 'pred-h5.irenao.cn'){
	 httpService = 'http://pred-api.irenao.cn'; //測試/預生產
}else{
	 httpService = 'http://pred-api.irenao.cn'; //測試/預生產
}

var api = {
	getDynamicList:httpService	+ '/api/v1/dynamic/user/list',//用户动态列表
	getUserDetail:httpService	+ '/api/v1/user/detail',//用户信息详情
	getDetail:httpService +'/api/v1/dynamic/detail',//详情
	getGoods:httpService+'/api/v1/good/list',//赞列表
	commentList:httpService +	'/api/v1/comment/list',//评论列表
	phoneLogin:httpService+'/api/v1/user/login',//手机登陆
	getCode:httpService+'/api/v1/user/send/sms',//获取验证码
	otherLogin:httpService+'/api/v1/user/register',//第三方登陆
	collection:httpService+'/api/v2/dynamic/collection',//收藏
	commentAdd:httpService+'/api/v1/comment/add',//评论
	goodAdd:httpService+'/api/v1/good/add',//点赞
	cancleAdd:httpService+'/api/v1/good/cancle',//取消赞
	getweiboToken:httpService+'/api/v1/weibo/accesstoken',//获取微博token
	getweixinToken:httpService+'/api/v1/weixin/accesstoken',//获取微信token
	getweixinUserinfo:httpService+'/api/v1/weixin/userinfo',//获取微信token
  readRank:httpService+'/api/v2/dynamic/read/rank',//阅读榜
  fansList:httpService + '/api/v1/friend/fans/list',//用户粉丝列表
  dynamicPhotoCount:httpService+'/api/v1/dynamic/dynamicPhotoCount',//用户图
  dynamicList:httpService+'/api/v2/dynamic/map/user/list',//用户图片
	score:httpService+'/api/v2/dynamic/score',//用户评分
	cityList:httpService+'/api/v2/dynamic/city/list',//用户城市照片分类
	countryList:httpService+'/api/v2/dynamic/country/list',//用户国家照片分类
	scoreList:httpService + '/api/v1/user/rank/score',//用户评分榜
	photoLocation:httpService + '/api/v2/dynamic/photo/location',//获得国家、市照片
	
}

	//获取用户信息
	var getUserInfo = function(){
		var user  = JSON.parse(localStorage.getItem('quser')) || '';
		return user;
	};		
	//获取浏览器语言
	var getLang = function(){
		　　var type = navigator.appName; 
		   var lang = '';
		　　if (type == "Netscape"){  
		   
		   　	　lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
		　　
			}else{
		 
		 　　	lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
		
		　　};
		return lang;
	};
	//获取URL参数
	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) {
			return decodeURI(r[2]);
		}
		return null;
	};
function dateFtt(fmt,date)   
			{ //author: meizz   
			  var o = {   
			    "M+" : date.getMonth()+1,                 //月份   
			    "d+" : date.getDate(),                    //日   
			    "h+" : date.getHours(),                   //小时   
			    "m+" : date.getMinutes(),                 //分   
			    "s+" : date.getSeconds(),                 //秒   
			    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
			    "S"  : date.getMilliseconds()             //毫秒   
			  };   
			  if(/(y+)/.test(fmt))   
			    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
			  for(var k in o)   
			    if(new RegExp("("+ k +")").test(fmt))   
			  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			  return fmt;   
			} 
			
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function(){

	
		//下载app
		$('.downBtn').on('click',function(){
			window.location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.rightnoworld.globalview';
		})
	
})
