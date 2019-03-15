$(function(){
	
	
	var code = getUrlParam('code');
	var qobj = JSON.parse(localStorage.getItem('qobj')) || '';
	var weiboToken = '';
	var thirdToken = '';
	var uid = '';
	//登录开始
	var login = function(opt) {
		$.ajax({
			type: "post",
			url: api.otherLogin,
			data: opt,
			async: true,
			success: function(res) {
				localStorage.setItem('quser', JSON.stringify(res));
				userInfo = res;
			},
			error: function(res) {

				mui.toast(opt.accessToken);
				//mui.toast('登录失败,请重试');
			}
		});

	}

	function weiboCallbrack(data) {
		console.log(data);
		var opt = {
			nickName: data.data.screen_name,
			accountId: data.data.id,
			openid: '',
			avatar: data.data.avatar_large,
			userType: 5,
			accessToken: thirdToken,
		};
		login(opt.accessToken);
	}

	function weixinCallbrack(data) {
		var opt = {
			nickName: data.data.nickname,
			accountId: data.data.openid,
			openid: data.data.openid,
			avatar: data.data.headimgurl,
			userType: 4,
			accessToken: thirdToken,
		};
		login(opt);
	}

	//获取微博用户信息
	var getweiboUserInfo = function(token, uid) {
		$.ajax({
			type: "get",
			url: "https://api.weibo.com/2/users/show.json",
			dataType: "jsonp",
			jsonpCallback: "weiboCallbrack",
			data: {
				access_token: token,
				uid: uid
			},
			async: true,
			success: function(res) {
				var opt = {
					nickName: res.data.screen_name,
					accountId: res.data.id,
					openid: '',
					avatar: res.data.avatar_large,
					userType: 5,
					accessToken: thirdToken,
				};
				login(opt);
			},
			error: function(res) {
				mui.toast('获取用户信息失败,请重试');
			}
		});

	};

	function getweixinUserInfo(token, openid) {

		$.ajax({
			type: "get",
			url: api.getweixinUserinfo,
			data: {
				accessToken: token,
				openid: openid,
				lang: getLang()
			},
			async: true,
			success: function(res) {
				var opt = {
					nickName: res.nickname,
					accountId: res.unionid,
					openid: res.openid,
					avatar: res.headimgurl,
					userType: 4,
					accessToken: token,
				};
				login(opt);
			},
			error: function(res) {

				mui.toast('获取用户信息失败,请重试');
			}
		});

	}
	//微博登录,获取token
	function getToken() {
		//$('#code').text(code);
		if(qobj.type === 'wb') {
			$.ajax({
				type: "get",
				url: api.getweiboToken,
				data: {
					code: code
				},
				async: true,
				success: function(res) {
					thirdToken = res.accessToken;
					getweiboUserInfo(res.accessToken, res.uid);
				},
				error: function(res) {
					mui.toast('获取用户token失败,请重试');
				}
			});
		} else if(qobj.type === 'wx') {
			$.ajax({
				type: "get",
				url: api.getweixinToken,
				data: {
					code: code
				},
				async: true,
				success: function(res) {
					thirdToken = res.accessToken;

					getweixinUserInfo(res.access_token, res.openid);
				},
				error: function(res) {

					mui.toast('获取用户token失败,请重试');
				}
			});
		}
	}

	if(code) {
		getToken();
	}	
	
	
})
