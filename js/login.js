;$(function(){
	
	
	mui('body').on('tap', '#phoneType', function(e){
				var e = e || window.event;
				e.stopPropagation();
				var $typeList = $('.typeList');
				if($typeList.height()==0){
					$typeList.css('height','1rem');			
				}else{
					$typeList.css('height','0');	
				}
			})
	mui('.typeList').on('tap', '.tyitem', function(e){
				var e = e || window.event;
				e.stopPropagation();
				$('#phoneType').text($(this).text());
				$('.typeList').css('height','0');	
			})	
	
	localStorage.removeItem('user');
	$('body').on('click',function(){
		$('.typeList').css('height','0');	
	})

	//获取URL参数
	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) {
			return decodeURI(r[2]);
		}
		return null;
	};	
	var id = getUrlParam('id');
	var path = getUrlParam('path')||'index';
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
	var getCheckCode = function(){
		var $getCodeBtn = $('#getCode'); 
		var phone = $('#phonrNumer').val();
		var phoneType = $('#phoneType').text();
		if(phone==''){
			mui.toast('请输入手机号');
			return false;
		}else if(phone.length!=11){
			mui.toast('请输入正确手机号');
			return false;
		}
		var lang = getLang();
		if(lang.indexOf('zh')!=-1){
			lang = 'zh';
		};
		$.ajax({
			type:"post",
			url:api.getCode,
			data:{mobile:phone,smsCountryCode:phoneType,lang:lang},
			async:true,
			success:function(res){		
				$getCodeBtn.attr('disabled','disabled');
				mui.toast('验证码已发送，请注意查收！');
				var i = 60;
				var timer = setInterval(function(){
					i--
					$getCodeBtn.val('重新获取（'+i+'）');
					if(i==0){
						clearInterval(timer);
						$getCodeBtn.removeAttr('disabled');
						$getCodeBtn.val('重新发送');						
					}
					
				},1000)
			},
			error:function(res){
				mui.toast('网络错误');
			}
		});		
	}
	var login = function(){
		var phoneNum = $('#phonrNumer').val();
		var checkCode = $('#checkCode').val();
		if(phoneNum==''){
			mui.toast('请输入手机号！');
			return false;
		}else if(phoneNum.length!=11){
			mui.toast('请输入正确手机号！');
			return false;
		}
		if(checkCode==''){
			mui.toast('请输入验证码！');
			return false;			
		}
		$('#loginBtn').attr('disabled','disabled');
		$('#loginBtn').val('登陆中...');	
		$.ajax({
			type:"POST",
			url:api.phoneLogin,			
			data:{mobile:phoneNum,code:checkCode,lang:getLang()},
			async:true,
			success:function(res){
				mui.toast('登录成功');
				localStorage.setItem('quser', JSON.stringify(res));
				setTimeout(function(){
					window.location.href = 'index.html?id='+id;
				},1500)				
			},
			error:function(xhr,res){
				var errorCode = xhr.getResponseHeader('ErrorCode');
					if(errorCode==12){
						mui.toast('验证码错误');						
					}else if(errorCode==13){
						mui.toast('请输入验证码');
					}else if(errorCode==14){
						mui.toast('验证码已过期');
					}else{
						mui.toast('网络错误');
					};
					$('#loginBtn').removeAttr('disabled');
					$('#loginBtn').val('登陆');								
			}
			
		});	
	}

			mui('body').on('tap', '#getCode', function(){
						getCheckCode();
					})	
			mui('body').on('tap', '#loginBtn', function(){
						login();
					})		

	
		//微博登录
		$('#sing').on('click',function(){
			var obj = {
				id:id,
				type:'wb',
			}
			localStorage.setItem('qobj',JSON.stringify(obj));
			window.location.href ="https://api.weibo.com/oauth2/authorize?client_id=3668054464&redirect_uri=http://"+currentHost+"/"+path+".html&response_type=code";
		})
		//微信登录
		$('#weixin').on('click',function(){
			var obj = {
				id:id,
				type:'wx',
			}
			localStorage.setItem('qobj',JSON.stringify(obj));
			window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe684b9740115c7da&redirect_uri=http%3A%2F%2F"+currentHost+"%2F"+path+".html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
		})		

		//手机登录
		$('#phone').on('click',function(){
			
			$('.mapLayr').fadeOut();
			$('.formdata').fadeIn();
		})

});