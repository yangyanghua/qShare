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
			var dynamicHtml1 = '';
			var dynamicHtml2 = '';
			res.object.forEach(function(item,index){
			//	console.log(item.dynamics[0].firstUrl);

					item.dynamics.forEach(function(item1,index1){
						
				
							if(index1 % 2 === 0 ){
				
								dynamicHtml2+=`<li class="imageItem dynamics" id="${item1.id}">
										<div class="image">
											<img class="lazy" data-original="${item1.firstUrl}"    data-preview-src="" data-preview-group="1"/>
										</div>
										<h2 class="cname">${item1.title}</h2>
										<div class="c_userInfo">
											<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
											<div class="c_user">
												<p class="c_userName">${thisUserInfo.nickName}</p>
												<p>${new Date(item1.createTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
											</div>							
										</div>
									</li>`				
							}else{
								dynamicHtml1+=`<li class="imageItem dynamics" id="${item1.id}">
										<div class="image">
											<img class="lazy" data-original="${item1.firstUrl}"    data-preview-src="" data-preview-group="1" />
										</div>
										<h2 class="cname">${item1.title}</h2>
										<div class="c_userInfo">
											<div class="c_userImage"><span style="background:#CCCCCC url(${thisUserInfo.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
											<div class="c_user">
												<p class="c_userName">${thisUserInfo.nickName}</p>
												<p>${new Date(item1.createTime).Format('yyyy-MM-dd hh:mm:ss')}</p>
											</div>							
										</div>
									</li>`				
							}
										
						
					})



			})
			$('.imageList').empty();
			$('.imageList1').append(dynamicHtml1);
			$('.imageList2').append(dynamicHtml2);
			$('.loading').fadeOut();
			//懒加载
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList1"), failurelimit : 10 });
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList2"), failurelimit : 10 });		
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
				var cityListHtml1 = '';
				var cityListHtml2 = '';
				
				res.forEach(function(item,index){
					if(index % 2 === 0){
						cityListHtml2 += `<li class="imageItem city"  citycode="${item.code}">
								<div class="image">
									<img class="lazy" data-original="${item.url}"    data-preview-src="" data-preview-group="1"/>
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
					}else{
						cityListHtml1 += `<li class="imageItem city"  citycode="${item.code}">
								<div class="image">
									<img class="lazy" data-original="${item.url}"    data-preview-src="" data-preview-group="1"/>
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
					}

				});
				$('.imageList').empty();
				$('.imageList1').append(cityListHtml1);
				$('.imageList2').append(cityListHtml2);
			//懒加载			
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList1")});
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList2")});			
			
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
				var CountryListHtml1 = '';
				var CountryListHtml2 = '';
				res.forEach(function(item,index){

					if(index % 2===0){
						CountryListHtml2 += `<li class="imageItem country" countrycode="${item.code}">
								<div class="image">
									<img class="lazy" data-original="${item.url}"    data-preview-src="" data-preview-group="1" />
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
					}else{
							CountryListHtml1 += `<li class="imageItem country" countrycode="${item.code}">
									<div class="image">
										<img class="lazy" data-original="${item.url}"    data-preview-src="" data-preview-group="1"/>
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
					}
					
				
				});
				$('.imageList').empty();
				$('.imageList1').append(CountryListHtml1);
				$('.imageList2').append(CountryListHtml2);
			//懒加载
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList1"), failurelimit : 10 });
			$("img.lazy").lazyload({effect: "fadeIn", container: $(".imageList2"), failurelimit : 10 });
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
					fansListHtml += `<li class="fansItem" userid="${item.id}" >
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
			$('.userId').text('ID：'+res.no);
			thisUserInfo = res;
			getDynamicList(id);
//freshman	freshman	新手
//junior	junior	初级
//medium	medium	中级
//senior	senior	高级
//highest	highest	摄影家

			if(res.level=='freshman'||res.level=='junior'){
				leve = './image/btnphontoer12x.png';
			}else if(res.level=='medium'){
				leve = './image/btn_phontoer2x.png';
			}else if(res.level=='senior'||res.level=='highest'){
				leve = './image/btn_phontoer3x.png';
			};
			
			if(res.background){
				$('.headerBg').css({
					"background":"#CCCCCC url("+res.background+") no-repeat 50% 50%",
					"backgroundSize":"cover"
				})				
			}
			

			
			
			var infoHtml = 	`<div class="baseInfo">
								<div class="userImg"><span class="image" style="background:#CCCCCC url(${res.avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
								<div class="userName">
									<p class="name">${res.nickName}</p>
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
		window.location.href = 'map.html?id='+id;
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
		

			mui('body').on('tap','.country',function(){
				
				var code = $(this).attr('countrycode'); 				
				window.location.href = 'map.html?id='+id+'&countrycode='+code;
				
			})	
	
			mui('body').on('tap','.city',function(){				
				var code = $(this).attr('citycode'); 				
				window.location.href = 'map.html?id='+id+'&citycode='+code;				
			})	
			mui('body').on('tap','.fansItem',function(){
				
				var userid = $(this).attr('userid'); 				
				window.location.href = './list.html?id='+userid;
				
			})		
	
})
