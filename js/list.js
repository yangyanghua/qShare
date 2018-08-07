$(function(){
	
	var id =  getUrlParam('id');
	//var  id = 2716; 
	var user = getUserInfo();
	var thisUserInfo = {};
	//用户足迹列表
	function getDynamicList(id){
		$.ajax({
			type:"get",
			url:api.getDynamicList,
			data:{isLeast:true,userId:id},
			async:true,
			success:function(res){
				console.log(res);
			var dynamicHtml = '';	
			res.object.forEach(function(item){
			//	console.log(item.dynamics[0].firstUrl);
				dynamicHtml+=`<li class="imageItem dynamics" id="${item.dynamics[0].id}">
						<div class="image">
							<img src="${item.dynamics[0].firstUrl}"/>
						</div>
						<h2 class="cname">${item.dynamics[0].locationName}</h2>
						<div class="c_userInfo">
							<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
							<div class="c_user">
								<p class="c_userName">${thisUserInfo.nickName}</p>
								<p>${new Date(item.dynamics[0].createTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
								<p>${new Date(item.dynamics[0].updateTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
							</div>							
						</div>
					</li>`
			})
			$('.imageList').empty();
			$('.imageList').append(dynamicHtml);
			$('.loading').fadeOut();
			},
			error:function(){
				
			}
		});
	}
	//城市列表
	function getCityList(id){
		
		$.ajax({
			type:"get",
			url:api.cityList,
			data:{isLeast:true,userId:id},
			async:true,
			success:function(res){
				console.log(res);
				var cityListHtml = '';
				res.forEach(function(item){
					cityListHtml += `<li class="imageItem">
							<div class="image">
								<img src="${item.url}"/>
							</div>
							<h2 class="cname">${item.title}</h2>
							<div class="c_userInfo">
								<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
								<div class="c_user">
									<p class="c_userName">${thisUserInfo.nickName}</p>
									<p>${new Date(item.startTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
									<p>${new Date(item.endTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
								</div>							
							</div>
						</li>`					
				});
				$('.imageList').empty();
				$('.imageList').append(cityListHtml);
			},
			error:function(){
				
			}
		});		
	}
	
	//国家列表
	function getCountryList(id){
		
		$.ajax({
			type:"get",
			url:api.countryList,
			data:{isLeast:true,userId:id},
			async:true,
			success:function(res){
				console.log(res);
				var CountryListHtml = '';
				res.forEach(function(item){
					CountryListHtml += `<li class="imageItem">
							<div class="image">
								<img src="${item.url}"/>
							</div>
							<h2 class="cname">${item.title}</h2>
							<div class="c_userInfo">
								<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
								<div class="c_user">
									<p class="c_userName">${thisUserInfo.nickName}</p>
									<p>${new Date(item.startTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
									<p>${new Date(item.endTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
								</div>							
							</div>
						</li>`					
				});
				$('.imageList').empty();
				$('.imageList').append(CountryListHtml);
			},
			error:function(){
				
			}
		});		
	}	
	
	
	function getFansList(id){

		$.ajax({
			type:"get",
			url:api.fansList,
			data:{userId:id},
			async:true,
			success:function(res){
				console.log(res);
				var fansListHtml = '';
				res.forEach(function(item){
					fansListHtml += `<li class="fansItem">
						<div class="fansImage"><span style="background:#CCCCCC url(${item.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
						<div class="fansInfo">
							<p class="fansName">${item.nickName}</p>
							<p>景观ID:${item.id}</p>
							<p>上次登录：${new Date(item.updateTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
						</div>
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
			data:{toUid:id,accessToken:user.accessToken},
			url:api.getUserDetail,
			async:true,
			success:function(res){
			var leve = '';
			$('.userId').text('ID：'+res.id);
			thisUserInfo = res;
			getDynamicList(id);
//freshman	freshman	新手
//junior	junior	初级
//medium	medium	中级
//senior	senior	高级
//highest	highest	摄影家

			if(res.level=='freshman'||res.level=='junior'){
				leve = 'image/btnphontoer12x.png';
			}else if(res.level=='medium'){
				leve = 'image/btn_phontoer2x.png';
			}else if(res.level=='senior'||res.level=='highest'){
				leve = 'image/btn_phontoer3x.png';
			};
			
			$('.headerBg').css({
				"background":"#CCCCCC url("+res.avatar+") no-repeat 50% 50%",
				"backgroundSize":"cover"
			})
			
			
			var infoHtml = 	`<div class="baseInfo">
								<div class="userImg"><span class="image" style="background:#CCCCCC url(${res.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
								<div class="userName">
									<p class="name">${res.nickName}</p>
									<p class="lv"><img src=${leve}/></p>
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
							</ul>`;
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
	$('.toMap').on('click',function(){
		window.location.href = 'map?id='+id;
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
			if(thisId==='fansList'){
				$('.images').hide();
				$('.fans').show();
				getFansList(id);
			}else if(thisId==='dynamicList'){
				$('.images').show();
				$('.fans').hide();				
				getDynamicList(id);
			}else if(thisId==='countryList'){
				$('.images').show();
				$('.fans').hide();						
				getCountryList(id);
			}else if(thisId==='cityList'){
				$('.images').show();
				$('.fans').hide();						
				getCityList(id);
			}
	})

})
