$(function(){
	
	var id =  getUrlParam('id');
	//var  id = 2716; 
	
	var token  = ''; 
 	if(userInfo.id){
 		token =  userInfo.accessToken;
 		$('.loginUser').css({
 			'background':'#ededed url('+userInfo.avatar+') no-repeat 50% 50%',	
			'background-size':'cover',	
			'display':' block'	
 		})
 	}
 	
	var type = getUrlParam('type')||'hot';
	var thisUserInfo = {};
	var lastId = '';
	var updateTime = '';
	var count = '';
	var nowNav = 'dynamicList';
	var nomore = false;
	//f发现列表
	function getFindList(empty,time = ''){
		var isLeast = true;
		if(time){
			isLeast = false;
		}
		
		$.ajax({
			type:"get",
			url:api.findList,
			data:{isLeast:isLeast,accessToken:token,updateTime:time},
			async:true,
			success:function(res){
			var dynamicHtml1 = '';
			var dynamicHtml2 = '';
			if(res.length>0){			
					updateTime = res[res.length-1].updateTime;
					nomore = false;			
			}else{
				nomore = true;			
			}

					res.forEach(function(item1,index1){
						
						var title = item1.title || '';
								dynamicHtml1+=`<li class="imageItem dynamics">
										<div class="image"  id="${item1.id}" >
											<img class="lazy"  src="${item1.firstUrl}" />
										</div>
										<div class="info" >
										<h2 class="cname">${title}</h2>
										<div class="c_userInfo" uid="${item.userBases[0].id}" >
											<div class="c_userImage"><span style="background:#CCCCCC url(${item1.userBases[0].avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
											<div class="c_user">
												<p class="c_userName">${item1.userBases[0].nickName}</p>
												<p><span class="timeLabel">发表于</span>${new Date(item1.createTime).Format('yyyy-MM-dd')}</p>
											</div>							
										</div>
										<span class="photoCount">${item1.photoCount}<span>
										</div>
									</li>`				
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
	
	
	
	//关注列表
	function getFollowList(empty,dynamicId){
		$('.imageList').css('opacity','0');
		$('.loadingTxt').show();
		
		var dyId = dynamicId || '';	
		$.ajax({
			type:"get",
			url:api.followList,
			data:{isLeast:true,accessToken:token,dynamicId:dyId},
			async:true,
			success:function(res){
				var cityListHtml1 = '';
				if(res.length>0){			
						lastId = res[res.length-1].id;
						nomore = false			
				}else{
					nomore = true;			
				}				
				res.forEach(function(item,index){
					var title = item.title || '' ;
						cityListHtml1 += `<li class="imageItem dynamics" >
								<div class="image" id="${item.id}" >
									<img class="lazy" src="${item.firstUrl}" />
								</div>
								<div class="info">
								<h2 class="cname">${title}</h2>
								<div class="c_userInfo" uid="${item.userBases[0].id}" >
									<div class="c_userImage"><span style="background:#CCCCCC url(${item.userBases[0].avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
									<div class="c_user">
										<p class="c_userName">${item.userBases[0].nickName}</p>
										<p><span class="timeLabel">发表于</span>${new Date(item.createTime).Format('yyyy-MM-dd')}</p>
									</div>							
								</div>
								<span class="photoCount">${item.photoCount}<span>
								</div>
							</li>`							
				});
				if(empty){
					$('.imageList').empty();
				}
				$('.imageList').append(cityListHtml1);
				setPsition();
			$('.loading').fadeOut();	
			
			},
			error:function(){
				
			}
		});		
	}
	
	
	
	//热门列表
	function getHotList(empty,lastCount){
		$('.imageList').css('opacity','0');
		$('.loadingTxt').show();
		var readCount = lastCount || '';
		$.ajax({
			type:"get",
			url:api.hotList,
			data:{isLeast:true,accessToken:token,readCount:lastCount},
			async:true,
			success:function(res){
				var CountryListHtml1 = '';
				if(res.length>0){			
						count = res[res.length-1].readCount;
						nomore = false			
				}else{
					nomore = true;			
				}				
				if(res){
					res.forEach(function(item,index){
						var title = item.title || '' ;
							CountryListHtml1 += `<li class="imageItem dynamics" >
									<div class="image" id="${item.id}" >
										<img class="lazy" src="${item.firstUrl}"    data-preview-src="" data-preview-group="1" />
									</div>
									<div class="info">
									<h2 class="cname">${title}</h2>
									<div class="c_userInfo" uid="${item.userBases[0].id}" >
										<div class="c_userImage"><span style="background:#CCCCCC url(${item.userBases[0].avatar}) no-repeat 50% 50%;background-size:cover;"></span></div>
										<div class="c_user">
											<p class="c_userName">${item.userBases[0].nickName}</p>
											<p><span class="timeLabel">发表于</span>  ${new Date(item.createTime).Format('yyyy-MM-dd')}</p>
										</div>							
									</div>
									<span class="photoCount">${item.photoCount}<span>
									</div>								
								</li>`							
	
						
					
					});					
				}

				if(empty){
					$('.imageList').empty();
				}
				$('.imageList').append(CountryListHtml1);
				setPsition();
				$('.loading').fadeOut();	
			
			},
			error:function(){
				
			}
		});		
	}	
	
	
	
	if(type=='hot'){
		$('.bar-nav-item').removeClass('active');
		$('#hot').addClass('active');
		getHotList(true);		
	}else if(type=='follow'){
		
		if(userInfo.id){
			$('.bar-nav-item').removeClass('active');
			$('#follow').addClass('active');
			getFollowList(true);			
		}else{
			window.location.href = './login.html?path=home'
		}
	}else if(type=='find'){
		$('.bar-nav-item').removeClass('active');
		$('#find').addClass('active');
		getFindList(true);		
	}

	$('.toMap').on('click',function(){
		window.location.href = './homeMap.html?type='+type;
	});

	$('.loginUser').on('click',  function(e) {
		
		var e  = window.event || e;
		e.stopPropagation();
		var thisUid = userInfo.id;
		
		if(thisUid) {
			window.location.href = './list.html?id=' + thisUid;
		}
	})		
	
	
	
	$('.imageList').on('click','.image',function(){
		var dyId = $(this).attr('id');
		if(dyId){
			window.location.href = 'index.html?id='+dyId;
		}	
	})
	
	
	$('.imageList').on('click', '.c_userInfo', function(e) {
		
		var e  = window.event || e;
		e.stopPropagation();
		var thisUid = $(this).attr('uid');
		
		if(thisUid) {
			window.location.href = './list.html?id=' + thisUid;
		}
	})	
	
	
	
	
	
	
	
	
	
	
	$('.bar-nav').on('click','.bar-nav-item',function(){
		
		var className = $(this).attr('class');
		type =  $(this).attr('id');
		
		if(className.indexOf('active') != -1 ){
			return false;
		}else{
			$('.bar-nav-item').removeClass('active');
			$(this).addClass('active');
			if(type==='follow'){
				if(userInfo.id){
					getFollowList(true);
					lastId = '';
					nomore = false;			
				}else{
					window.location.href = './login.html?path=home'
				}


				
			}else if(type==='find'){
				getFindList(true);
				updateTime='';
				nomore = false;
				
			}else if(type==='hot'){
				getHotList(true);
				count = '';
			}
			
		}
		
		
	})
	
	
		$(window).scroll(function(){
			
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight == scrollHeight){
						if(nomore){
							return false;			
						}else{		
								if(type==='follow'){
								
									getFollowList(false,lastId);
								
								}else if(type==='find'){
									
									getFindList(false,updateTime);
									
								}else if(type==='hot'){
									
									getHotList(false,count);
									
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
