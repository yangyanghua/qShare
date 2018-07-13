	;$(function(){
		var options = {
			 scrollY: true, //是否竖向滚动
			 scrollX: false, //是否横向滚动
			 startX: 0, //初始化时滚动至x
			 startY: 0, //初始化时滚动至y
			 indicators: true, //是否显示滚动条
			 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
			 bounce: true //是否启用回弹
			}
		mui('.mui-scroll-wrapper').scroll(options);
		mui.previewImage();
		var mySwiper = {};
		//变量
    	var id = '',
    		uid = '',
    		$banner = $('.banner'),
    		$portrait = $('.portrait'),
    		$DynpublisherName = $('#DynpublisherName'),
    		$level = $('.level'),
    		$score = $('.score'),
    		$numberOfscores = $('.numberOfscores'),
    		$traveltitle = $('.traveltitle'),
    		$viewed  = $('.viewed'),
    		$releaseTime  = $('.releaseTime'),
    		$dynamicList = $('.dynamicList'),
    		$commentsList  = $('.commentsList'),
			$comTotalityNumer  = $('.comTotalityNumer'),
			$colTotalityNumer  = $('.colTotalityNumer'),
			$zanTotalityNumer  = $('.zanTotalityNumer'),
			$userList = $('.userList'),
			$boy = $('.boy'),
			$girl = $('.girl'),
			$passCity = $('.passCity'),
			$usDay = $('.usDay');
	//获取用户信息
	var userInfo = getUserInfo();
	var code = getUrlParam('code');
	var qobj = JSON.parse(localStorage.getItem('qobj'))||'';
	var weiboToken = '';
	var thirdToken = '';
	
	//登录开始
	var login = function(opt){
		$.ajax({
			type:"post",
			url:api.otherLogin,
			data:opt,
			async:true,
			success:function(res){
				localStorage.setItem('quser', JSON.stringify(res));
				userInfo = res;
			},
			error:function(res){
				mui.toast('登录失败,请重试');
			}
		});
		
	}	
	//获取微博用户信息
	var getweiboUserInfo  = function(token,uid){
		$.ajax({
			type:"get",
			url:"https://api.weibo.com/2/users/show.json",
			data:{access_token:token,uid:uid},
			async:true,
			success:function(res){
				var opt  = {
					nickName:res.screen_name,
					accountId:res.id,
					openid:'',
					avatar:res.avatar_large,
					userType:5,
					accessToken:thirdToken,
				};
				login(opt);
			},
			error:function(res){
				mui.toast('获取用户信息失败,请重试');
			}
		});
		
	};
	
	function getweixinUserInfo(token,openid){
		
		$.ajax({
			type:"get",
			url:"https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN",
			data:{access_token:token,openid:openid,lang:getLang()},
			async:true,
			success:function(res){
				var opt  = {
					nickName:res.nickname,
					accountId:res.openid,
					openid:res.openid,
					avatar:res.headimgurl,
					userType:4,
					accessToken:thirdToken,
				};
				login(opt);
			},
			error:function(res){
				mui.toast('获取用户信息失败,请重试');
			}
		});		
		
	}

	//微博登录,获取token
	function getToken(){
		if(qobj.type==='wb'){
			$.ajax({
				type:"get",
				url:api.getweiboToken,
				data:{code:code},
				async:true,
				success:function(res){
					thirdToken = res.accessToken;
					getweiboUserInfo(res.accessToken,res.uid);
				},
				error:function(res){
					mui.toast('获取用户token失败,请重试');
				}
			});			
		}else if(qobj.type==='wx'){
				$.ajax({
					type:"get",
					url:api.getweixinToken,
					data:{code:code},
					async:true,
					success:function(res){
						thirdToken = res.accessToken;
						getweixinUserInfo(res.access_token,res.openid);
					},
					error:function(res){
						mui.toast('获取用户token失败,请重试');
					}
				});				
		}
	}
	
	if(code){
		getToken();
	}
    var getGoodList  = function(id){
    	$.ajax({
    		type:"get",
    		data:{dynamicId:id,isLeast:true},
    		url:api.getGoods,
    		async:true,
    		success:function(res){
    			var userListHtml = '';
    			if(res.applauds.length<=6){
    				$('#loadmoreZan').hide();
    			}else{
    				$('#loadmoreZan').show();
    			}
    			res.applauds.forEach(function(item,index){
    				if(index<=6){
	     				res.bases.forEach(function(item1){
	    					if(item.uid==item1.id){
	    						userListHtml+=
	    							'<li class="userItem" style="background:#ccc url('+item1.avatar+') no-repeat 50% 50%;background-size: cover;" ></li>'
	    					}
	    				})    			 	
    				}
    			})
    			$userList.empty();
    			$userList.append(userListHtml);
    			
    		},
    		error:function(){
    			mui.toast('网络错误');
    		},
    	});
    	
    };
    
    var init = function(id){
		var opt = {
			id:id,
			lang:getLang(),
		}
		if(userInfo){
			opt.accessToken = userInfo.accessToken;
		}
		$.ajax({
			type:"get",
			data:opt,
			url:api.getDetail,
			async:true,
			success:function(res){
				var master = {};
				sessionStorage.setItem('id',res.id);
				getGoodList(res.id);				
				$banner.css("background-image","url("+res.firstUrl+")");
				res.userBases.forEach(function(item){
					if(item.id==res.uid){
						master = item;
						$portrait.find('img').attr("src",item.avatar);
						$DynpublisherName.text(item.nickName);						
					}
				})
				if(master.genderType=='male'){
					$boy.show();
				}else if(master.genderType=='female'){
					$girl.show();
				}

				id = res.id;uid = res.uid;
				$score.text(res.score);
				$viewed.text(res.readCount);
				$traveltitle.text(res.content);
				$comTotalityNumer.text(res.commentCount);
				$zanTotalityNumer.text(res.likeCount);
				$colTotalityNumer.text(res.collectionCount);
				$numberOfscores.text(res.scoreCount);
				$passCity.text(res.cityCount);
				$usDay.text(res.days);
				if(res.isApplaud){
					$('.zanTotality').addClass('isApplaud');
				}else{
					$('.zanTotality').removeClass('isApplaud');
				};
				var createTime  = dateFtt('yyyy-MM-dd hh:mm',new Date(res.createTime));
				$releaseTime.text('发布于'+createTime);
				var phtml = '';
				var swperHtml = '';  
				res.cityVos.forEach(function(item){
					swperHtml+=
					'<div class="swiper-slide"><p class="date">'+dateFtt('yyyy-MM-dd',new Date(item.time))+'</p><p class="cityname">'+item.cityName+'</p><span class="line"></span></div>'
				})
				$('.swiper-wrapper').empty();
				$('.swiper-wrapper').append(swperHtml);
				mySwiper = new Swiper('.citySwiper',{
						freeMode : true,
						slidesOffsetAfter : 100,
						slidesPerView : 3.5,
						centeredSlides : false,	
						navigation: {
						    nextEl: '.swiper-button-next',
						    prevEl: '.swiper-button-prev',
						  },		
					})				
				if(res.cityVos.length < 4){
					$('.swiper-button-black').hide();
				}			
				res.photos.forEach(function(item,index){
					phtml+=
						'<li class="dynamicItem">'+
							'<a  href="javascript:;" imgurl="'+item.photoUrl+'" class="downImage down_btn_a" download  ></a>'+
							'<p class="dateInfo">'+
								'<span class="itemIndex">'+(index+1)+'/'+res.photos.length+'</span>'+
								'<span class="tiem">拍摄于'+dateFtt('yyyy-MM-dd hh:mm',new Date(item.photographTime))+'</span>'+
								'<div class="dynamicImg">'+
									'<img class="lazy" data-original="'+item.photoUrl+'"    data-preview-src="" data-preview-group="1"/>'+
								'</div>'+
								'<p class="address" id="'+item.id+'" index="'+index+'" ><span class="addressIcon"></span>'+item.locationName+'</p>'+
							'</p>'+
							'<p class="dynamicTxt">'+(item.txt?item.txt:'')+'</p>'+
						'</li>'						
				})
				$dynamicList.empty();
				$dynamicList.append(phtml);
			    //懒加载
			     $("img.lazy").lazyload({effect: "fadeIn"});				
				var comhtml = '';
				var uiduser  = {};
				var touser = {};
				res.comments.forEach(function(item){
					res.userBases.forEach(function(item1){
						if(item.uid==item1.id){
							uiduser = item1;					
						}
						if(item.toUid==item1.id){
							touser = item1;					
						}						
					})					
					
					if(item.type==1){
						comhtml +=
								'<li class="commentsItem">'+
									'<div class="userPortrait"><span style="background:#ccc url('+uiduser.avatar+') no-repeat 50% 50%; background-size: cover;"></span></div>'+
									'<div class="commentsTxt">'+
									'<p class="commentInfo">'+
										'<span class="userName">'+uiduser.nickName+'</span>'+
										'<span class="date">'+dateFtt('yyyy-MM-dd hh:mm',new Date(item.createTime))+'</span>'+
									'</p>'+	 
									'<p class="commentContent">'+
										item.content
									'</p>'+							
									'</div>'+								
								'</li>';							
					}else if(item.type==3){
						comhtml +=
								'<li class="commentsItem">'+
									'<div class="userPortrait"><span style="background: url('+uiduser.avatar+') no-repeat 50% 50%; background-size: cover;"></span></div>'+
									'<div class="commentsTxt">'+
									'<p class="commentInfo">'+
										'<span class="userName">'+uiduser.nickName+'</span>'+
										'<span class="date">'+dateFtt('yyyy-MM-dd hh:mm',new Date(item.createTime))+'</span>'+
									'</p>'+	 
									'<p class="commentContent">'+
										'@<span class="name">'+touser.nickName+'</span>：'+ item.content +
									'</p>'+							
									'</div>'+								
								'</li>';							
					}					
				})
				$commentsList.empty();
				$commentsList.append(comhtml);
				$('.loading').fadeOut();
			},
			error:function(xhr,res){
					var errorCode = xhr.getResponseHeader('ErrorCode');
					if(errorCode==9){
						mui.toast('登录超时');
						localStorage.removeItem('user');
					}else if(errorCode==10){
						mui.toast('动态已被删除');
					}else{
						mui.toast('网络错误');
					}
				}
		});    	
   }
    id = getUrlParam('id') || qobj.id;   
    //初始化
    init(id);

 
	function download(src) {
	        var $a = document.createElement('a');
	        $a.setAttribute("href", src);
	        $a.setAttribute("download", "");
	
	        var evObj = document.createEvent('MouseEvents');
	        evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
	        $a.dispatchEvent(evObj);
	    };
			
	mui('body').on('tap', '.downImage', function(){ 
			    	var imgSrc = $(this).attr("imgurl");
			        download(imgSrc);	
			})
	
var mask = mui.createMask(function(){
	$('.comment').css('height','0');
	$('.stars').css('height','0');
});

$('#closeBtn').on('click',function(){
	$('.comment').css('height','0');
	mask.close();//关闭遮罩
})
$('.inputs').on('click',function(){
	if(!userInfo){
		var btnArray = ['关闭', '去登陆'];
				mui.confirm('登陆后才可以评论', '提示', btnArray, function(e) {
					if (e.index == 1) {
						window.location.href = 'login.html?id='+id;
					} else {
						console.log('关闭提示');	
					}
				})
		return false;		
	}else{
		$('.comment').css('height','4.5rem');
		mask.show();//显示遮罩
		$('#textarea').focus();	
	}
})

$('.comTotalityNumer').on('click',function(){
	if(!userInfo){
		var btnArray = ['关闭', '去登陆'];
				mui.confirm('登陆后才可以评论', '提示', btnArray, function(e) {
					if (e.index == 1) {
						window.location.href = 'login.html?id='+id;
					} else {
						console.log('关闭提示');	
					}
				})
		return false;		
	}else{
		mask.show();//显示遮罩
		$('.mui-backdrop').css('bottom','4.5rem');
		$('.comment').css('height','4.5rem');		
		$('#textarea').focus();	
	}
})


//发表评论
$('#sendBtn').on('click',function(){
	var content = $('#textarea').val();
	if(!content){
		mui.toast('请输入评论内容');
	}else{
		var opt = {
			dynamicId:id,
			content:content,
			toUid:uid,
			accessToken:userInfo.accessToken,
		};
		$.ajax({
			type:"post",
			url:api.commentAdd,
			data:opt,
			async:true,
			success:function(res){
				mui.toast('评论成功');
				$('.comment').css('height','0');
				mask.close();//关闭遮罩				
				init(id);
			},
			error:function(xhr,res){
					var errorCode = xhr.getResponseHeader('ErrorCode');
					if(errorCode==9){
						mui.toast('登录超时');
						localStorage.removeItem('user');
						window.location.href = 'login.html?id='+id;
					}else if(errorCode==10){
						mui.toast('动态已被删除');
					}else{
						mui.toast('网络错误');
					}
				}
		});
	}
	
})


//评分关闭
$('.sColse').on('click',function(){	
	$('.stars').css('height','0');
	mask.close();//关闭遮罩	
})
//评分
$('.scorecontent').on('click',function(){
	if(!userInfo){
		var btnArray = ['关闭', '去登陆'];
				mui.confirm('登陆后才可以参加评分', '提示', btnArray, function(e) {
					if (e.index == 1) {
						window.location.href = 'login.html?id='+id;
					} else {
						console.log('关闭提示');	
					}
				})
		return false;		
	}else{
		$('.stars').css('height','9.8rem');
		mask.show();//显示遮罩
		$('.mui-backdrop').css('bottom','9.8rem');
	}
})

//评分

$('.starsList').on('click','.star',function(){
	var index = $(this).index();
	$('.star').removeClass('active');
	$('.star').map(function(index1,item){
		if(index1<=index){
			$(this).addClass('active');
		}
	})
	$('.scoreNum').text(index+1);
	
})

$('.sSubmitbtn').on('click',function(){
	var scores = $('.scoreNum').text();
	if(scores==0){
		mui.toast('请选择分数');
		return false;
	}else{
		var opt = {
			accessToken:userInfo.accessToken,
			dynamicId:id,
			score:scores
		}		
		$.ajax({
			type:"post",
			url:api.score,
			data:opt,
			async:true,
			success:function(res){
				mui.toast('评分成功');
				$('.stars').css('height','0');
				mask.close();//关闭遮罩					
			},
			error:function(){
					var errorCode = xhr.getResponseHeader('ErrorCode');
					if(errorCode==9){
						mui.toast('登录超时');
						localStorage.removeItem('user');
					}else if(errorCode==10){
						mui.toast('动态已被删除');
					}else{
						mui.toast('评分失败');
					}				
			}
		});
		
	}	
	
})


$('.colTotalityNumer').on('click',function(){
		if(!userInfo){
			var btnArray = ['关闭', '去登陆'];
					mui.confirm('登陆后才可以收藏', '提示', btnArray, function(e) {
						if (e.index == 1) {
							window.location.href = 'login.html?id='+id;
						} else {
							console.log('关闭提示');	
						}
					})
			return false;		
		}else{
			var opt = {
				dynamicId:id,
				accessToken:userInfo.accessToken,
			};
			$.ajax({
				type:"post",
				url:api.collection,
				data:opt,
				async:true,
				success:function(res){
					mui.toast('收藏成功');
					init(id);
				},
				error:function(xhr,res){
					var errorCode = xhr.getResponseHeader('ErrorCode');
					if(errorCode==9){
						mui.toast('登录超时');
						localStorage.removeItem('user');
						window.location.href = 'login.html?id='+id;
					}else if(errorCode==10){
						mui.toast('动态已被删除');
					}else{
						mui.toast('网络错误');
					}
				}
			});
		}

})

$('.zanTotalityNumer').on('click',function(){
		if(!userInfo){
			var btnArray = ['关闭', '去登陆'];
					mui.confirm('登陆后才可以点赞', '提示', btnArray, function(e) {
						if (e.index == 1) {
							window.location.href = 'login.html?id='+id;
							
						} else {
							console.log('关闭提示');	
						}
					})
			return false;		
		}else{
			var opt = {
				dynamicId:id,
				toUid:id,
				accessToken:userInfo.accessToken,
			};
			var isApplaud = $('.zanTotality').attr('class').indexOf('isApplaud')!=-1;
			if(isApplaud){
				$.ajax({
					type:"post",
					url:api.cancleAdd,
					data:opt,
					async:true,
					success:function(res){
						mui.toast('已取消');
						init(id);
					},
					error:function(xhr,res){
						var errorCode = xhr.getResponseHeader('ErrorCode');
						if(errorCode==9){
							mui.toast('登录超时');
							localStorage.removeItem('user');
							window.location.href = 'login.html?id='+id;
						}else if(errorCode==10){
							mui.toast('动态已被删除');
						}else{
							mui.toast('网络错误');
						}
					}
				});				
			}else{
				$.ajax({
					type:"post",
					url:api.goodAdd,
					data:opt,
					async:true,
					success:function(res){
						mui.toast('点赞成功');
						init(id);
					},
					error:function(xhr,res){
						var errorCode = xhr.getResponseHeader('ErrorCode');
						if(errorCode==9){
							mui.toast('登录超时');
							localStorage.removeItem('user');
							window.location.href = 'login.html?id='+id;
						}else if(errorCode==10){
							mui.toast('动态已被删除');
							//window.history.go(-1);
						}else{
							mui.toast('网络错误');
						}
					}
				});				
			}
		}
})

$('.dynamicList').on('click','.address',function(){
	window.location.href = 'detailmap.html?id='+id+'&index='+$(this).attr('index');
})

$('.toMap').on('click',function(){
	window.location.href = 'detailmap.html?id='+id;
})



//查看赞列表
$('#loadmoreZan').on('click',function(){
	window.location.href = 'likeList.html?id='+id;
	
})

$('#textarea').on('keyup',function(){			
			if($(this).val().length>0){
			 	$('#sendBtn').css('color','#dd524d');	
			}else{
				$('#sendBtn').css('color','#333333');
			}
	})


$('.rankingListContent').on('touchmove',function(e){
	var e = window.event || e;
	e.stopPropagation();
	//e.preventDefault();
})
//排行关闭
$('.colseRank').on('click',function(){
	$('.rankingListContent').fadeOut();
	$('body').css({'overflow':'auto'});
})
//查看排行
$('.ranking').on('click',function(){
	$('.rankingListContent').fadeIn();
	$('body').css({'overflow':'hidden'});
	getRankList();
	
})




//排行榜==>查看详情

$('.rankListUl').on('click','.rankItem',function(){	
	var id = $(this).attr('detaiId');	
	if(id){
		window.location.href = 'list.html?id='+id;
	}
})


//获取排行列表

function getRankList(){
	
	$.ajax({
		type:"get",
		url:api.scoreList,
		data:{isLeast:true},
		async:true,
		success:function(res){
//		if(res.object.length>7){res.object.length = 7};
		var c = '';
			res.forEach(function(item,index){
			 c += `<li class="rankItem" detaiId = "${item.id}">
							<p class="rankIndex">${index+1}</p>
							<p class="rankimage"><span style="background: url(${item.avatar}) no-repeat 50% 50%;background-size:cover;"></span></p>
							<p class="rankName">${item.nickName}</p>
							<p class="rankLike">${item.maxScore}</p>
							<p class="rankRight"></p>
					</li>`
			});
		$('.rankListUl').empty();
		$('.rankListUl').append(c);
		},
		error:function(res){
			mui.toast('网络错误');
		}
		
	});
	
}





});