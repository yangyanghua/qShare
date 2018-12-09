$(function(){
	
	var id =  getUrlParam('id');
	//var  id = 2716; 
	var user = getUserInfo();
	var token  = '';
	if(user){
		token = user.accessToken;
	};
	
	
	var thisUserInfo = {};
	var lastId = '';
	var nowNav = 'dynamicList';
	var nomore = false;
	//用户足迹列表
	function getDynamicList(id,empty,dynamicId){
		var dyId = dynamicId || '';
		var isLeast = true;
		if(dyId){
			isLeast = false;
		}
		
		$.ajax({
			type:"get",
			url:api.getDynamicList,
			data:{isLeast:isLeast,userId:id,accessToken:token,dynamicId:dyId},
			async:true,
			success:function(res){
			var dynamicHtml1 = '';
			var dynamicHtml2 = '';
			if(res.object.length>0){
				var obj =  res.object[res.object.length-1];
				if(obj.dynamics.length > 0){
					lastId = obj.dynamics[obj.dynamics.length-1].id;
					nomore = false
				}else if(res.object[0].dynamics.length == 0){				
					nomore = true;			
				};				
			}else{
				nomore = true;			
			}
			res.object.forEach(function(item,index){
			//	console.log(item.dynamics[0].firstUrl);
				
				
					item.dynamics.forEach(function(item1,index1){
						
						var title = item1.title || '';
								dynamicHtml1+=`<li class="imageItem dynamics" id="${item1.id}">
										<div class="image">
											<img class="lazy"  src="${item1.firstUrl}" />
										</div>
										<div class="info" >
										<h2 class="cname">${title}</h2>
										<div class="c_userInfo">
											<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
											<div class="c_user">
												<p class="c_userName">${thisUserInfo.nickName}</p>
												<p>${new Date(item1.createTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
											</div>							
										</div>
										<span class="photoCount">${item1.photoCount}<span>
										</div>
									</li>`				
					})



			})
			if(empty){
				$('.imageList').empty();
			}
			$('.imageList').append(dynamicHtml1);
			setPsition();
			$('.loading').fadeOut();	
			},
			error:function(){
				
			}
		});
	}
	//城市列表
	function getCityList(id){
		$('.imageList').css('opacity','0');
		$('.loadingTxt').show();
		$.ajax({
			type:"get",
			url:api.cityList,
			data:{isLeast:true,userId:id},
			async:true,
			success:function(res){
				console.log(res);
				var cityListHtml1 = '';
				res.forEach(function(item,index){
					var title = item.title || '' ;
						cityListHtml1 += `<li class="imageItem city"  citycode="${item.code}">
								<div class="image">
									<img class="lazy" data-original="${item.url}"    data-preview-src="" data-preview-group="1"/>
								</div>
								<div class="info">
								<h2 class="cname">${title}</h2>
								<div class="c_userInfo">
									<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
									<div class="c_user">
										<p class="c_userName">${thisUserInfo.nickName}</p>
										<p><span class="timeLabel">From</span>${new Date(item.startTime).Format('yyyy-MM-dd')}</p>
										<p><span class="timeLabel">To</span>${new Date(item.endTime).Format('yyyy-MM-dd')}</p>
									</div>							
								</div>
								<span class="photoCount">${item.photoCount}<span>
								</div>
							</li>`							


				});
				$('.imageList').empty();
				$('.imageList').append(cityListHtml1);
				setPsition();
			//懒加载			
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList"), failurelimit : 2 });
			
			
			},
			error:function(){
				
			}
		});		
	}

	//国家列表
	function getCountryList(id){
		$('.imageList').css('opacity','0');
		$('.loadingTxt').show();
		$.ajax({
			type:"get",
			url:api.countryList,
			data:{isLeast:true,userId:id},
			async:true,
			success:function(res){
				var CountryListHtml1 = '';
				res.forEach(function(item,index){
					var title = item.title || '' ;
						CountryListHtml1 += `<li class="imageItem country" countrycode="${item.code}">
								<div class="image">
									<img class="lazy" data-original="${item.url}"    data-preview-src="" data-preview-group="1" />
								</div>
								<div class="info">
								<h2 class="cname">${title}</h2>
								<div class="c_userInfo">
									<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
									<div class="c_user">
										<p class="c_userName">${thisUserInfo.nickName}</p>
										<p><span class="timeLabel">From</span>  ${new Date(item.startTime).Format('yyyy-MM-dd')}</p>
										<p><span class="timeLabel">To</span> ${new Date(item.endTime).Format('yyyy-MM-dd')}</p>
									</div>							
								</div>
								<span class="photoCount">${item.photoCount}<span>
								</div>								
							</li>`							

					
				
				});
				$('.imageList').empty();
				$('.imageList').append(CountryListHtml1);
				setPsition();
			//懒加载
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList"), failurelimit : 2 });
			},
			error:function(){
				
			}
		});		
	}	
	
	//粉丝列表
	function getFansList(id){

		$.ajax({
			type:"get",
			url:api.fansList,
			data:{userId:id,accessToken:token},
			async:true,
			success:function(res){
				console.log(res);
				var fansListHtml = '';
				
				var btn = '';
				console.log(user.id);
				res.forEach(function(item){
					if(res.userFollowState == 'to'){
						btn  = `<button class="foll-btn fllowed isfllowed" id="${item.id}" ><span class="icon gou">已关注</span></button>`;	
					}else if(res.userFollowState == 'two'){
						btn  = `<button class="foll-btn fllowed fllowedAll" id="${item.id}" ><span class="icon xianghu">相互关注</span></button>	`;	
					}else{
						btn  = `<button class="foll-btn jiaBtn listAdd" id="${item.id}" ><span class="icon jia">关注</span></button>		`;	
					}
					if(user.id == item.id){
						btn = '';
					}
					
					
					fansListHtml += `<li class="fansItem" userid="${item.id}" >
						<div class="fansImage"><span style="background:#CCCCCC url(${item.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
						<div class="fansInfo">
							<p class="fansName">${item.nickName}</p>
							<p>快看ID:${item.no}</p>
							<p>上次登录：${new Date(item.updateTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
						</div>
						${btn}
					</li>`				
				});
				$('.fansList').empty();
				$('.fansList').append(fansListHtml);
			},
			error:function(){
				
			}
		});				

	}
	
	function getUserDetail(id){
		
		$.ajax({
			type:"get",
			data:{toUid:id,accessToken:token},
			url:api.getUserDetail,
			async:true,
			success:function(res){
			var leve = '';
			$('.userId').text('ID：'+res.no);
			thisUserInfo = res;
			getDynamicList(id,true);
	
			var btn = '';
			
			if(res.id == user.id){
				btn = '';
			}else{
				if(res.userFollowState == 'to'){
					
					btn = `<button class="foll-btn fllowed isfllowed" ><span class="icon gou">已关注</span></button>`;
					
				}else if(res.userFollowState == 'two'){
					btn = `<button class="foll-btn fllowed fllowedAll" ><span class="icon xianghu">相互关注</span></button>`;
				}else{
					btn = `<button class="foll-btn jiaBtn headerAdd" ><span class="icon jia">关注</span></button>`;
	
				}				
			}
		
			if(res.level=='freshman'||res.level=='junior'){
				leve = './image/btnphontoer12x.png';
			}else if(res.level=='medium'){
				leve = './image/btn_phontoer2x.png';
			}else if(res.level=='senior'||res.level=='highest'){
				leve = './image/btn_phontoer3x.png';
			};
			
			
			var sexImage = ''
			if(res.genderType == 'male') {
					sexImage = './image/icon_boy2x.png'
			} else if(res.genderType == 'female') {
					sexImage = './image/icon_girlx.png'
			}else{
				sexImage = './image/icon_navigation.png'
			}
			
			
			if(res.background){
				$('.headerBg').css({
					"background":"#CCCCCC url("+res.background+") no-repeat 50% 50%",
					"backgroundSize":"cover"
				})				
			}
			
			var infoHtml = 	`<div class="baseInfo">
								<div class="userImg"><span class="image" style="background:#CCCCCC url(${res.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
								<div class="userName">
									<p class="name">${res.nickName}<img class="sexImage" src="${sexImage}" /></p>
									<p class="lv"><img src="${leve}" /></p>
								</div>
							</div>
							<p class="introduce">${res.summary}</p>
							<ul class="navList">
								<li id="fansList" class="navItem">
									<p>${res.fansCount}</p>
									<p>粉丝</p>
								</li>								
								<li id="dynamicList" class="navItem active">
									<p>${res.dynamicCount}</p>
									<p>足迹</p>						
								</li>
								<li id="countryList" class="navItem">
									<p>${res.countryCount}</p>
									<p>国家</p>						
								</li>
								<li id="cityList" class="navItem ">
									<p>${res.cityCount}</p>
									<p>城市</p>							
								</li>
								<li id="photoCount" class="navItem ">
									<p class="photoCount" >${res.photoCount}</p>
									<p>照片</p>							
								</li>								
							</ul>
							<div class="btn-box">
								${btn}
							</div>`;
							
							
							
							
			$('.userInfo').empty();			
			$('.userInfo').append(infoHtml);		
			},
			error:function(res){
			}
		});
		
	}
	getUserDetail(id);
	


//	mui('.navList').on('tap', '.navItem', function(){ 
//			alert(123);
//		$('.navItem').removeClass('active');
//		$(this).addClass('active');			
//			
//			})

	$('.userInfo').on('click','#photoCount',function(){
		var allImage = $(this).find('.photoCount').text();
		window.location.href = 'map.html?id='+id+'&photoCount='+allImage;
	})
	
	$('.imageList').on('click','.dynamics',function(){
		var dyId = $(this).attr('id');
		if(dyId){
			window.location.href = 'index.html?id='+dyId;
		}	
	})
	$('.userInfo').on('click','.navItem',function(){
			$('.navItem').removeClass('active');
			$(this).addClass('active');
			var thisId = $(this).attr('id');
			if(nowNav == thisId ){
				return false;
			}
			if(thisId==='fansList'){
				nowNav = 'fansList';
				$('.images').hide();
				$('.fans').show();
				getFansList(id);
			}else if(thisId==='dynamicList'){
				nowNav = 'dynamicList';
				$('.images').show();
				$('.fans').hide();				
				getDynamicList(id,true);
			}else if(thisId==='countryList'){
				nowNav = 'countryList';
				$('.images').show();
				$('.fans').hide();						
				getCountryList(id);
			}else if(thisId==='cityList'){
				nowNav = 'cityList';
				$('.images').show();
				$('.fans').hide();						
				getCityList(id);
			}
	})
		

			mui('body').on('tap','.country',function(){
				var name = $(this).find('.cname').text();
				var allImage = $(this).find('.photoCount').text();
				var code = $(this).attr('countrycode'); 				
				window.location.href = 'map.html?id='+id+'&countrycode='+code+'&name='+name+'&photoCount='+allImage;
				
			})	
	
			mui('body').on('tap','.city',function(){				
				var code = $(this).attr('citycode'); 
				var name = $(this).find('.cname').text();
				var allImage = $(this).find('.photoCount').text();
				window.location.href = 'map.html?id='+id+'&citycode='+code+'&name='+name+'&photoCount='+allImage;
				
			})	
			mui('body').on('tap','.fansItem',function(){
				var userid = $(this).attr('userid'); 				
				window.location.href = './list.html?id='+userid;
				
			})		

			mui('body').on('tap','.headerAdd',function(){
				if(!token){
					mui.toast('登录后才可添加关注');
					return false;
				}
				let opt = {
					applicantUserid:thisUserInfo.id,
					accessToken:token
				};
				$.ajax({
					type:"post",
					url:api.addFriend,
					data:opt,
					async:true,
					success:function(res){
						mui.toast('关注成功！');
						getUserDetail(id);
					},
					error:function(){
						mui.toast('操作失败，请重试！');
					}
				});
			});

			mui('body').on('tap','.listAdd',function(e){
				if(!token){
					mui.toast('登录后才可添加关注');
					return false;
				}				
				 var e = e || window.event;	 
				 e.stopPropagation();
				let opt = {
					applicantUserid:$(this).attr('id'),
					accessToken:token
				};
				$.ajax({
					type:"post",
					url:api.addFriend,
					data:opt,
					async:true,
					success:function(res){
						mui.toast('关注成功！');
						getFansList(id);
					},
					error:function(){
						mui.toast('操作失败，请重试！');
					}
				});				 

			})	


		$(window).scroll(function(){
			
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight == scrollHeight){
			　　　　if(nowNav=='dynamicList'){
						if(nomore){
							return false;			
						}else{		
							getDynamicList(id,false,lastId);			
						}							
					}

			}
		});



var setPsition = function(){

		$('img').load(function(){
			var box = $('.imageList').find('.imageItem');
			var boxHeight = {
				leftBox:[],
				centerBox:[],
				rightBox:[]
			}
			for(var i=0;i<box.length;i++){
				var now = i%2;		//now的值为0，1，2
				switch(now){
					case 0:
						box.eq(i).css('left','0');
						boxHeight.leftBox.push(box.eq(i).height());
						var now2 = Math.floor(i/2);
	 
						if(now2==0){
							box.eq(i).css('top',0);
						}else{
							var total = 0;
							for(var j=0;j<now2;j++){
								total += boxHeight.leftBox[j]+10;
							}
							box.eq(i).css('top',total+'px')
						}
					break;
					case 1:
						box.eq(i).css('left','51%');
						boxHeight.centerBox.push(box.eq(i).height());
						var now2 = Math.floor(i/2);
	 
						if(now2==0){
							box.eq(i).css('top',0);
						}else{
							var total = 0;
							for(var j=0;j<now2;j++){
								total += boxHeight.centerBox[j]+10;
							}
							box.eq(i).css('top',total+'px')
						}
					break;
				}
			}
			
			var height1 = box.eq(box.length-1).height();
			var height2 = box.eq(box.length-2).height();
			var height = 0;
			if(height1>height2){
				height = height1;
			}else{
				height = height2;
			}
			var top1 = box[box.length-1].style.top;
				top1 = top1.replace('px','');
			var top2 = box[box.length-2].style.top;	
				top2 = top2.replace('px','');
			var top = 0;
			if(top1>top2){
				top = top1;
			}else{
				top = top2;
			}			
			var boxHeight = height + Number(top) + 'px';
			$('.imageList').css('height',boxHeight);
		});
		$('.imageList').css('opacity','1');
		$('.loadingTxt').hide();
}

})
